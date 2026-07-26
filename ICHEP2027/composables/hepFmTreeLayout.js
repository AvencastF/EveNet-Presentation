import { levels, treeLeaves } from '../data/foundationModels.js'

export const VIEW_W = 1000
export const VIEW_H = 640
export const LEVEL_KEYS = ['raw', 'jet', 'event', 'cross']

export const DEFAULT_LAYOUT = {
  margin: { top: 72, right: 12, bottom: 28, left: 12 },
  inner: { top: 8, bottom: 8, left: 0, right: 0 },
  labelBand: 40,
  labelGap: 14,
  timelinePad: { top: 12, bottom: 28 },
  trunkGap: 16,
  branchJoinRadius: 18,
  colWeights: [1, 5, 8, 5, 5],
  regionPad: 8,
  leafWidthRatio: 0.88,
  minLeafW: 48,
  maxLeafW: null,
  leafGap: 26,
  branchStroke: [5, 6.5, 7, 5.5],
  branchHalo: [11, 14, 16, 12]
}

export function buildLayout(L) {
  const m = { top: 72, right: 12, bottom: 28, left: 12, ...L.margin }
  const inner = { top: 8, bottom: 8, left: 0, right: 0, ...L.inner }
  const labelBand = L.labelBand ?? 40
  const labelGap = L.labelGap ?? 14
  const timelinePad = { top: 12, bottom: 28, ...L.timelinePad }
  const trunkGap = L.trunkGap ?? 16
  const branchJoinRadius = L.branchJoinRadius ?? 18

  const content = { x0: m.left, x1: VIEW_W - m.right, y0: m.top, y1: VIEW_H - m.bottom }
  const plot = {
    x0: content.x0 + inner.left,
    x1: content.x1 - inner.right,
    y0: content.y0 + labelBand + labelGap + inner.top + timelinePad.top,
    y1: content.y1 - inner.bottom - timelinePad.bottom
  }
  const trunkY = plot.y1 + trunkGap
  const labelY = content.y0 + labelBand / 2

  const total = L.colWeights.reduce((a, b) => a + b, 0)
  let x = plot.x0
  const columns = L.colWeights.map((w) => {
    const width = (plot.x1 - plot.x0) * (w / total)
    const col = { x0: x, x1: x + width, w: width, center: x + width / 2 }
    x += width
    return col
  })

  const dateCol = columns[0]
  const fieldCols = columns.slice(1)
  const regions = Object.fromEntries(
    fieldCols.map((col, i) => {
      const key = LEVEL_KEYS[i]
      const pad = L.regionPad
      return [key, { key, branchX: col.center, x0: col.x0 + pad, x1: col.x1 - pad, w: col.w }]
    })
  )

  return {
    plot,
    trunkY,
    labelY,
    dateCol,
    timelineLineX0: dateCol.x0,
    timelineLineX1: plot.x1,
    regions,
    minLeafW: L.minLeafW,
    leafGap: L.leafGap,
    leafWidthRatio: L.leafWidthRatio,
    maxLeafW: L.maxLeafW,
    branchJoinRadius,
    branchStroke: L.branchStroke,
    branchHalo: L.branchHalo,
    yearMarker: L.yearMarker,
    yearLabelOffsetY: L.yearLabelOffsetY
  }
}

export function branchPathD(x, yTop, trunkY, r) {
  const y1 = trunkY - r
  return `M ${x} ${yTop} L ${x} ${y1} C ${x} ${trunkY - r * 0.15} ${x} ${trunkY} ${x} ${trunkY}`
}

export function pct(x, y) {
  return { left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }
}

export function posStyle(x, y, extra = {}) {
  return { ...pct(x, y), position: 'absolute', ...extra }
}

export function leafWidthForRegion(region, L) {
  let w = (region.x1 - region.x0) * (L.leafWidthRatio ?? 0.88)
  if (L.minLeafW > 0) w = Math.max(w, L.minLeafW)
  if (L.maxLeafW > 0) w = Math.min(w, L.maxLeafW)
  return w
}

/** Outward from branch: left leaves grow left, right leaves grow right. */
export function leafAnchorTransform(side) {
  return side === 'left' ? 'translate(-100%, -50%)' : 'translate(0%, -50%)'
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v))
}

export function makeDateToY(plot, dateStart, dateEnd) {
  const start = Date.parse(dateStart)
  const end = Date.parse(dateEnd)
  const span = end - start
  return (iso) => {
    const t = clamp((Date.parse(iso) - start) / span, 0, 1)
    return plot.y1 - t * (plot.y1 - plot.y0)
  }
}

function resolveOrderedY(dates, minGap, yLo, yHi, toY) {
  if (!dates.length) return []
  const ys = dates.map(toY)
  for (let i = 1; i < ys.length; i++) {
    if (ys[i] > ys[i - 1] - minGap) ys[i] = ys[i - 1] - minGap
  }
  for (let i = ys.length - 2; i >= 0; i--) {
    if (ys[i] < ys[i + 1] + minGap) ys[i] = ys[i + 1] + minGap
  }
  if (ys[0] > yHi) {
    const d = ys[0] - yHi
    for (let i = 0; i < ys.length; i++) ys[i] -= d
  }
  if (ys[ys.length - 1] < yLo) {
    const d = yLo - ys[ys.length - 1]
    for (let i = 0; i < ys.length; i++) ys[i] += d
  }
  return ys
}

export function placeLeaves(regions, levelMap, dateToY, L) {
  const { y0, y1 } = L.plot
  return LEVEL_KEYS.flatMap((regionKey) => {
    const region = regions[regionKey]
    const items = treeLeaves()
      .filter(l => l.level === regionKey)
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    if (!items.length) return []

    const leafW = leafWidthForRegion(region, L)
    const ys = resolveOrderedY(items.map(it => it.date), L.leafGap, y0, y1, dateToY)

    return items.map((it, i) => ({
      id: it.leafId,
      modelId: it.modelId,
      name: it.name,
      date: it.date,
      featured: it.featured,
      arxivRef: it.arxivRef ?? null,
      color: it.color ?? levelMap[regionKey]?.color,
      regionKey,
      branchX: region.branchX,
      y: ys[i],
      leafW,
      side: i % 2 === 0 ? 'left' : 'right'
    }))
  })
}

export function buildBranches(regions, levelMap, layout) {
  const counts = Object.fromEntries(
    LEVEL_KEYS.map(k => [k, treeLeaves().filter(l => l.level === k).length])
  )
  const { plot, trunkY, branchJoinRadius, branchStroke, branchHalo } = layout

  return LEVEL_KEYS.map((key, i) => {
    const level = levelMap[key]
    const x = regions[key].branchX
    const stroke = branchStroke[i] ?? branchStroke.at(-1)
    const halo = branchHalo[i] ?? branchHalo.at(-1)
    return {
      key,
      x,
      pathD: branchPathD(x, plot.y0, trunkY, branchJoinRadius),
      color: level?.color ?? '#94a3b8',
      icon: level?.icon ?? 'i-carbon:circle-solid',
      label: level?.label ?? key,
      count: counts[key],
      stroke,
      halo,
      flowW: Math.max(stroke * 0.72, 2.5),
      flowDash: '14 86',
      flowDur: `${2.6 + i * 0.35}s`
    }
  })
}

export function buildTimelineRows(years, layout, dateToY) {
  const marker = layout.yearMarker ?? 'jan1'
  const offset = layout.yearLabelOffsetY ?? 0
  return years.map(year => {
    const iso = marker === 'midyear' ? `${year}-07-01` : `${year}-01-01`
    const y = dateToY(iso)
    return { year, y, labelY: y + offset }
  })
}
