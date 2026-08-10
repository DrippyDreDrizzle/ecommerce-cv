import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './Travel.css'

// lat/long placeholders — swap with real values or real photos later.
// x/y are just simple projected positions (0-100%) for the stylized
// globe, not a real map projection.
const DESTINATIONS = [
  { id: 'japan', name: 'Japan', status: 'visited', x: 84, y: 38 },
  { id: 'usa', name: 'United States', status: 'visited', x: 18, y: 34 },
  { id: 'france', name: 'France', status: 'visited', x: 48, y: 26 },
  { id: 'brazil', name: 'Brazil', status: 'want', x: 34, y: 66 },
  { id: 'australia', name: 'Australia', status: 'want', x: 86, y: 74 },
  { id: 'south-africa', name: 'South Africa', status: 'want', x: 52, y: 68 },
]

export default function Travel() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState(null)
  const [globeRotation, setGlobeRotation] = useState(0)
  const [openPhoto, setOpenPhoto] = useState(null)

  const selectDestination = (dest) => {
    setActiveId(dest.id)
    // Stylized "spin to location": rotate the globe based on the
    // destination's x position. A real 3D globe (react-globe.gl /
    // Three.js) would fly the camera to real lat/long instead.
    setGlobeRotation(360 - dest.x * 3.6)
  }

  return (
    <Panel eyebrow="05 — Travel" title={t.travelTitle}>
      <div className="travel-layout">
        <div className="globe-wrap">
          <motion.div
            className="globe"
            animate={{ rotate: globeRotation }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="globe-grid" />
          </motion.div>
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              className={`globe-pin ${d.status} ${activeId === d.id ? 'is-active' : ''}`}
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              onClick={() => selectDestination(d)}
              aria-label={d.name}
            />
          ))}
          <div className="globe-home-pin" style={{ left: '47%', top: '22%' }}>
            <span className="globe-home-dot" />
            <span className="globe-home-label">{t.homeBase}: London</span>
          </div>
        </div>

        <div className="destination-list">
          {DESTINATIONS.map((d) => (
            <div key={d.id} className="polaroid-row">
              <button
                className={`polaroid ${activeId === d.id ? 'is-active' : ''}`}
                onClick={() => {
                  selectDestination(d)
                  setOpenPhoto(d.id)
                }}
              >
                <span className="polaroid-photo" data-status={d.status} />
                <span className="polaroid-caption">{d.name}</span>
              </button>
              <span className={`status-tag ${d.status}`}>
                {d.status === 'visited' ? t.visited : t.wantToVisit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openPhoto && (
          <motion.div
            className="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenPhoto(null)}
          >
            <motion.div
              className="photo-modal"
              initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: -2, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="polaroid-photo large" />
              <span className="polaroid-caption">
                {DESTINATIONS.find((d) => d.id === openPhoto)?.name}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  )
}
