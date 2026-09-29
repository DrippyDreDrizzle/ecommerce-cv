import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import GlassName from './GlassName'
import MainMenu from './MainMenu'
import './Intro.css'

export default function Intro({ tabs, onSelectTab, onEnter }) {
  const reducedMotion = useReducedMotion()
  const [entering, setEntering] = useState(false)
  const [panned, setPanned] = useState(false)

  useEffect(() => {
    if (!entering) return undefined
    const timer = setTimeout(() => setPanned(true), 420)
    return () => clearTimeout(timer)
  }, [entering])

  const handleEnter = () => {
    if (entering) return
    if (reducedMotion) { onEnter(); return }
    setEntering(true)
  }

  return (
    <div className="intro-viewport">
      <motion.div
        className="intro-track"
        animate={{ y: panned ? '-50%' : '0%' }}
        transition={{ duration: .82, ease: [.45, 0, .2, 1] }}
        onAnimationComplete={() => {
          if (panned) onEnter()
        }}
      >
        <button
          className="intro-screen"
          onClick={handleEnter}
          aria-label="Enter site"
          disabled={entering}
        >
          <div className="intro-stripe" />
          <div className="intro-content">
            <div className={`intro-name-frame ${entering ? 'is-breaking' : ''}`}>
              <GlassName text="André Marjolin" trigger={entering} />
            </div>
            <motion.p
              className="intro-role"
              animate={{ opacity: entering ? 0 : 1 }}
              transition={{ duration: 0.18 }}
            >
              Ecommerce Growth &amp; Shopify Development
            </motion.p>
            <motion.p
              className="intro-cta"
              animate={entering ? { opacity: 0 } : { opacity: [.72, 1, .72] }}
              transition={
                entering
                  ? { duration: 0.18 }
                  : { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
              }
            >
              Click or tap to enter
            </motion.p>
          </div>
        </button>

        <div className="intro-menu-preview" inert="" aria-hidden="true">
          <MainMenu tabs={tabs} onSelect={onSelectTab} />
        </div>
      </motion.div>
    </div>
  )
}
