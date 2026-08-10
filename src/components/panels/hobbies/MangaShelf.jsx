import './MangaShelf.css'

// Add your own cover images here. `locked: true` entries render as a
// game-style "locked character" slot for manga you don't own yet.
const OWNED = [
  { id: 1, title: 'Volume 01', image: '' },
  { id: 2, title: 'Volume 02', image: '' },
  { id: 3, title: 'Volume 03', image: '' },
  { id: 4, title: 'Volume 04', image: '' },
]

const LOCKED = [
  { id: 5, title: '???' },
  { id: 6, title: '???' },
  { id: 7, title: '???' },
]

export default function MangaShelf({ intro }) {
  return (
    <div className="manga-shelf">
      <p className="panel-note">{intro}</p>

      <div className="bookcase">
        {OWNED.map((book) => (
          <div key={book.id} className="manga-book">
            {book.image ? (
              <img src={book.image} alt={book.title} />
            ) : (
              <span className="manga-spine">{book.title}</span>
            )}
          </div>
        ))}

        {LOCKED.map((book) => (
          <div key={book.id} className="manga-book is-locked">
            <span className="lock-icon">🔒</span>
            <span className="manga-spine">{book.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
