import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MangaShelf.css'

// Add your own cover images and write what you love about each one
// in `description`. `locked: true` entries render as a game-style
// "locked character" slot for manga you don't own yet — give them a
// description too if you want to note why it's on your list.
const OWNED = [
  { id: 1, title: 'Volume 01', image: '', description: 'Add a note about what you love about this one.' },
  { id: 2, title: 'Volume 02', image: '', description: 'Add a note about what you love about this one.' },
  { id: 3, title: 'Volume 03', image: '', description: 'Add a note about what you love about this one.' },
  { id: 4, title: 'Volume 04', image: '', description: 'Add a note about what you love about this one.' },
]

const LOCKED = [
  { id: 5, title: '???', locked: true, description: 'Not picked up yet.' },
  { id: 6, title: '???', locked: true, description: 'Not picked up yet.' },
  { id: 7, title: '???', locked: true, description: 'Not picked up yet.' },
]

export default function MangaShelf({ intro }) {
  const [openBook, setOpenBook] = useState(null)

  return (
    <div className="manga-shelf">
      <p className="panel-note">{intro}</p>

      <div className="bookcase">
        {OWNED.map((book) => (
          <button key={book.id} className="manga-book" onClick={() => setOpenBook(book)}>
            {book.image ? (
              <img src={book.image} alt={book.title} />
            ) : (
              <span className="manga-spine">{book.title}</span>
            )}
          </button>
        ))}

        {LOCKED.map((book) => (
          <button
            key={book.id}
            className="manga-book is-locked"
            onClick={() => setOpenBook(book)}
          >
            <span className="lock-icon">🔒</span>
            <span className="manga-spine">{book.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openBook && (
          <motion.div
            className="manga-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenBook(null)}
          >
            <motion.div
              className="manga-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`manga-modal-cover ${openBook.locked ? 'is-locked' : ''}`}>
                {openBook.image ? (
                  <img src={openBook.image} alt={openBook.title} />
                ) : openBook.locked ? (
                  <span className="lock-icon large">🔒</span>
                ) : (
                  <span className="manga-spine">{openBook.title}</span>
                )}
              </div>
              <div className="manga-modal-info">
                <h3>{openBook.title}</h3>
                <p>{openBook.description}</p>
              </div>
              <button className="manga-modal-close" onClick={() => setOpenBook(null)}>
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
