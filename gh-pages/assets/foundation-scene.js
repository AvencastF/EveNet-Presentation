/* Decorative foundation-model metaphor from NJU cover: event streams → shared ball → five task nodes.
   Not a detector model, event simulation, or measured architecture. */
;(function (global) {
  const W = 980
  const H = 551
  const palette = ['255,189,89', '255,240,186', '255,207,163', '255,145,181', '245,176,188']

  function createFoundationScene(canvas) {
    let ctx = null
    let frame = 0
    let last = 0
    let time = 0
    let reduced = false
    let hidden = false
    let media
    let dpr = 1

    function line2(points, color, width) {
      if (!ctx || points.length < 2) return
      ctx.beginPath()
      points.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])))
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()
    }

    function foundation(t) {
      if (!ctx) return
      const cx = 746
      const cy = 276
      const turn = t * 0.065
      const dot = (x, y, r, color) => {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 285)
      glow.addColorStop(0, 'rgba(240,195,110,.16)')
      glow.addColorStop(0.42, 'rgba(255,145,181,.055)')
      glow.addColorStop(1, 'rgba(255,145,181,0)')
      ctx.fillStyle = glow
      ctx.fillRect(cx - 285, cy - 285, 570, 570)

      const sphere = (a, b, r = 158) => {
        const x = r * Math.cos(b) * Math.cos(a + turn)
        const z = r * Math.cos(b) * Math.sin(a + turn)
        const y = r * Math.sin(b)
        return [cx + x * 0.9 + y * 0.32, cy + y * 0.9 - x * 0.28 + z * 0.23, z]
      }

      for (let k = 0; k < 19; k++) {
        const b = -Math.PI / 2 + (k + 1) * Math.PI / 20
        line2(
          Array.from({ length: 101 }, (_, i) => sphere((i / 100) * Math.PI * 2, b)),
          `rgba(240,195,110,${0.1 + 0.13 * Math.cos(b)})`,
          0.65
        )
      }
      for (let k = 0; k < 30; k++) {
        line2(
          Array.from({ length: 81 }, (_, i) => sphere((k / 30) * Math.PI * 2, -Math.PI / 2 + (i / 80) * Math.PI)),
          'rgba(255,209,181,.16)',
          0.65
        )
      }
      for (let k = 0; k < 6; k++) {
        const orbit = (a) => {
          const r = 184 + k * 7
          const x = Math.cos(a) * r
          const y = Math.sin(a) * r * (0.27 + k * 0.025)
          const tilt = -0.48 + k * 0.19
          return [cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt)]
        }
        line2(Array.from({ length: 161 }, (_, i) => orbit((i / 160) * Math.PI * 2)), `rgba(${palette[k % 5]},.17)`, 0.8)
        const a = t * 0.17 + k * 1.1
        line2(Array.from({ length: 15 }, (_, i) => orbit(a - i * 0.012)), `rgba(${palette[k % 5]},.65)`, 1.4)
        const p = orbit(a)
        dot(p[0], p[1], 2, `rgba(${palette[k % 5]},.9)`)
      }
      for (let half = 0; half < 2; half++) {
        const rim = Array.from({ length: 81 }, (_, i) => {
          const a = -Math.PI / 2 + 0.07 + half * Math.PI + (i / 80) * (Math.PI - 0.14)
          return [cx + 151 * Math.cos(a), cy + 146 * Math.sin(a)]
        })
        line2(rim, `rgba(${half ? '255,240,186' : '255,145,181'},.38)`, 1.5)
      }
      const nodes = Array.from({ length: 90 }, (_, i) =>
        sphere(i * 2.399963, Math.asin(-0.96 + (i / 89) * 1.92), 156)
      )
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        if (i % 2 === 0 && p[2] > -45) {
          const color = p[0] < cx ? '255,240,186' : '255,145,181'
          line2([[cx, cy], p], `rgba(${color},${p[2] > 0 ? 0.22 : 0.08})`, 0.8)
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]
          const distance = Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
          if (distance < 63) line2([p, q], `rgba(240,210,158,${p[2] > 0 ? 0.19 : 0.065})`, 0.7)
        }
        dot(p[0], p[1], p[2] > 0 ? 1.8 : 1, `rgba(255,224,170,${p[2] > 0 ? 0.8 : 0.25})`)
      }
      for (let k = 0; k < 28; k++) {
        const stream = (u) => {
          const spread = (k - 13.5) * 10
          const blend = u * u * (3 - 2 * u)
          return [
            210 + u * (cx - 210),
            548 + (cy - 548) * blend + spread * (1 - u) ** 1.7 + Math.sin(u * 7 + k * 0.34) * 22 * Math.sin(Math.PI * u) * (1 - u),
          ]
        }
        line2(Array.from({ length: 81 }, (_, i) => stream(i / 80)), `rgba(${palette[k % 5]},.16)`, 0.75)
        const phase = (t * 0.095 + k * 0.071) % 1
        line2(Array.from({ length: 9 }, (_, i) => stream(Math.max(0, phase - i * 0.006))), `rgba(${palette[k % 5]},.65)`, 1.2)
        const p = stream(phase)
        dot(p[0], p[1], 1.3, `rgba(${palette[k % 5]},.8)`)
      }
      for (let k = 0; k < 5; k++) {
        const endY = 75 + k * 95
        const endX = 938 - Math.abs(k - 2) * 12
        const branch = (u) => [cx + u * (endX - cx), cy + (endY - cy) * (u * u * (3 - 2 * u))]
        for (let strand = -2; strand <= 2; strand++) {
          line2(
            Array.from({ length: 71 }, (_, i) => {
              const u = i / 70
              const p = branch(u)
              return [p[0], p[1] + strand * 5 * Math.sin(Math.PI * u)]
            }),
            `rgba(${palette[k]},.23)`,
            0.8
          )
        }
        const phase = (t * 0.12 + k * 0.18) % 1
        const p = branch(phase)
        dot(p[0], p[1], 2, `rgba(${palette[k]},.85)`)
        for (let j = 0; j < 7; j++) {
          const a = (j * Math.PI * 2) / 6
          const x = endX + Math.cos(a) * 17
          const y = endY + Math.sin(a) * 17
          line2([[endX, endY], [x, y]], `rgba(${palette[k]},.4)`, 0.8)
          dot(x, y, j === 6 ? 2.5 : 1.6, `rgba(${palette[k]},.75)`)
        }
        dot(endX, endY, 3, `rgba(${palette[k]},.9)`)
      }
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52)
      core.addColorStop(0, 'rgba(255,174,193,.55)')
      core.addColorStop(0.18, 'rgba(240,195,110,.12)')
      core.addColorStop(1, 'rgba(240,195,110,0)')
      ctx.fillStyle = core
      ctx.fillRect(cx - 52, cy - 52, 104, 104)
    }

    function render(t) {
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cssW = canvas.clientWidth || W
      const cssH = canvas.clientHeight || H
      ctx.clearRect(0, 0, cssW, cssH)
      const scale = Math.max(cssW / W, cssH / H)
      const drawW = W * scale
      const drawH = H * scale
      const ox = (cssW - drawW) * 0.55
      const oy = (cssH - drawH) * 0.35
      ctx.save()
      ctx.translate(ox, oy)
      ctx.scale(scale, scale)
      foundation(t)
      ctx.restore()
    }

    function tick(stamp) {
      if (reduced || hidden) return
      if (stamp - last >= 33) {
        time += last ? Math.min((stamp - last) / 1000, 0.1) : 0
        last = stamp
        render(time)
      }
      frame = requestAnimationFrame(tick)
    }

    function sync() {
      cancelAnimationFrame(frame)
      last = 0
      render(time)
      if (!reduced && !hidden) frame = requestAnimationFrame(tick)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cssW = canvas.clientWidth || window.innerWidth
      const cssH = canvas.clientHeight || window.innerHeight
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      ctx = canvas.getContext('2d')
      sync()
    }

    function onMotion() {
      reduced = !!media?.matches
      sync()
    }
    function onVisibility() {
      hidden = document.hidden
      sync()
    }

    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize)
    onMotion()
    onVisibility()
    resize()

    return {
      destroy() {
        cancelAnimationFrame(frame)
        media?.removeEventListener('change', onMotion)
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('resize', resize)
      },
    }
  }

  global.createFoundationScene = createFoundationScene
})(window)
