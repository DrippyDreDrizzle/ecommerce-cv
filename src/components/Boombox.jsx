import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Boombox.css'

// Small library of ORIGINAL synthesized note sequences (frequencies in
// Hz + note durations). These are generated tones, not real songs —
// swap this out for your own licensed/owned audio files later by
// pointing an <audio> element at them instead of using playSequence.
const TRACKS = [
  { name: 'Shop Groove 01', notes: [392, 440, 494, 523, 587, 523, 494, 440] },
  { name: 'Checkout Beat', notes: [330, 392, 330, 392, 440, 392, 330, 294] },
  { name: 'Aisle Ambient', notes: [261, 293, 329, 349, 392, 349, 329, 293] },
  { name: 'Loyalty Loop', notes: [523, 587, 659, 587, 523, 440, 392, 440] },
]

const NOTE_GLYPHS = ['♪', '♫', '♬']

let audioCtx
function getAudioContext() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    audioCtx = new AC()
  }
  return audioCtx
}

function playSequence(notes) {
  const ctx = getAudioContext()
  const now = ctx.currentTime
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = freq
    const start = now + i * 0.18
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(0.12, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.18)
  })
}

export default function Boombox({ collectionLabel = 'Collection', playLabel = 'Play a Track' }) {
  const [notes, setNotes] = useState([])
  const [showCollection, setShowCollection] = useState(false)
  const idRef = useRef(0)

  const burstNotes = () => {
    const burst = Array.from({ length: 6 }, () => ({
      id: idRef.current++,
      glyph: NOTE_GLYPHS[Math.floor(Math.random() * NOTE_GLYPHS.length)],
      x: (Math.random() - 0.5) * 140,
      color: Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)',
    }))
    setNotes((prev) => [...prev, ...burst])
    setTimeout(() => {
      setNotes((prev) => prev.filter((n) => !burst.includes(n)))
    }, 1000)
  }

  const play = (track) => {
    try {
      playSequence(track.notes)
    } catch {
      // Web Audio can fail without a user gesture in some browsers;
      // the click that calls this already counts as one, so this is
      // just a safety net.
    }
    burstNotes()
  }

  const playRandom = () => play(TRACKS[Math.floor(Math.random() * TRACKS.length)])

  return (
    <div className="boombox-wrap">
      <div className="boombox-notes">
        <AnimatePresence>
          {notes.map((n) => (
            <motion.span
              key={n.id}
              className="boombox-note"
              style={{ color: n.color }}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -90, x: n.x, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {n.glyph}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <button className="boombox" onClick={playRandom} aria-label="Play a random track">
        <span className="boombox-speaker" />
        <span className="boombox-display">▶ {playLabel}</span>
        <span className="boombox-speaker" />
      </button>

      <button className="boombox-collection-toggle" onClick={() => setShowCollection((s) => !s)}>
        {collectionLabel} {showCollection ? '▲' : '▼'}
      </button>

      {showCollection && (
        <ul className="boombox-collection">
          {TRACKS.map((track) => (
            <li key={track.name}>
              <button onClick={() => play(track)}>▶ {track.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
