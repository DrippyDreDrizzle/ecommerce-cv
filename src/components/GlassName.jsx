import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ElectricTitle from './ElectricTitle'
import './GlassName.css'

// Builds an irregular grid of quad "shards" covering the 0-1 x 0-1 box.
// Row/column sizes vary (for a mix of big and small pieces), and every
// interior grid vertex is jittered so the cracks aren't a plain grid —
// while still tessellating perfectly, since neighboring shards share
// the exact same jittered corner points.
function buildShards(rows = 3, cols = 5) {
  const normalize = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0)
    return arr.map((v) => v / sum)
  }
  const cumulative = (fracs) => {
    let acc = 0
    return [0, ...fracs.map((f) => (acc += f))]
  }

  const rowFracs = normalize(Array.from({ length: rows }, () => 0.6 + Math.random() * 0.8))
  const colFracs = normalize(Array.from({ length: cols }, () => 0.6 + Math.random() * 0.8))
  const rowB = cumulative(rowFracs)
  const colB = cumulative(colFracs)

  const points = []
  for (let r = 0; r <= rows; r++) {
    const row = []
    for (let c = 0; c <= cols; c++) {
      const interior = r > 0 && r < rows && c > 0 && c < cols
      const jitterX = interior ? (Math.random() - 0.5) * 0.05 : 0
      const jitterY = interior ? (Math.random() - 0.5) * 0.05 : 0
      row.push({ x: colB[c] + jitterX, y: rowB[r] + jitterY })
    }
    points.push(row)
  }

  const shards = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p00 = points[r][c]
      const p10 = points[r][c + 1]
      const p11 = points[r + 1][c + 1]
      const p01 = points[r + 1][c]
      const clipPath = `polygon(${p00.x * 100}% ${p00.y * 100}%, ${p10.x * 100}% ${p10.y * 100}%, ${p11.x * 100}% ${p11.y * 100}%, ${p01.x * 100}% ${p01.y * 100}%)`

      const centerX = (p00.x + p10.x + p11.x + p01.x) / 4
      const centerY = (p00.y + p10.y + p11.y + p01.y) / 4
      const dx = centerX - 0.5
      const dy = centerY - 0.5
      const distFromMid = Math.hypot(dx, dy) || 0.001
      // Outward burst direction, away from the impact point at center
      const dirX = dx / distFromMid
      const dirY = dy / distFromMid

      shards.push({
        id: `${r}-${c}`,
        clipPath,
        delay: 0.06 + distFromMid * 0.12 + Math.random() * 0.025,
        burstX: dirX * (30 + Math.random() * 40),
        burstY: dirY * (20 + Math.random() * 30),
        fallX: dirX * (40 + Math.random() * 60) + (Math.random() - 0.5) * 40,
        fallY: 240 + Math.random() * 320,
        rotate: (Math.random() - 0.5) * 150,
      })
    }
  }
  return shards
}

function buildSparkles(count = 14) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const dist = 60 + Math.random() * 120
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 0.05,
      hue: Math.random() > 0.5 ? 'var(--primary)' : '#e8d0ff',
    }
  })
}

export default function GlassName({ text, trigger }) {
  const stage = useRef(null)
  const [scene, setScene] = useState(null)

  useEffect(() => {
    if (!trigger || scene) return
    const source = stage.current.querySelector('canvas')
    const bounds = stage.current.getBoundingClientRect()
    let image = null
    try { image = source?.toDataURL('image/png') || null } catch { /* Text fallback if capture is unavailable. */ }
    setScene({ image, width: bounds.width, height: bounds.height, shards: buildShards(), sparkles: buildSparkles() })
  }, [trigger, scene])

  return (
    <div ref={stage} className="glass-name-stage" style={scene ? { width: scene.width, height: scene.height } : undefined}>
      {!scene ? <ElectricTitle text={text} /> : <div className="glass-name" aria-hidden="true">
        <motion.div className="impact-flash" initial={{ scale: .5, opacity: .65 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: .24, ease: 'easeOut' }} />
        {scene.sparkles.map((spark) => <motion.span key={spark.id} className="glass-sparkle" style={{ width: spark.size, height: spark.size, background: spark.hue }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: spark.x, y: spark.y, opacity: 0, scale: .2 }} transition={{ duration: .45, delay: spark.delay, ease: 'easeOut' }} />)}
        {scene.shards.map((shard) => <motion.div key={shard.id} className="glass-shard" style={{ clipPath: shard.clipPath }} initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: [0, shard.burstX * .5, shard.fallX], y: [0, shard.burstY * .4, shard.fallY], rotate: [0, shard.rotate * .12, shard.rotate], opacity: [1, 1, 0] }} transition={{ duration: .78, delay: shard.delay, times: [0, .2, 1], ease: [.32, 0, .7, 1] }}>
          {scene.image ? <img className="glass-snapshot" src={scene.image} alt="" draggable="false" /> : <span className="glass-text">{text}</span>}
          <span className="glass-facet" />
        </motion.div>)}
      </div>}
    </div>
  )
}
