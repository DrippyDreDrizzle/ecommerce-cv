import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './Travel.css'

// lat/long placeholders — swap with real values later. x/y are just
// simple projected positions (0-100%) for the stylized globe, not a
// real map projection. `images` holds however many photo URLs you
// want per destination — add your own and the gallery below adapts.
const DESTINATIONS = [
  { id: 'london', status: 'home', x: 47, y: 22, images: [] },
  { id: 'japan', status: 'visited', x: 84, y: 38, images: [] },
  { id: 'usa', status: 'visited', x: 18, y: 34, images: [] },
  { id: 'france', status: 'visited', x: 48, y: 26, images: [] },
  { id: 'brazil', status: 'want', x: 34, y: 66, images: [] },
  { id: 'australia', status: 'want', x: 86, y: 74, images: [] },
  { id: 'south-africa', status: 'want', x: 52, y: 68, images: [] },
]

export default function Travel() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState(null)
  const [globeRotation, setGlobeRotation] = useState(0)
  const [openId, setOpenId] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const selectDestination = (dest) => {
    setActiveId(dest.id)
    setGlobeRotation(360 - dest.x * 3.6)
  }

  const openModal = (dest) => {
    selectDestination(dest)
    setOpenId(dest.id)
    setPhotoIndex(0)
  }

  const openDest = DESTINATIONS.find((d) => d.id === openId)
  const openInfo = openDest ? t.content.travel[openDest.id] : null
  const photoCount = openDest?.images.length || 0

  const statusLabel = (status) => {
    if (status === 'home') return t.home
    if (status === 'visited') return t.visited
    return t.wantToVisit
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
              aria-label={t.content.travel[d.id]?.name}
            />
          ))}
        </div>

        <div className="destination-list">
          {DESTINATIONS.map((d) => {
            const info = t.content.travel[d.id]
            return (
              <div key={d.id} className="polaroid-row">
                <button
                  className={`polaroid ${activeId === d.id ? 'is-active' : ''}`}
                  onClick={() => openModal(d)}
                >
                  <span className="polaroid-photo" data-status={d.status} />
                  <span className="polaroid-caption">{info?.name}</span>
                </button>
                <div className="destination-copy">
                  <span className={`status-tag ${d.status}`}>{statusLabel(d.status)}</span>
                  <p className="destination-blurb">{info?.blurb}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {openDest && (
          <motion.div
            className="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="photo-modal"
              initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: -2, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="photo-modal-image-wrap">
                <span className="polaroid-photo large" />
                {photoCount > 1 && (
                  <>
                    <button
                      className="photo-nav prev"
                      onClick={() => setPhotoIndex((i) => (i - 1 + photoCount) % photoCount)}
                    >
                      ‹
                    </button>
                    <button
                      className="photo-nav next"
                      onClick={() => setPhotoIndex((i) => (i + 1) % photoCount)}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              <span className="polaroid-caption">{openInfo?.name}</span>
              <p className="photo-modal-blurb">{openInfo?.blurb}</p>
              {photoCount === 0 && (
                <p className="photo-modal-hint">Add photos in DESTINATIONS in Travel.jsx</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  )
}
