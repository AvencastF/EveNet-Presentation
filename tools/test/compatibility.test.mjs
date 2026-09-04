import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { repoRoot } from '../lib/decks.mjs'

test('historical Vue entrypoints retain the shared render functions', async () => {
  const server = await createServer({
    root: repoRoot,
    configFile: false,
    plugins: [vue()],
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: 'custom',
  })
  try {
    for (const deck of ['AI_HEP_Japan', 'AI_LHC_2026', 'EPE_Seminar', 'HWW_QE_lvlv', 'ICHEP2027']) {
      // Slidev adds an empty client template to script-only SFCs. SSR alone
      // would miss that production-only regression, so require real templates.
      for (const component of deck === 'HWW_QE_lvlv' ? ['LaTeX'] : ['LaTeX', 'PlotlyChart']) {
        const source = readFileSync(join(repoRoot, deck, 'components', `${component}.vue`), 'utf8')
        assert.ok(parse(source).descriptor.template?.content.includes('SharedComponent'))
      }
      const latex = await server.ssrLoadModule(`/${deck}/components/LaTeX.vue`)
      assert.match(await renderToString(createSSRApp(latex.default, { formula: 'x' })), /<span[^>]*class="inline"/)
      if (deck !== 'HWW_QE_lvlv') {
        const chart = await server.ssrLoadModule(`/${deck}/components/PlotlyChart.vue`)
        assert.match(await renderToString(createSSRApp(chart.default, { data: [], width: 200, height: 100 })), /width:200px;height:100px/)
      }
    }
  }
  finally {
    await server.close()
  }
})
