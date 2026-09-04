import { runDeck } from './lib/decks.mjs'

const [mode, name, ...flags] = process.argv.slice(2)
try {
  if (!name) throw new Error(`Usage: npm run ${mode || 'dev'} -- <deck> [Slidev options]`)
  process.exitCode = await runDeck(mode, name, flags)
}
catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
