import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { repoRoot, validateName } from './lib/decks.mjs'

export function createDeck(name, root = repoRoot) {
  validateName(name)
  const directory = join(root, name)
  // Non-recursive mkdir intentionally rejects existing files and directories.
  mkdirSync(directory)
  mkdirSync(join(directory, 'slides'))
  mkdirSync(join(directory, 'public'))
  const title = name.replace(/[_-]/g, ' ')
  writeFileSync(join(directory, 'slides.md'), `---
theme: default
addons:
  - slidev-addon-evenet
title: ${JSON.stringify(title)}
colorSchema: dark
transition: slide-left
mdc: true
routerMode: hash
aspectRatio: 16/9
canvasWidth: 980
glowSeed: 229
drawings:
  persist: false
---

# ${title}

Start your presentation here.
`)
  writeFileSync(join(directory, 'style.ts'), "import '../shared/styles/main.css'\nimport '../shared/styles/animations.css'\nimport '../shared/styles/base.css'\n")
  return directory
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: npm run new -- <deck>')
    createDeck(process.argv[2])
    console.log(`Created ${process.argv[2]}. Run: npm run dev -- ${process.argv[2]}`)
  }
  catch (error) {
    console.error(error.code === 'EEXIST' ? 'That directory already exists; nothing was overwritten.' : error.message)
    process.exitCode = 1
  }
}
