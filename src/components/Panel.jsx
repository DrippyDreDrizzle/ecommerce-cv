import { motion, useReducedMotion } from 'framer-motion'
import './Panel.css'

export default function Panel({ title, children }) {
  const reduced = useReducedMotion()
  return (
    <motion.section className="panel"
      initial={reduced ? false : { opacity: .65, y: 6 }}
      animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22, ease: 'easeOut' }}>
      {title && <div className="panel-header">
        <h2 className="panel-title" tabIndex={-1}>{title}</h2>
      </div>}
      <div className="panel-body">{children}</div>
    </motion.section>
  )
}
