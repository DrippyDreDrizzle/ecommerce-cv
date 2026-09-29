import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ElectricTitle from './ElectricTitle'
import './GlassName.css'

// Shared radial edges make the visible cracks and falling pieces match.
function buildShards() {
  const corners = [0, .25, .5, .75, 1]
  const edges = []
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 4; i++) {
      const t = corners[i] + (i ? (Math.random() - .5) * .1 : 0)
      edges.push(side === 0 ? [t, 0] : side === 1 ? [1, t] : side === 2 ? [1 - t, 1] : [0, 1 - t])
    }
  }
  return edges.map((a, i) => {
    const b = edges[(i + 1) % edges.length]
    const dx = (a[0] + b[0]) / 2 - .5
    const dy = (a[1] + b[1]) / 2 - .5
    return {
      id: i,
      clipPath: `polygon(50% 50%, ${a[0] * 100}% ${a[1] * 100}%, ${b[0] * 100}% ${b[1] * 100}%)`,
      crack: `M50 50 L${a[0] * 100} ${a[1] * 100}`,
      delay: .065 + Math.random() * .035,
      burstX: dx * 100,
      burstY: dy * 70,
      fallX: dx * 180 + 30,
      fallY: 260 + Math.random() * 260,
      rotate: (Math.random() - .5) * 130,
    }
  })
}

function Kunai({ hit, onContact }) {
  return <motion.div className="kunai-flight" aria-hidden="true"
    initial={{ x: '-100vw', y: '-70vw', opacity: 1 }}
    animate={hit ? { x: '90vw', y: '63vw', opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
    transition={hit ? { duration: .3, delay: .065, ease: 'easeIn' } : { duration: .26, ease: [.55, 0, 1, 1] }}
    onAnimationComplete={() => { if (!hit) onContact() }}>
    <div className="kunai-angle">
      <span className="kunai-trail" />
      <svg viewBox="0 0 180 48" fill="none" focusable="false">
        <circle cx="16" cy="24" r="10" fill="#12101d" stroke="#b4a6cc" strokeWidth="4" />
        <path d="M27 18 H77 V30 H27Z" fill="#262031" stroke="#9884b6" />
        <path d="M32 18 L38 30 M42 18 L48 30 M52 18 L58 30 M62 18 L68 30" stroke="#c6b1e7" strokeWidth="2" />
        <path d="M76 12 L84 24 L76 36" stroke="#dac7f5" strokeWidth="4" />
        <path d="M83 24 L107 3 L180 24 L107 45Z" fill="#82718f" stroke="#eadfff" strokeWidth="1.5" />
        <path d="M83 24 L107 3 L180 24Z" fill="#e5dfee" />
        <path d="M107 3 L115 24 L107 45 L180 24Z" fill="#b09ac8" />
        <path d="M83 24 H180" stroke="#faf5ff" strokeWidth="1.3" />
      </svg>
    </div>
  </motion.div>
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

export default function GlassName({ text, trigger, onImpact }) {
  const stage = useRef(null)
  const [scene, setScene] = useState(null)

  const handleContact = () => {
    if (scene || !stage.current) return
    const source = stage.current.querySelector('canvas')
    const bounds = stage.current.getBoundingClientRect()
    let image = null
    try { image = source?.toDataURL('image/png') || null } catch { /* Keep the text fallback. */ }
    setScene({ image, width: bounds.width, height: bounds.height, shards: buildShards(), sparkles: buildSparkles() })
    onImpact(true)
  }

  return (
    <div ref={stage} className={`glass-name-stage ${scene ? 'has-impact' : ''}`} style={scene ? { width: scene.width, height: scene.height } : undefined}>
      {trigger && <Kunai hit={!!scene} onContact={handleContact} />}
      {!scene ? <ElectricTitle text={text} /> : <div className="glass-name" aria-hidden="true">
        <div className="glass-impact-frame">
          {scene.image && <img className="glass-impact-image" src={scene.image} alt="" />}
        </div>
        <svg className="glass-cracks" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {scene.shards.map(shard => <path key={shard.id} d={shard.crack} vectorEffect="non-scaling-stroke" />)}
        </svg>
        <motion.div className="impact-flash" initial={{ scale: .25, opacity: .5 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: .24, ease: 'easeOut' }} />
        {scene.sparkles.map((spark) => <motion.span key={spark.id} className="glass-sparkle" style={{ width: spark.size, height: spark.size, background: spark.hue }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: spark.x, y: spark.y, opacity: 0, scale: .2 }} transition={{ duration: .45, delay: .06 + spark.delay, ease: 'easeOut' }} />)}
        {scene.shards.map((shard) => <motion.div key={shard.id} className="glass-shard" style={{ clipPath: shard.clipPath }} initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: [0, shard.burstX * .5, shard.fallX], y: [0, shard.burstY * .4, shard.fallY], rotate: [0, shard.rotate * .12, shard.rotate], opacity: [1, 1, 0] }} transition={{ duration: .78, delay: shard.delay, times: [0, .2, 1], ease: [.32, 0, .7, 1] }}>
          {scene.image ? <img className="glass-snapshot" src={scene.image} alt="" draggable="false" /> : <span className="glass-text">{text}</span>}
          <span className="glass-facet" />
        </motion.div>)}
      </div>}
    </div>
  )
}
