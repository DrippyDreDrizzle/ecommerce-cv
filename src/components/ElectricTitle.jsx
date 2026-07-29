import { useEffect, useState } from 'react'
import './ElectricTitle.css'

// Electric stencil title: bold black type with a purple current that
// flows continuously through the letterforms (clipped to the text
// shape itself via background-clip: text), plus periodic brighter
// crackle bursts layered on top. Built from scratch with CSS.
export default function ElectricTitle({ text }) {
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    let timeout
    const cycle = () => {
      setFlicker(true)
      timeout = setTimeout(() => {
        setFlicker(false)
        timeout = setTimeout(cycle, 350 + Math.random() * 450)
      }, 90 + Math.random() * 90)
    }
    timeout = setTimeout(cycle, 300)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`electric-title ${flicker ? 'is-flickering' : ''}`}>
      <span className="electric-text" data-text={text}>
        {text}
      </span>
    </div>
  )
}
