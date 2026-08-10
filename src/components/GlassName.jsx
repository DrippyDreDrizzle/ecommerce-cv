import { useEffect, useState } from 'react'
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
        delay: 0.55 + distFromMid * 0.3 + Math.random() * 0.06,
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
      size: 4 + Math.random() * 8,
      delay: Math.random() * 0.15,
      hue: Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)',
    }
  })
}

export default function GlassName({ text, trigger, onFallComplete }) {
  const [shards, setShards] = useState(null)
  const [sparkles, setSparkles] = useState(null)

  useEffect(() => {
    if (trigger && !shards) {
      const built = buildShards()
      setShards(built)
      setSparkles(buildSparkles())
      const maxDuration = Math.max(...built.map((s) => s.delay)) + 0.95
      const timeout = setTimeout(() => onFallComplete?.(), maxDuration * 1000)
      return () => clearTimeout(timeout)
    }
  }, [trigger, shards, onFallComplete])

  if (!shards) {
    return <ElectricTitle text={text} />
  }

  return (
    <div className="glass-name" aria-hidden="true">
      <span className="glass-text glass-text-ghost">{text}</span>

      <motion.div
        className="impact-flash"
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      {sparkles.map((sp) => (
        <motion.span
          key={sp.id}
          className="glass-sparkle"
          style={{ width: sp.size, height: sp.size, background: sp.hue }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: sp.x, y: sp.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6 + Math.random() * 0.3, delay: sp.delay, ease: 'easeOut' }}
        />
      ))}

      {shards.map((s) => (
        <motion.div
          key={s.id}
          className="glass-shard"
          style={{ clipPath: s.clipPath }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: [0, s.burstX, s.fallX],
            y: [0, s.burstY, s.fallY],
            rotate: [0, s.rotate * 0.4, s.rotate],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.75 + Math.random() * 0.25,
            delay: s.delay,
            times: [0, 0.22, 1],
            ease: [0.3, 0, 0.6, 1],
          }}
        >
          <span className="glass-text">{text}</span>
          <span className="glass-facet" />
        </motion.div>
      ))}
    </div>
  )
}
