import { useEffect, useRef, useState } from 'react'
import './ElectricTitle.css'

// Trace the actual font pixels, including enclosed counters and stencil cuts.
function contours(context, width, height) {
  const data = context.getImageData(0, 0, width, height).data
  const inside = (x, y) => x >= 0 && y >= 0 && x < width && y < height && data[(y * width + x) * 4 + 3] > 110
  const edges = new Map()
  const add = (x, y, ex, ey) => {
    const key = y * (width + 1) + x
    if (!edges.has(key)) edges.set(key, [])
    edges.get(key).push([ex, ey])
  }
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (!inside(x, y)) continue
    if (!inside(x, y - 1)) add(x, y, x + 1, y)
    if (!inside(x + 1, y)) add(x + 1, y, x + 1, y + 1)
    if (!inside(x, y + 1)) add(x + 1, y + 1, x, y + 1)
    if (!inside(x - 1, y)) add(x, y + 1, x, y)
  }
  const loops = []
  while (edges.size) {
    const start = edges.keys().next().value
    let key = start
    const points = []
    do {
      points.push([key % (width + 1), Math.floor(key / (width + 1))])
      const next = edges.get(key)
      if (!next?.length) break
      const [x, y] = next.pop()
      if (!next.length) edges.delete(key)
      key = y * (width + 1) + x
    } while (key !== start && points.length < width * height * 4)
    if (points.length > 18) loops.push(points)
  }
  return loops.sort((a, b) => b.length - a.length).map((loop) => loop.map((_, i) => {
    // Remove the one-pixel stair steps without flattening letter corners.
    const samples = [-2, -1, 0, 1, 2].map((offset) => loop[(i + offset + loop.length) % loop.length])
    return [0, 1].map((axis) => samples.reduce((sum, point, j) => sum + point[axis] * [1, 2, 3, 2, 1][j], 0) / 9)
  }))
}

function sampleLoop(loop, position) {
  const wrapped = ((position % loop.length) + loop.length) % loop.length
  const index = Math.floor(wrapped)
  const fraction = wrapped - index
  const next = loop[(index + 1) % loop.length]
  return loop[index].map((value, axis) => value + (next[axis] - value) * fraction)
}

const smooth = (value) => {
  const x = Math.max(0, Math.min(1, value))
  return x * x * (3 - 2 * x)
}

function stroke(context, points, width, colour, blur = 0) {
  if (points.length < 2) return
  context.beginPath()
  context.moveTo(...points[0])
  points.slice(1).forEach((point) => context.lineTo(...point))
  context.lineWidth = width
  context.strokeStyle = colour
  context.shadowColor = '#a52cff'
  context.shadowBlur = blur
  context.stroke()
}

export default function ElectricTitle({ text }) {
  const root = useRef(null)
  const canvas = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const context = canvas.current.getContext('2d')
    if (!context) return undefined
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let glyphs = []
    let frame
    let last = 0
    let disposed = false
    let box
    let font
    let ratio

    const base = () => {
      if (!box) return
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, box.width, box.height)
      context.font = font
      context.lineJoin = 'round'
      context.lineCap = 'round'
      context.textBaseline = 'alphabetic'
      context.shadowBlur = 0
      for (const glyph of glyphs) {
        context.strokeStyle = '#eee5fa'
        context.lineWidth = 1.45
        context.strokeText(glyph.letter, glyph.x, glyph.baseline)
        context.fillStyle = '#0a0d14'
        context.fillText(glyph.letter, glyph.x, glyph.baseline)
      }
    }

    const draw = (now) => {
      if (disposed || document.hidden || motion.matches) return
      frame = requestAnimationFrame(draw)
      if (now - last < 33) return
      last = now
      base()
      const t = now / 1000
      context.globalCompositeOperation = 'lighter'
      for (const glyph of glyphs) {
        if (!glyph.loops.length) continue
        const loopCount = Math.min(3, glyph.loops.length)
        const phase = t / 4 + glyph.seed
        const current = Math.floor(phase) % loopCount
        // Overlap the old and new contours for the last 800ms of each cycle.
        const mix = loopCount > 1 ? smooth(((phase % 1) - .8) / .2) : 0
        const passes = [[current, 1 - mix]]
        if (mix > 0) passes.push([(current + 1) % loopCount, mix])
        for (const [loopIndex, weight] of passes) {
          const loop = glyph.loops[loopIndex]
          const length = loop.length
          const head = (t * glyph.speed + glyph.seed * length) % length
          const count = Math.min(length - 1, Math.max(18, Math.floor(length * .36)))
          const arc = []
          for (let j = 0; j < count; j += 2) {
            const index = ((head + j * glyph.direction) % length + length) % length
            const point = sampleLoop(loop, index)
            const before = sampleLoop(loop, index - 3)
            const after = sampleLoop(loop, index + 3)
            const dx = after[0] - before[0], dy = after[1] - before[1]
            const magnitude = Math.hypot(dx, dy) || 1
            const envelope = Math.sin(Math.PI * j / count)
            // Whole cycles around each contour keep the noise continuous at its seam.
            const angle = index / length * Math.PI * 2
            const bend = envelope * (3.8 * Math.sin(angle * Math.max(1, Math.round(length * .12 / (Math.PI * 2))) + t * 8 + glyph.seed) + 1.8 * Math.sin(angle * Math.max(1, Math.round(length * .57 / (Math.PI * 2))) - t * 13))
            arc.push([point[0] + glyph.offsetX - dy / magnitude * bend, point[1] + glyph.offsetY + dx / magnitude * bend])
          }
          context.globalAlpha = weight * (.55 + .35 * Math.sin(t * 2.1 + glyph.seed) ** 2)
          stroke(context, arc, 3.1, '#8f23e5', 9)
          stroke(context, arc, 1.55, '#b85aff', 3)
          // Taper both ends so the discharge grows and dies into the contour.
          stroke(context, arc.slice(2, -2), .65, '#efcfff')
          const branchOpacity = smooth((Math.sin(t * 2.4 + glyph.seed * 5) - .1) / .6)
          if (arc.length > 8 && branchOpacity > 0) {
            context.globalAlpha *= branchOpacity
            const origin = arc[Math.floor(arc.length * .45)]
            const reconnect = arc[Math.floor(arc.length * .8)]
            const branch = Array.from({ length: 9 }, (_, i) => {
              const f = i / 8
              const excursion = Math.sin(f * Math.PI) * (7 + 4 * Math.sin(t * 6 + glyph.seed))
              return [origin[0] + (reconnect[0] - origin[0]) * f + Math.sin(f * 15 + t * 8) * excursion * .45, origin[1] + (reconnect[1] - origin[1]) * f + glyph.direction * excursion]
            })
            stroke(context, branch, 1.1, '#b85aff', 6)
            stroke(context, branch, .45, '#e4b9ff')
          }
        }
      }
      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
      context.shadowBlur = 0
    }

    const restart = () => {
      cancelAnimationFrame(frame)
      base()
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const measure = () => {
      if (disposed) return
      box = root.current.getBoundingClientRect()
      const style = getComputedStyle(root.current)
      font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.current.width = Math.ceil(box.width * ratio)
      canvas.current.height = Math.ceil(box.height * ratio)
      glyphs = Array.from(root.current.querySelectorAll('[data-electric-letter]')).map((element, index) => {
        const bounds = element.getBoundingClientRect()
        const letter = element.textContent.toLocaleUpperCase()
        const mask = document.createElement('canvas')
        mask.width = Math.ceil(bounds.width + 24)
        mask.height = Math.ceil(bounds.height + 24)
        const ctx = mask.getContext('2d', { willReadFrequently: true })
        ctx.font = font
        const metrics = ctx.measureText(letter)
        const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize) * .9
        const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize) * .25
        const baseline = (bounds.height - ascent - descent) / 2 + ascent
        ctx.fillStyle = '#fff'
        ctx.fillText(letter, 12, 12 + baseline)
        return { letter, x: bounds.left - box.left, baseline: bounds.top - box.top + baseline, offsetX: bounds.left - box.left - 12, offsetY: bounds.top - box.top - 12, loops: contours(ctx, mask.width, mask.height), seed: index * 1.713 + Math.random(), speed: 42 + Math.random() * 45, direction: index % 2 ? 1 : -1 }
      })
      restart()
      setReady(true)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(root.current)
    document.fonts.ready.then(measure)
    document.fonts.addEventListener('loadingdone', measure)
    motion.addEventListener('change', restart)
    document.addEventListener('visibilitychange', restart)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', measure)
      motion.removeEventListener('change', restart)
      document.removeEventListener('visibilitychange', restart)
    }
  }, [text])

  return <div ref={root} className={`electric-title ${ready ? 'is-rendered' : ''}`} role="img" aria-label={text}>
    {text.split(' ').map((word, index) => <span key={index} className="electric-word" aria-hidden="true">{Array.from(word).map((letter, i) => <span key={i} data-electric-letter className="electric-glyph">{letter}</span>)}</span>)}
    <canvas ref={canvas} className="electric-canvas" aria-hidden="true" />
  </div>
}
