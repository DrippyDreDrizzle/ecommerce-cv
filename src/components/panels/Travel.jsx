import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './Travel.css'

// Photo URLs can be added to each destination when personal pictures are ready.
// Country IDs are ISO 3166 numeric codes in Natural Earth / world-atlas.
const DESTINATIONS = [
  { id: 'london', country: '826', status: 'home', coordinates: [-0.19, 51.27], palette: ['#7390b6', '#24334f'], images: [] },
  { id: 'japan', country: '392', status: 'visited', coordinates: [139.69, 35.68], palette: ['#da9aab', '#594064'], images: [] },
  { id: 'usa', country: '840', status: 'visited', coordinates: [-98.58, 39.83], palette: ['#c19b82', '#3c4164'], images: [] },
  { id: 'france', country: '250', status: 'visited', coordinates: [2.35, 48.86], palette: ['#bea6ce', '#43506e'], images: [] },
  { id: 'brazil', country: '076', status: 'want', coordinates: [-47.88, -15.79], palette: ['#92b89a', '#22575d'], images: [] },
  { id: 'australia', country: '036', status: 'want', coordinates: [133.77, -25.27], palette: ['#dfad8b', '#685368'], images: [] },
  { id: 'south-africa', country: '710', status: 'want', coordinates: [24.0, -29.0], palette: ['#c5a98c', '#555070'], images: [] },
]

const countries = feature(world, world.objects.countries).features
const graticule = geoGraticule10()
const SIZE = 440
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const shortestTurn = (start, end) => start + ((((end - start) % 360) + 540) % 360 - 180)

function DestinationVisual({ destination, name, image, large = false, index = 0 }) {
  return (
    <span className={`travel-visual ${large ? 'is-large' : ''}`} data-variant={index % 2} style={{ '--travel-light': destination.palette[0], '--travel-dark': destination.palette[1] }}>
      {image ? <img src={image} alt={`${name} — photo ${index + 1}`} /> : <>
        <span className="travel-visual-sun" />
        <span className="travel-visual-ridge" />
        <span className="travel-visual-label">{large ? 'PHOTO COMING SOON' : 'TRAVEL JOURNAL'}</span>
      </>}
    </span>
  )
}

export default function Travel() {
  const { t } = useLanguage()
  const [rotation, setRotation] = useState([-25, -18])
  const [activeId, setActiveId] = useState('london')
  const [openId, setOpenId] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const animation = useRef(null)
  const modalTimer = useRef(null)
  const drag = useRef(null)
  const ignoreClick = useRef(false)
  const modalClose = useRef(null)
  const opener = useRef(null)

  const projection = useMemo(() => geoOrthographic().translate([SIZE / 2, SIZE / 2]).scale(205).rotate(rotation).clipAngle(90).precision(.7), [rotation])
  const path = geoPath(projection)
  const active = DESTINATIONS.find((d) => d.id === activeId)
  const openDest = DESTINATIONS.find((d) => d.id === openId)
  const openInfo = openDest && t.content.travel[openDest.id]
  const gallery = openDest ? (openDest.images.length ? openDest.images : [null, null]) : []

  useEffect(() => () => {
    cancelAnimationFrame(animation.current)
    clearTimeout(modalTimer.current)
  }, [])
  useEffect(() => {
    if (!openId) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenId(null)
      if (event.key === 'ArrowRight') setPhotoIndex((i) => (i + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setPhotoIndex((i) => (i - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modalClose.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      opener.current?.focus()
    }
  }, [openId, gallery.length])

  const focusDestination = (destination, showModal = true) => {
    cancelAnimationFrame(animation.current)
    clearTimeout(modalTimer.current)
    setActiveId(destination.id)
    const start = rotation
    const target = [shortestTurn(start[0], -destination.coordinates[0]), -destination.coordinates[1]]
    const began = performance.now()
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850
    const step = (now) => {
      const progress = duration ? Math.min(1, (now - began) / duration) : 1
      const eased = 1 - Math.pow(1 - progress, 3)
      setRotation(start.map((value, i) => value + (target[i] - value) * eased))
      if (progress < 1) animation.current = requestAnimationFrame(step)
    }
    animation.current = requestAnimationFrame(step)
    if (showModal) {
      opener.current = document.activeElement
      setPhotoIndex(0)
      modalTimer.current = window.setTimeout(() => setOpenId(destination.id), duration ? 720 : 0)
    }
  }

  const onPointerDown = (event) => {
    if (event.button !== 0) return
    cancelAnimationFrame(animation.current)
    drag.current = { x: event.clientX, y: event.clientY, rotation, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (Math.abs(dx) + Math.abs(dy) > 5) drag.current.moved = true
    if (drag.current.moved) setRotation([drag.current.rotation[0] + dx * .42, clamp(drag.current.rotation[1] - dy * .42, -85, 85)])
  }
  const onPointerUp = () => {
    if (drag.current?.moved) {
      ignoreClick.current = true
      window.setTimeout(() => { ignoreClick.current = false }, 100)
    }
    drag.current = null
  }
  const statusLabel = (status) => status === 'home' ? t.home : status === 'visited' ? t.visited : t.wantToVisit

  return (
    <Panel eyebrow="05 — Travel" title={t.travelTitle}>
      <p className="travel-lede">{t.travelIntro}</p>
      <div className="travel-layout">
        <div className="travel-globe-column">
          <div className="globe-frame">
            <div className="globe-orbit" aria-hidden="true" />
            <svg className="travel-globe" viewBox={`0 0 ${SIZE} ${SIZE}`} role="group" aria-label={t.travelGlobeLabel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
              <defs>
                <radialGradient id="travel-ocean" cx="34%" cy="26%" r="77%"><stop stopColor="#456e9a"/><stop offset=".5" stopColor="#173957"/><stop offset="1" stopColor="#07182b"/></radialGradient>
                <radialGradient id="travel-shade" cx="28%" cy="24%" r="78%"><stop offset=".32" stopColor="#fff" stopOpacity=".09"/><stop offset=".68" stopColor="#081527" stopOpacity=".03"/><stop offset="1" stopColor="#020812" stopOpacity=".75"/></radialGradient>
                <clipPath id="travel-sphere-clip"><circle cx="220" cy="220" r="205" /></clipPath>
              </defs>
              <path d={path({ type: 'Sphere' })} fill="url(#travel-ocean)" stroke="#91b9d1" strokeWidth="1.5" />
              <g clipPath="url(#travel-sphere-clip)">
                <path d={path(graticule)} fill="none" stroke="#c4e9ff" strokeOpacity=".15" strokeWidth=".7" />
                {countries.map((country) => {
                  const destination = DESTINATIONS.find((d) => d.country === country.id)
                  return <path key={country.id} d={path(country) || ''} className={`travel-country ${destination ? 'is-destination' : ''} ${activeId === destination?.id ? 'is-selected' : ''}`} onClick={() => { if (!ignoreClick.current && destination) focusDestination(destination) }} role={destination ? 'button' : undefined} tabIndex={destination ? 0 : undefined} aria-label={destination ? t.content.travel[destination.id].name : undefined} onKeyDown={destination ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); focusDestination(destination) } } : undefined} />
                })}
                <circle cx="220" cy="220" r="205" fill="url(#travel-shade)" pointerEvents="none" />
              </g>
              {DESTINATIONS.map((destination) => {
                if (geoDistance(destination.coordinates, [-rotation[0], -rotation[1]]) > Math.PI / 2 - .06) return null
                const point = projection(destination.coordinates)
                if (!point) return null
                return <g key={destination.id} className="travel-map-marker" transform={`translate(${point[0]} ${point[1]})`} onClick={() => { if (!ignoreClick.current) focusDestination(destination) }} role="button" tabIndex="0" aria-label={t.content.travel[destination.id].name} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); focusDestination(destination) } }}><circle r="13" fill="transparent"/><circle r={destination.id === activeId ? 6 : 4} fill={destination.status === 'want' ? '#f5ba8a' : '#dcb8ff'} stroke="#fff" strokeWidth="1.5"/></g>
              })}
            </svg>
          </div>
          <p className="travel-globe-hint">↔ {t.travelDragHint}</p>
          <div className="travel-current"><span className="travel-current-kicker">{t.travelSelected}</span><strong>{t.content.travel[active.id].name}</strong><span>{statusLabel(active.status)}</span></div>
        </div>

        <div className="destination-list">
          {DESTINATIONS.map((destination, index) => {
            const info = t.content.travel[destination.id]
            return <button key={destination.id} className={`travel-destination ${activeId === destination.id ? 'is-active' : ''}`} onClick={() => focusDestination(destination)}>
              <span className="travel-polaroid"><DestinationVisual destination={destination} name={info.name} image={destination.images[0]} /><span className="travel-polaroid-caption">{info.name}</span></span>
              <span className="travel-destination-copy"><span className="travel-destination-number">{String(index + 1).padStart(2, '0')} / 07</span><strong>{info.name}</strong><span className={`travel-status ${destination.status}`}>{statusLabel(destination.status)}</span><span className="travel-destination-arrow" aria-hidden="true">↗</span></span>
            </button>
          })}
        </div>
      </div>

      {createPortal(<AnimatePresence>{openDest && <motion.div className="travel-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenId(null) }}><motion.section className="travel-modal" role="dialog" aria-modal="true" aria-labelledby="travel-modal-title" initial={{ opacity: 0, y: 22, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .97 }}><button ref={modalClose} className="travel-modal-close" onClick={() => setOpenId(null)} aria-label={t.travelClose}>×</button><div className="travel-modal-visual"><DestinationVisual destination={openDest} name={openInfo.name} image={gallery[photoIndex]} large index={photoIndex} /><div className="travel-gallery-controls"><button onClick={() => setPhotoIndex((photoIndex - 1 + gallery.length) % gallery.length)} aria-label={t.travelPrevious}>‹</button><span>{String(photoIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span><button onClick={() => setPhotoIndex((photoIndex + 1) % gallery.length)} aria-label={t.travelNext}>›</button></div></div><div className="travel-modal-copy"><span className={`travel-status ${openDest.status}`}>{statusLabel(openDest.status)}</span><h3 id="travel-modal-title">{openInfo.name}</h3><p>{openInfo.blurb}</p>{!openDest.images.length && <p className="travel-photo-note">{t.travelPhotoNote}</p>}<span className="travel-modal-coordinates">{Math.abs(openDest.coordinates[1]).toFixed(1)}°{openDest.coordinates[1] >= 0 ? 'N' : 'S'} / {Math.abs(openDest.coordinates[0]).toFixed(1)}°{openDest.coordinates[0] >= 0 ? 'E' : 'W'}</span></div></motion.section></motion.div>}</AnimatePresence>, document.body)}
    </Panel>
  )
}
