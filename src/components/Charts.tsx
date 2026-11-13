import type { ChartId } from '../types'

interface Cfg { xMax: number; yMax: number; xStep: number; yStep: number; fixed: number; price: number; vc: number; xLabel: string; yLabel: string }

const BREAKEVEN: Cfg = { xMax: 500, yMax: 10000, xStep: 100, yStep: 2000, fixed: 2000, price: 20, vc: 10, xLabel: 'Output / quantity', yLabel: 'Costs and sales (£)' }
const CANDLES: Cfg = { xMax: 1000, yMax: 9000, xStep: 100, yStep: 1000, fixed: 2000, price: 8, vc: 4, xLabel: 'Number of candles sold', yLabel: 'Costs and revenues (£)' }
const SAFETY: Cfg = { xMax: 60, yMax: 1200, xStep: 10, yStep: 200, fixed: 200, price: 20, vc: 40 / 3, xLabel: 'Output (units)', yLabel: 'Costs and sales (£)' }

const W = 560, H = 340, L = 64, R = 24, T = 18, B = 52

function PlcChart() {
  const W2 = 560, H2 = 320, L2 = 24, R2 = 24, T2 = 54, B2 = 24
  const bw = (W2 - L2 - R2) / 5
  const X = (k: number) => L2 + k * bw
  const Y = (v: number) => H2 - B2 - v * (H2 - T2 - B2)
  const stages = [
    { n: 'Development', c: '#e2e8f0' }, { n: 'Introduction', c: '#dbeafe' }, { n: 'Growth', c: '#ede9fe' }, { n: 'Maturity', c: '#fee2e2' }, { n: 'Decline', c: '#ffedd5' },
  ]
  const d = `M ${X(0)} ${Y(0)} L ${X(1)} ${Y(0)} C ${X(1.5)} ${Y(0)}, ${X(1.6)} ${Y(0.05)}, ${X(2)} ${Y(0.15)} C ${X(2.4)} ${Y(0.3)}, ${X(2.6)} ${Y(0.8)}, ${X(3)} ${Y(0.88)} C ${X(3.3)} ${Y(0.98)}, ${X(3.6)} ${Y(1)}, ${X(4)} ${Y(0.92)} C ${X(4.4)} ${Y(0.8)}, ${X(4.6)} ${Y(0.3)}, ${X(5)} ${Y(0.08)}`
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W2} ${H2}`} role="img" aria-label="Product life cycle: development with no sales, introduction with low sales, growth with rapid sales, maturity at the peak with slower growth, then decline.">
        <rect width={W2} height={H2} fill="#fff" />
        {stages.map((s, i) => (
          <g key={s.n}>
            <rect x={X(i)} y={T2 - 30} width={bw} height={H2 - B2 - T2 + 30} fill={s.c} />
            <text x={X(i) + bw / 2} y={T2 - 10} textAnchor="middle" fontSize={13} fontWeight={800} fill="#0f172a">{s.n}</text>
          </g>
        ))}
        <path d={d} fill="none" stroke="#0b2a4a" strokeWidth={4} strokeLinecap="round" />
        <line x1={L2} x2={W2 - R2} y1={Y(0)} y2={Y(0)} stroke="#334155" strokeWidth={1.5} />
        <text x={L2 + 4} y={Y(0) - 6} fontSize={11} fill="#475569">Investment, no sales</text>
        <text x={X(1) + 6} y={Y(0.2)} fontSize={11} fill="#1e3a8a">Low sales</text>
        <text x={X(2) + 8} y={Y(0.55)} fontSize={11} fill="#4c1d95">Rapid sales</text>
        <text x={X(3) + 8} y={Y(0.7)} fontSize={11} fill="#7f1d1d">Slower growth</text>
        <text x={X(4) + 8} y={Y(0.55)} fontSize={11} fill="#7c2d12">Falling demand</text>
        <text x={W2 / 2} y={H2 - 6} textAnchor="middle" fontSize={12} fontWeight={600} fill="#0f172a">Time → (sales on the vertical axis)</text>
      </svg>
    </figure>
  )
}

export function Chart({ id }: { id: ChartId }) {
  if (id === 'plc') return <PlcChart />
  const cfg = id === 'candles' ? CANDLES : id === 'safety' ? SAFETY : BREAKEVEN
  const x = (v: number) => L + (v / cfg.xMax) * (W - L - R)
  const y = (v: number) => H - B - (v / cfg.yMax) * (H - T - B)
  const tc = (q: number) => cfg.fixed + cfg.vc * q
  const tr = (q: number) => cfg.price * q
  const be = cfg.fixed / (cfg.price - cfg.vc)
  const beY = tr(be)
  const labelled = id === 'breakeven'
  const mark = id.startsWith('mark-')
  const xs: number[] = [], ys: number[] = []
  for (let v = 0; v <= cfg.xMax; v += cfg.xStep) xs.push(v)
  for (let v = 0; v <= cfg.yMax; v += cfg.yStep) ys.push(v)
  const C = { fixed: '#7c3aed', tr: '#1d4ed8', tc: '#dc2626' }
  const lab = (t: string, px: number, py: number, color = '#0f172a') => (
    <g key={t + px}><circle cx={px} cy={py} r={11} fill="#fff" stroke={color} strokeWidth={2} /><text x={px} y={py + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={color}>{t}</text></g>
  )
  const markPos: Record<string, [number, number]> = {
    'mark-be': [x(be) + 18, y(beY) + 24],
    'mark-tc': [x(cfg.xMax) - 4, y(tc(cfg.xMax)) - 18],
    'mark-loss': [x(be * 0.42), y((tr(be * 0.42) + tc(be * 0.42)) / 2)],
    'mark-fixed': [x(cfg.xMax * 0.8), y(cfg.fixed) + 22],
  }
  const desc = id === 'candles'
    ? 'Break-even chart for a candle business. Fixed costs £2,000, total cost line rising to £6,000 at 1,000 candles, sales revenue line rising to £8,000. The lines cross at 500 candles.'
    : id === 'safety'
      ? 'Break-even chart with break-even at 30 units and the margin of safety between 30 and 50 units.'
      : 'Break-even chart with fixed cost, total revenue and total cost lines.'
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={desc} preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} fill="#fff" />
        {ys.map(v => (<g key={'y' + v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e2e8f0" /><text x={L - 8} y={y(v) + 4} fontSize={11} textAnchor="end" fill="#475569">{v.toLocaleString('en-GB')}</text></g>))}
        {xs.map(v => (<g key={'x' + v}><line x1={x(v)} x2={x(v)} y1={y(0)} y2={y(0) + 5} stroke="#64748b" /><text x={x(v)} y={y(0) + 18} fontSize={11} textAnchor="middle" fill="#475569">{v}</text></g>))}
        <line x1={L} x2={L} y1={T} y2={y(0)} stroke="#334155" strokeWidth={1.5} />
        <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="#334155" strokeWidth={1.5} />
        <text x={(L + W - R) / 2} y={H - 10} textAnchor="middle" fontSize={12} fontWeight={600} fill="#0f172a">{cfg.xLabel}</text>
        <text transform={`translate(14 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fontWeight={600} fill="#0f172a">{cfg.yLabel}</text>

        {labelled && <>
          <polygon points={`${x(be)},${y(beY)} ${x(cfg.xMax)},${y(tr(cfg.xMax))} ${x(cfg.xMax)},${y(tc(cfg.xMax))}`} fill="#bbf7d0" opacity={0.75} />
          <polygon points={`${x(0)},${y(tr(0))} ${x(be)},${y(beY)} ${x(0)},${y(tc(0))}`} fill="#fecaca" opacity={0.8} />
          <rect x={x(be)} y={y(0) - 8} width={x(cfg.xMax * 0.8) - x(be)} height={8} fill="#f59e0b" />
        </>}
        {id === 'safety' && <>
          <polygon points={`${x(be)},${y(beY)} ${x(50)},${y(tr(50))} ${x(50)},${y(tc(50))}`} fill="#bbf7d0" opacity={0.7} />
          <rect x={x(be)} y={y(0) - 10} width={x(50) - x(be)} height={10} fill="#f59e0b" />
          <line x1={x(be)} x2={x(be)} y1={y(0)} y2={y(beY)} stroke="#94a3b8" strokeDasharray="4 4" />
          <line x1={x(50)} x2={x(50)} y1={y(0)} y2={y(tr(50))} stroke="#94a3b8" strokeDasharray="4 4" />
          <text x={(x(be) + x(50)) / 2} y={y(0) - 16} fontSize={12} textAnchor="middle" fontWeight={700} fill="#92400e">Margin of safety</text>
          <text x={x(be)} y={y(beY) - 10} fontSize={12} textAnchor="middle" fontWeight={700} fill="#0f172a">Break-even (30)</text>
        </>}
        {id === 'candles' && <>
          <line x1={x(be)} x2={x(be)} y1={y(0)} y2={y(beY)} stroke="#94a3b8" strokeDasharray="4 4" />
        </>}

        <line x1={x(0)} x2={x(cfg.xMax)} y1={y(cfg.fixed)} y2={y(cfg.fixed)} stroke={C.fixed} strokeWidth={3} />
        <line x1={x(0)} x2={x(cfg.xMax)} y1={y(tr(0))} y2={y(tr(cfg.xMax))} stroke={C.tr} strokeWidth={3} />
        <line x1={x(0)} x2={x(cfg.xMax)} y1={y(tc(0))} y2={y(tc(cfg.xMax))} stroke={C.tc} strokeWidth={3} />
        <circle cx={x(be)} cy={y(beY)} r={5} fill="#0f172a" />

        {labelled && <>
          {lab('A', x(cfg.xMax) - 14, y(cfg.fixed) - 16, C.fixed)}
          {lab('B', x(cfg.xMax) - 14, y(tr(cfg.xMax)) + 18, C.tr)}
          {lab('C', x(cfg.xMax) - 14, y(tc(cfg.xMax)) + 20, C.tc)}
          {lab('D', x(be) - 20, y(beY) - 18)}
          {lab('E', x(be * 1.75), y((tr(be * 1.75) + tc(be * 1.75)) / 2) - 2, '#166534')}
          {lab('F', x(be * 0.45), y((tr(be * 0.45) + tc(be * 0.45)) / 2), '#b91c1c')}
          {lab('G', x((be + cfg.xMax * 0.8) / 2), y(0) - 24, '#92400e')}
        </>}
        {mark && lab('A', ...markPos[id], '#dc2626')}
        {(id === 'candles' || id === 'safety') && null}
      </svg>
      {id !== 'safety' && (
        <figcaption className="legend">
          <span><i style={{ background: C.fixed }} /> Fixed costs</span>
          <span><i style={{ background: C.tr }} /> Total revenue</span>
          <span><i style={{ background: C.tc }} /> Total costs</span>
        </figcaption>
      )}
    </figure>
  )
}
