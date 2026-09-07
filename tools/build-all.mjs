import { cpSync, existsSync, lstatSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { discoverDecks, repoRoot, runDeck } from './lib/decks.mjs'

export function basePrefix(value) {
  if (!value.startsWith('/') || value.includes('..') || /[?#\\]/.test(value))
    throw new Error('The base must be an absolute URL path, such as /EveNet-Presentation/.')
  return `${value.replace(/\/+$/, '')}/`
}

export async function buildAll({ root = repoRoot, base = '/EveNet-Presentation/', run = runDeck } = {}) {
  base = basePrefix(base)
  const site = join(root, 'site')
  if (existsSync(site) && (!lstatSync(site).isDirectory() || lstatSync(site).isSymbolicLink()))
    throw new Error('Refusing to replace site: expected an ordinary generated directory.')
  if (existsSync(join(site, 'slides.md')))
    throw new Error('Refusing to replace site: it contains presentation source.')
  const decks = discoverDecks(root)
  if (!decks.length) throw new Error('No presentations found.')
  // Only this fixed, repository-local output directory is disposable.
  rmSync(site, { recursive: true, force: true })
  mkdirSync(site)
  for (const deck of decks) {
    console.log(`\nBuilding ${deck}`)
    const started = performance.now()
    const code = await run('build', deck, ['--base', `${base}${deck}/`, '--out', join(site, deck)], { root })
    if (code !== 0) return code
    console.log(`${deck}: ${((performance.now() - started) / 1000).toFixed(1)}s`)
  }
  // Landing page plus local assets (brand font, emblem, anime.js).
  cpSync(join(root, 'gh-pages'), site, { recursive: true })
  return 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2)
    if (args.length && (args.length !== 2 || args[0] !== '--base'))
      throw new Error('Usage: npm run build:all -- [--base /repository/]')
    const repository = process.env.GITHUB_REPOSITORY?.split('/').pop() || 'EveNet-Presentation'
    process.exitCode = await buildAll({ base: args[1] || `/${repository}/` })
  }
  catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
