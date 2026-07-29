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

  // Build a shared, jittered vertex grid so adjacent shards fit exactly.
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
      const distFromMid = Math.hypot(centerX - 0.5, centerY - 0.5)

      shards.push({
        id: `${r}-${c}`,
        clipPath,
        delay: distFromMid * 0.35 + Math.random() * 0.08,
        fallY: 260 + Math.random() * 320,
        driftX: (Math.random() - 0.5) * 110,
        rotate: (Math.random() - 0.5) * 130,
      })
    }
  }
  return shards
}

export default function GlassName({ text, trigger, onFallComplete }) {
  const [shards, setShards] = useState(null)

  useEffect(() => {
    if (trigger && !shards) {
      const built = buildShards()
      setShards(built)
      const maxDuration = Math.max(...built.map((s) => s.delay)) + 0.9
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
      {shards.map((s) => (
        <motion.div
          key={s.id}
          className="glass-shard"
          style={{ clipPath: s.clipPath }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: s.fallY, x: s.driftX, rotate: s.rotate, opacity: 0 }}
          transition={{ duration: 0.6 + Math.random() * 0.25, delay: s.delay, ease: [0.4, 0, 0.7, 1] }}
        >
          <span className="glass-text">{text}</span>
        </motion.div>
      ))}
    </div>
  )
}
