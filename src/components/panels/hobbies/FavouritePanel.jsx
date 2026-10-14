import { useState } from 'react'

export default function FavouritePanel({ book, japanese }) {
  const [revealed, setRevealed] = useState(false)
  return <section className="favourite-panel">
    <h4>{japanese ? 'お気に入りの一コマ' : 'My favourite panel'}</h4>
    {book.panel?.image ? revealed ? <figure><img src={book.panel.image} alt={book.panel.alt || `${book.title} — selected artwork`} /><figcaption>{book.panel.caption}</figcaption></figure> : <button type="button" onClick={() => setRevealed(true)}>{japanese ? 'ネタバレ注意・写真を表示' : 'Reveal photo · may contain spoilers'}</button> : <div className="collection-empty"><span aria-hidden="true">▧</span><p>{japanese ? 'コレクションから、お気に入りの一枚を準備中。' : 'A favourite from my copy — photo to follow.'}</p></div>}
  </section>
}
