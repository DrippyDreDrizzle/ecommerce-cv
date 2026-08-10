import { useEffect, useRef } from 'react'
import './MatrixTransition.css'

const CHARS = '01'

export default function MatrixTransition({ onMidpoint, onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const fontSize = 18
    const columns = Math.ceil(width / fontSize)
    const drops = new Array(columns).fill(0)

    let frame
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 13, 20, 0.18)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = Math.random() > 0.94 ? '#e6c9ff' : '#9d5cff'
        ctx.fillText(char, x, y)
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      frame = requestAnimationFrame(draw)
    }
    draw()

    const midTimer = setTimeout(() => onMidpoint?.(), 320)
    const doneTimer = setTimeout(() => onDone?.(), 800)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(midTimer)
      clearTimeout(doneTimer)
    }
  }, [onMidpoint, onDone])

  return (
    <div className="matrix-transition">
      <canvas ref={canvasRef} />
    </div>
  )
}
