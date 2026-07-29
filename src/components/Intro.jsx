import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassName from './GlassName'
import MainMenu from './MainMenu'
import './Intro.css'

export default function Intro({ tabs, onSelectTab, onEnter }) {
  const [entering, setEntering] = useState(false)
  const [panned, setPanned] = useState(false)

  const handleEnter = () => {
    if (entering) return
    setEntering(true)
    // Let the glass name start shattering, then begin panning the
    // whole screen down shortly after so the shards are already
    // tumbling as the camera pulls away.
    setTimeout(() => setPanned(true), 320)
  }

  return (
    <div className="intro-viewport">
      <motion.div
        className="intro-track"
        animate={{ y: panned ? '-100vh' : '0vh' }}
        transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
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
            <GlassName
              text="André Marjolin"
              trigger={entering}
              onFallComplete={() => {}}
            />
            <motion.p
              className="intro-role"
              animate={{ opacity: entering ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              Ecommerce Growth &amp; Shopify Development
            </motion.p>
            <motion.p
              className="intro-cta"
              animate={entering ? { opacity: 0 } : { opacity: [0.35, 1, 0.35] }}
              transition={
                entering
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
              }
            >
              Click or tap to enter
            </motion.p>
          </div>
        </button>

        <div className="intro-menu-preview">
          <MainMenu tabs={tabs} onSelect={onSelectTab} />
        </div>
      </motion.div>
    </div>
  )
}
