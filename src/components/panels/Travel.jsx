import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { geoCentroid, geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
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
  { id: 'canada', country: '124', status: 'visited', coordinates: [-114.07, 51.05], palette: ['#d59891', '#494463'], images: [] },
  { id: 'spain', country: '724', status: 'visited', coordinates: [-3.7, 40.42], palette: ['#dfb186', '#704b52'], images: [] },
  { id: 'hungary', country: '348', status: 'visited', coordinates: [19.04, 47.5], palette: ['#91b8ad', '#394a63'], images: [] },
  { id: 'brazil', country: '076', status: 'want', coordinates: [-47.88, -15.79], palette: ['#92b89a', '#22575d'], images: [] },
  { id: 'new-zealand', country: '554', status: 'want', coordinates: [174.78, -41.29], palette: ['#dfad8b', '#685368'], images: [] },
  { id: 'south-korea', country: '410', status: 'want', coordinates: [126.98, 37.57], palette: ['#aaa3d8', '#414366'], images: [] },
  { id: 'mauritius', country: '480', status: 'want', coordinates: [57.55, -20.28], palette: ['#84cdc9', '#294e69'], images: [] },
  { id: 'south-africa', country: '710', status: 'want', coordinates: [24.0, -29.0], palette: ['#c5a98c', '#555070'], images: [] },
]

const countries = feature(world, world.objects.countries).features
const countryDestinations = countries.map((country) => DESTINATIONS.find((d) => d.country === country.id) || {
  id: `country-${country.id}`,
  country: country.id,
  status: 'explore',
  coordinates: geoCentroid(country),
  palette: ['#829cbb', '#323c62'],
  images: [],
  name: country.properties.name,
})
const destinationByCountry = new Map(countryDestinations.map((d) => [d.country, d]))
const destinationById = new Map([...countryDestinations, ...DESTINATIONS].map((d) => [d.id, d]))
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
  const rotationRef = useRef(rotation)
  rotationRef.current = rotation
  const animation = useRef(null)
  const modalTimer = useRef(null)
  const [zoom, setZoom] = useState(1)
  const pinch = useRef(null)
  const drag = useRef(null)
  const ignoreClick = useRef(false)
  const modalClose = useRef(null)
  const opener = useRef(null)

  const projection = useMemo(() => geoOrthographic().translate([SIZE / 2, SIZE / 2]).scale(205).rotate(rotation).clipAngle(90).precision(.7), [rotation])
  const path = useMemo(() => geoPath(projection), [projection])
  const outlines = useMemo(() => countries.map(country => path(country)), [path])
  const active = destinationById.get(activeId)
  const openDest = destinationById.get(openId)
  const getInfo = (destination) => t.content.travel[destination.id] || { name: destination.name, blurb: t.travelUnlisted }
  const openInfo = openDest && getInfo(openDest)
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
    drag.current = null
    setActiveId(destination.id)
    const start = rotationRef.current
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
    if (drag.current) {
      const first = drag.current
      if (event.pointerType !== 'touch' || first.type !== 'touch' || pinch.current || first.pointerId === event.pointerId) return
      const points = new Map([[first.pointerId, first.point], [event.pointerId, [event.clientX, event.clientY]]])
      pinch.current = { points, zoom, distance: Math.max(1, Math.hypot(first.point[0] - event.clientX, first.point[1] - event.clientY)) }
      first.moved = true
      ignoreClick.current = true
      for (const id of points.keys()) event.currentTarget.setPointerCapture(id)
      event.preventDefault()
      return
    }
    cancelAnimationFrame(animation.current)
    clearTimeout(modalTimer.current)
    ignoreClick.current = false
    drag.current = { type: event.pointerType, point: [event.clientX, event.clientY], pointerId: event.pointerId, x: event.clientX, y: event.clientY, rotation: rotationRef.current, moved: false }
    // Capture only after movement: immediate capture retargets desktop country
    // clicks to the SVG rather than the country/marker that was pressed.
    event.preventDefault()
  }
  const onPointerMove = (event) => {
    const gesture = pinch.current
    if (gesture) {
      if (!gesture.points.has(event.pointerId)) return
      gesture.points.set(event.pointerId, [event.clientX, event.clientY])
      const [a, b] = gesture.points.values()
      setZoom(clamp(gesture.zoom * Math.hypot(a[0] - b[0], a[1] - b[1]) / gesture.distance, 1, 3))
      return
    }
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    drag.current.point = [event.clientX, event.clientY]
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (!drag.current.moved && Math.abs(dx) + Math.abs(dy) > 5) {
      drag.current.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (drag.current.moved) setRotation([drag.current.rotation[0] + dx * .42 / zoom, clamp(drag.current.rotation[1] - dy * .42 / zoom, -85, 85)])
  }
  const finishPinch = (event) => {
    const gesture = pinch.current
    if (!gesture?.points.delete(event.pointerId)) return false
    const [[pointerId, point]] = gesture.points
    pinch.current = null
    drag.current = { type: 'touch', point, pointerId, x: point[0], y: point[1], moved: true, rotation: rotationRef.current }
    ignoreClick.current = true
    return true
  }
  const onLostPointerCapture = (event) => {
    // Touch capture transfers from the touched country or marker to the globe.
    // Ignore the child's bubbled capture loss so the swipe continues.
    if (event.target !== event.currentTarget || finishPinch(event) || drag.current?.pointerId !== event.pointerId) return
    if (drag.current.moved) ignoreClick.current = true
    drag.current = null
  }
  const onPointerUp = (event) => {
    if (finishPinch(event)) return
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    ignoreClick.current = drag.current.moved || event.type === 'pointercancel'
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const statusLabel = (status) => status === 'home' ? t.home : status === 'visited' ? t.visited : status === 'want' ? t.wantToVisit : t.travelExplore

  return (
    <Panel eyebrow="05 — Travel" title={t.travelTitle}>
      <p className="travel-lede">{t.travelIntro}</p>
      <div className="travel-layout">
        <div className="travel-globe-column">
          <div className="globe-frame">
            <div className="globe-orbit" aria-hidden="true" />
            <svg className="travel-globe" viewBox={`${SIZE*(1-1/zoom)/2} ${SIZE*(1-1/zoom)/2} ${SIZE/zoom} ${SIZE/zoom}`} role="group" aria-label={t.travelGlobeLabel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerLeave={() => { if (drag.current && !drag.current.moved) drag.current = null }} onLostPointerCapture={onLostPointerCapture} onClickCapture={(event) => { if (ignoreClick.current) { event.preventDefault(); event.stopPropagation(); ignoreClick.current = false } }}>
              <defs>
                <radialGradient id="travel-ocean" cx="34%" cy="26%" r="77%"><stop stopColor="#456e9a"/><stop offset=".5" stopColor="#173957"/><stop offset="1" stopColor="#07182b"/></radialGradient>
                <radialGradient id="travel-shade" cx="28%" cy="24%" r="78%"><stop offset=".32" stopColor="#fff" stopOpacity=".09"/><stop offset=".68" stopColor="#081527" stopOpacity=".03"/><stop offset="1" stopColor="#020812" stopOpacity=".75"/></radialGradient>
                <clipPath id="travel-sphere-clip"><circle cx="220" cy="220" r="205" /></clipPath>
              </defs>
              <path d={path({ type: 'Sphere' })} fill="url(#travel-ocean)" stroke="#91b9d1" strokeWidth="1.5" />
              <g clipPath="url(#travel-sphere-clip)">
                <path d={path(graticule)} fill="none" stroke="#c4e9ff" strokeOpacity=".15" strokeWidth=".7" />
                {countries.map((country, index) => {
                  const destination = destinationByCountry.get(country.id)
                  const listed = DESTINATIONS.some((d) => d.country === country.id)
                  return <path key={country.id} d={outlines[index] || ''} data-status={destination.status} className={`travel-country ${listed ? 'is-destination' : ''} ${activeId === destination.id ? 'is-selected' : ''}`} onClick={() => focusDestination(destination)} role="button" tabIndex={listed ? 0 : undefined} aria-label={getInfo(destination).name} onKeyDown={listed ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); focusDestination(destination) } } : undefined} />
                })}
                <circle cx="220" cy="220" r="205" fill="url(#travel-shade)" pointerEvents="none" />
              </g>
              {DESTINATIONS.map((destination) => {
                if (geoDistance(destination.coordinates, [-rotation[0], -rotation[1]]) > Math.PI / 2 - .06) return null
                const point = projection(destination.coordinates)
                if (!point) return null
                return <g key={destination.id} className="travel-map-marker" transform={`translate(${point[0]} ${point[1]})`} onClick={() => { if (!ignoreClick.current) focusDestination(destination) }} role="button" tabIndex="0" aria-label={t.content.travel[destination.id].name} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); focusDestination(destination) } }}><circle r={13/zoom} fill="transparent"/><circle r={(destination.id === activeId ? 6 : 4)/zoom} className={'travel-pin '+destination.status} stroke="#fff" strokeWidth="1.5"/></g>
              })}
            </svg>
          </div>
          <div className="travel-key">{['home','visited','want'].map(status => <span key={status}><i className={status}/>{statusLabel(status)}</span>)}</div>
          <div className="travel-zoom">
            <button type="button" aria-label={t.globeZoomOut} disabled={zoom <= 1} onClick={() => setZoom(z => Math.max(1, z - .5))}>−</button>
            <span>{Number(zoom.toFixed(1))}×</span>
            <button type="button" aria-label={t.globeZoomIn} disabled={zoom >= 3} onClick={() => setZoom(z => Math.min(3, z + .5))}>+</button>
          </div>
          <p className="travel-globe-hint">↔ {t.travelDragHint}</p>
          <div className="travel-current"><span className="travel-current-kicker">{t.travelSelected}</span><strong>{getInfo(active).name}</strong><span>{statusLabel(active.status)}</span></div>
        </div>

        <div className="destination-list">
          {DESTINATIONS.map((destination, index) => {
            const info = t.content.travel[destination.id]
            return <button key={destination.id} className={`travel-destination ${activeId === destination.id ? 'is-active' : ''}`} onClick={() => focusDestination(destination)}>
              <span className="travel-polaroid"><DestinationVisual destination={destination} name={info.name} image={destination.images[0]} /><span className="travel-polaroid-caption">{info.name}</span></span>
              <span className="travel-destination-copy"><span className="travel-destination-number">{String(index + 1).padStart(2, '0')} / {String(DESTINATIONS.length).padStart(2, '0')}</span><strong>{info.name}</strong><span className={`travel-status ${destination.status}`}>{statusLabel(destination.status)}</span><span className="travel-destination-arrow" aria-hidden="true">↗</span></span>
            </button>
          })}
        </div>
      </div>

      {createPortal(<AnimatePresence>{openDest && <motion.div className="travel-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenId(null) }}><motion.section className="travel-modal" role="dialog" aria-modal="true" aria-labelledby="travel-modal-title" initial={{ opacity: 0, y: 22, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .97 }}><button ref={modalClose} className="travel-modal-close" onClick={() => setOpenId(null)} aria-label={t.travelClose}>×</button><div className="travel-modal-visual"><DestinationVisual destination={openDest} name={openInfo.name} image={gallery[photoIndex]} large index={photoIndex} /><div className="travel-gallery-controls"><button onClick={() => setPhotoIndex((photoIndex - 1 + gallery.length) % gallery.length)} aria-label={t.travelPrevious}>‹</button><span>{String(photoIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span><button onClick={() => setPhotoIndex((photoIndex + 1) % gallery.length)} aria-label={t.travelNext}>›</button></div></div><div className="travel-modal-copy"><span className={`travel-status ${openDest.status}`}>{statusLabel(openDest.status)}</span><h3 id="travel-modal-title">{openInfo.name}</h3>{openInfo.blurb && <p>{openInfo.blurb}</p>}
        {openDest.status === 'visited' && openInfo.places?.length > 0 && <section className="travel-places">
          <h4>{t.travelPlaces}</h4>
          {openInfo.places.map(([name, area]) => <details key={name}>
            <summary>{name}</summary><p>{area} · {openInfo.name}</p>
          </details>)}
        </section>}{!openDest.images.length && <p className="travel-photo-note">{t.travelPhotoNote}</p>}<span className="travel-modal-coordinates">{Math.abs(openDest.coordinates[1]).toFixed(1)}°{openDest.coordinates[1] >= 0 ? 'N' : 'S'} / {Math.abs(openDest.coordinates[0]).toFixed(1)}°{openDest.coordinates[0] >= 0 ? 'E' : 'W'}</span></div></motion.section></motion.div>}</AnimatePresence>, document.body)}
    </Panel>
  )
}
