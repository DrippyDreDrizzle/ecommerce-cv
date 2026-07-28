import { motion } from 'framer-motion'
import './Panel.css'

const wipeVariants = {
  initial: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0.4 },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0.4,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
}

export default function Panel({ eyebrow, title, children }) {
  return (
    <motion.section
      className="panel"
      variants={wipeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="panel-header">
        {eyebrow && <p className="panel-eyebrow">{eyebrow}</p>}
        <h2 className="panel-title glitch-title" data-text={title}>
          {title}
        </h2>
      </div>
      <div className="panel-body">{children}</div>
    </motion.section>
  )
}
