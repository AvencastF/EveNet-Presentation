import { spawn } from 'node:child_process'
import { constants } from 'node:os'
import { existsSync, lstatSync, readdirSync, realpathSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

export function validateName(name) {
  if (!name || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(name))
    throw new Error('Use a deck name containing only letters, numbers, underscores, and hyphens.')
  if (['site', 'node_modules', 'shared', 'tools', 'gh-pages', 'output'].includes(name.toLowerCase()))
    throw new Error(`Reserved infrastructure directory: ${name}`)
  return name
}

export function deckDirectory(name, root = repoRoot) {
  validateName(name)
  const directory = join(root, name)
  if (!existsSync(directory) || !lstatSync(directory).isDirectory()
    || dirname(realpathSync(directory)) !== realpathSync(root)
    || !existsSync(join(directory, 'slides.md')))
    throw new Error(`Unknown presentation: ${name}`)
  return directory
}

export function discoverDecks(root = repoRoot) {
  return readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory()
      && existsSync(join(root, entry.name, 'slides.md')))
    .map(entry => validateName(entry.name)).sort()
}

export function slidevArgs(mode, flags = []) {
  switch (mode) {
    case 'dev': return ['slides.md', '--open', '--remote', ...flags]
    case 'build': return ['build', 'slides.md', ...flags]
    case 'export': return ['export', 'slides.md', '--with-clicks', '--per-slide', '--wait-until', 'none', ...flags]
    default: throw new Error(`Unknown command: ${mode}`)
  }
}

export async function runDeck(mode, name, flags = [], { root = repoRoot, spawnImpl = spawn } = {}) {
  const cwd = deckDirectory(name, root)
  const cli = join(root, 'node_modules/@slidev/cli/bin/slidev.mjs')
  if (!existsSync(cli)) throw new Error('Slidev is not installed. Run npm ci at the repository root first.')
  const args = slidevArgs(mode, flags)
  return new Promise((resolveCode, reject) => {
    const child = spawnImpl(process.execPath, [cli, ...args], { cwd, stdio: 'inherit' })
    const interrupt = signal => child.kill(signal)
    const onInt = () => interrupt('SIGINT')
    const onTerm = () => interrupt('SIGTERM')
    process.on('SIGINT', onInt)
    process.on('SIGTERM', onTerm)
    const cleanup = () => {
      process.off('SIGINT', onInt)
      process.off('SIGTERM', onTerm)
    }
    child.once('error', error => { cleanup(); reject(error) })
    child.once('close', (code, signal) => {
      cleanup()
      resolveCode(code ?? 128 + (constants.signals[signal] || 1))
    })
  })
}
