// Run after the production build, with NJU_PREVIEW_URL pointing to its served base.
// Example: NJU_PREVIEW_URL=http://127.0.0.1:4174/EveNet-Presentation/NJU_Seminar/ node NJU_Seminar/check-animation.mjs
import { chromium } from 'playwright-chromium'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const base = process.env.NJU_PREVIEW_URL
assert(base, 'Set NJU_PREVIEW_URL to the locally served NJU production base')
const browser = await chromium.launch({ headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
  const errors = []
  page.on('pageerror', error => { if (!error.message.includes('Wake Lock')) errors.push(error.message) })
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
  await mkdir('output/playwright/anime-v4', { recursive: true })
  for (const [slide, scene, clicks, renderedStep] of [[4, 'core', 1, 0], [5, 'classification', 0, 1], [6, 'assignment', 0, 1], [7, 'segmentation', 0, 1], [8, 'self', 0, 1], [9, 'supervised', 0, 1]]) {
    await page.goto(`${base}#/${slide}`)
    const root = page.locator(`[data-scene="${scene}"]`).filter({ visible: true })
    await root.waitFor()
    await page.waitForTimeout(1800) // Let Slidev page transitions settle before visual capture.
    await page.evaluate(() => document.fonts.ready)
    if (clicks) {
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(450)
      const phase = Number(await root.getAttribute('data-progress'))
      assert(phase > 0 && phase < 1, 'Anime.js must render intermediate states')
      await page.screenshot({ path: `output/playwright/anime-v4/${scene}-motion.png` })
      await page.waitForTimeout(1800)
      assert.equal(await root.getAttribute('data-step'), '1')
      await page.screenshot({ path: `output/playwright/anime-v4/${scene}-open.png` })
    } else {
      assert.equal(await root.getAttribute('data-step'), `${renderedStep}`)
      await page.screenshot({ path: `output/playwright/anime-v4/${scene}-ready.png` })
    }
    assert.equal(Number(await root.getAttribute('data-progress')), 1)
    const cycle = Number(await root.getAttribute('data-cycle'))
    await page.waitForTimeout(400)
    assert.notEqual(Number(await root.getAttribute('data-cycle')), cycle, 'Idle loop keeps running after the final click')

    if (scene === 'supervised') {
      const fixed = await root.locator('.input-particle').evaluateAll(es => es.map(e => [e.getAttribute('cx'), e.getAttribute('cy')]))
      await page.waitForTimeout(500)
      assert.deepEqual(await root.locator('.input-particle').evaluateAll(es => es.map(e => [e.getAttribute('cx'), e.getAttribute('cy')])), fixed)
    }
    if (clicks) {
      await page.keyboard.press('ArrowLeft')
      await page.waitForTimeout(1800)
      assert.equal(await root.getAttribute('data-step'), '0')
      await page.reload(); await root.waitFor()
      assert.equal(await root.getAttribute('data-step'), '0', 'Refresh preserves click state')
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(`${base}#/4`)
  const core = page.locator('[data-scene="core"]').filter({ visible: true })
  await core.waitFor(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(100)
  assert.equal(Number(await core.getAttribute('data-progress')), 1)
  for (const route of ['presenter/4', 'overview']) {
    await page.goto(`${base}#/${route}`); await page.waitForTimeout(1500)
    await page.screenshot({ path: `output/playwright/anime-v4/${route.replace('/', '-')}.png` })
    assert(await page.locator('.njua').count() > 0)
  }
  assert.deepEqual(errors, [])
  console.log('Passed: opening click, five immediately rendered head views, idle loops, reverse, refresh, reduced motion, presenter and overview; no application/asset errors. Browser Wake Lock denial excluded.')
} finally { await browser.close() }
