import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { deckDirectory, discoverDecks, runDeck, slidevArgs, validateName } from '../lib/decks.mjs'
import { basePrefix, buildAll } from '../build-all.mjs'
import { createDeck } from '../new-deck.mjs'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'slidev-tools-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  return root
}

test('names reject traversal, flags, spaces and empty input', () => {
  for (const value of ['', undefined, '../main', '/tmp/deck', '--help', 'a/b', 'a b', 'site', 'Site', 'node_modules', 'shared'])
    assert.throws(() => validateName(value))
  assert.equal(validateName('AI_LHC_2026'), 'AI_LHC_2026')
})

test('scaffolding is minimal, discovers decks, and never overwrites', t => {
  const root = fixture(t)
  const deck = createDeck('My_Talk', root)
  assert.match(readFileSync(join(deck, 'slides.md'), 'utf8'), /slidev-addon-evenet/)
  assert.match(readFileSync(join(deck, 'style.ts'), 'utf8'), /shared\/styles\/base.css/)
  assert.ok(!existsSync(join(deck, 'package.json')))
  assert.deepEqual(discoverDecks(root), ['My_Talk'])
  assert.equal(deckDirectory('My_Talk', root), deck)
  assert.throws(() => createDeck('My_Talk', root), { code: 'EEXIST' })
  assert.throws(() => deckDirectory('Missing', root))
  symlinkSync(deck, join(root, 'Linked'))
  assert.throws(() => deckDirectory('Linked', root))
  assert.deepEqual(discoverDecks(root), ['My_Talk'])
})

test('original dev/export flags and extra arguments are preserved', () => {
  assert.deepEqual(slidevArgs('dev', ['--port', '4040']), ['slides.md', '--open', '--remote', '--port', '4040'])
  assert.deepEqual(slidevArgs('build', ['--base', '/x/']), ['build', 'slides.md', '--base', '/x/'])
  assert.deepEqual(slidevArgs('export'), ['export', 'slides.md', '--with-clicks', '--per-slide', '--wait-until', 'none'])
  assert.throws(() => slidevArgs('bogus'))
})

test('wrapper uses root CLI, deck cwd, and preserves failure codes', async t => {
  const root = fixture(t)
  createDeck('Talk', root)
  await assert.rejects(runDeck('build', 'Talk', [], { root }), /npm ci/)
  const cliDir = join(root, 'node_modules/@slidev/cli/bin')
  mkdirSync(cliDir, { recursive: true })
  writeFileSync(join(cliDir, 'slidev.mjs'), '')
  const code = await runDeck('build', 'Talk', ['--base', '/test/'], { root, spawnImpl(binary, args, options) {
    assert.equal(binary, process.execPath)
    assert.equal(args[0], join(cliDir, 'slidev.mjs'))
    assert.equal(options.cwd, join(root, 'Talk'))
    const child = new EventEmitter()
    queueMicrotask(() => child.emit('close', 23, null))
    return child
  } })
  assert.equal(code, 23)
})

test('all-deck builds preserve paths and landing page, and stop on failure', async t => {
  const root = fixture(t)
  createDeck('B', root); createDeck('A', root)
  mkdirSync(join(root, 'gh-pages'))
  writeFileSync(join(root, 'gh-pages/index.html'), 'unchanged landing')
  const calls = []
  assert.equal(await buildAll({ root, base: '/repo', run: async (...args) => { calls.push(args); return 0 } }), 0)
  assert.deepEqual(calls.map(args => args[1]), ['A', 'B'])
  assert.deepEqual(calls[0][2], ['--base', '/repo/A/', '--out', join(root, 'site/A')])
  assert.equal(readFileSync(join(root, 'site/index.html'), 'utf8'), 'unchanged landing')
  calls.length = 0
  assert.equal(await buildAll({ root, run: async (...args) => { calls.push(args); return 7 } }), 7)
  assert.equal(calls.length, 1)
  assert.ok(!existsSync(join(root, 'site/index.html')))
  assert.equal(basePrefix('/'), '/')
  assert.throws(() => basePrefix('../bad'))
})

test('all-deck build refuses symlink output', async t => {
  const root = fixture(t)
  createDeck('Talk', root)
  symlinkSync(join(root, 'Talk'), join(root, 'site'))
  await assert.rejects(buildAll({ root }), /Refusing/)
  assert.ok(existsSync(join(root, 'Talk/slides.md')))
})

test('all-deck build never removes presentation source in its output directory', async t => {
  const root = fixture(t)
  createDeck('Talk', root)
  mkdirSync(join(root, 'site'))
  writeFileSync(join(root, 'site/slides.md'), '# Keep me')
  await assert.rejects(buildAll({ root }), /Refusing/)
  assert.equal(readFileSync(join(root, 'site/slides.md'), 'utf8'), '# Keep me')
})

test('discovery reports invalid manual deck names instead of silently omitting them', t => {
  const root = fixture(t)
  mkdirSync(join(root, 'Invalid Name'))
  writeFileSync(join(root, 'Invalid Name/slides.md'), '# Talk')
  assert.throws(() => discoverDecks(root), /deck name/)
})
