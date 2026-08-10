import { useState } from 'react'
import './AnimeShelf.css'

// Add your own favorites here — `image` is a URL to your own cover
// art/screenshot. Leave it blank and a placeholder shows instead.
const TAPES = [
  { id: 1, title: 'Tape 01', image: '' },
  { id: 2, title: 'Tape 02', image: '' },
  { id: 3, title: 'Tape 03', image: '' },
  { id: 4, title: 'Tape 04', image: '' },
  { id: 5, title: 'Tape 05', image: '' },
  { id: 6, title: 'Tape 06', image: '' },
]

export default function AnimeShelf({ intro }) {
  const [loaded, setLoaded] = useState(null)

  return (
    <div className="anime-shelf">
      <p className="panel-note">{intro}</p>

      <div className="tv-unit">
        <div className="tv-screen">
          {loaded?.image ? (
            <img src={loaded.image} alt={loaded.title} />
          ) : (
            <span className="tv-static">{loaded ? loaded.title : 'NO SIGNAL'}</span>
          )}
        </div>
        <div className="tv-vcr">
          <div className="vcr-slot" />
          <div className="vcr-lights">
            <span className={loaded ? 'is-on' : ''} />
            <span />
          </div>
        </div>
      </div>

      <div className="tape-rack">
        {TAPES.map((tape) => (
          <button
            key={tape.id}
            className={`tape ${loaded?.id === tape.id ? 'is-active' : ''}`}
            onClick={() => setLoaded(tape)}
          >
            {tape.image ? (
              <img src={tape.image} alt={tape.title} />
            ) : (
              <span className="tape-label">{tape.title}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
