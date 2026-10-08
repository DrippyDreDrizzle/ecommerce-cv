import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './MangaShelf.css'
import fullmetalAnniversary from '../../../assets/books/fullmetal-20th-anniversary.webp'
import jjkSpecial from '../../../assets/books/jujutsu-kaisen-0-5.webp'

import akatsukiHiden from '../../../assets/books/naruto-akatsuki-hiden.webp'
import itachiDarkNight from '../../../assets/books/naruto-itachi-dark-night.webp'

import itachiBrightLight from '../../../assets/books/naruto-itachi-bright-light.webp'
import uzumakiNarutoPhoto from '../../../assets/books/uzumaki-naruto-artbook.webp'
import narutoIllustrationPhoto from '../../../assets/books/naruto-illustration-artbook.webp'
import uzumakiPhoto from '../../../assets/books/uzumaki-artbook.webp'
import dragonBallHistoryPhoto from '../../../assets/books/dragon-ball-visual-history.webp'

const ARTBOOKS = [
  { id: 'itachi-bright-light', title: 'Naruto: Itachi Shinden — Bright Light', series: 'Naruto · Novel', author: 'Takashi Yano · Masashi Kishimoto', image: itachiBrightLight, color: '#d6cec0', description: 'The Japanese novel イタチ真伝 光明篇 (Itachi Shinden: Bright Light), the companion to Dark Night in my collection.' },
  { id: 'akatsuki-hiden', title: 'Naruto: Akatsuki Hiden', series: 'Naruto · Novel', author: 'Shin Towada · Masashi Kishimoto', image: akatsukiHiden, color: '#df9869', description: 'The Japanese novel 暁秘伝 — 咲き乱れる悪の華, collected alongside my Naruto manga and artbooks.' },
  { id: 'itachi-dark-night', title: 'Naruto: Itachi Shinden — Dark Night', series: 'Naruto · Novel', author: 'Takashi Yano · Masashi Kishimoto', image: itachiDarkNight, color: '#baadb5', description: 'The Japanese novel イタチ真伝 暗夜篇 (Itachi Shinden: Dark Night), from my Naruto collection.' },
  { id: 'jjk-special', title: 'Jujutsu Kaisen 0.5', series: 'Jujutsu Kaisen', author: 'Gege Akutami', image: jjkSpecial, color: '#ce9b9d', description: 'The Tokyo Jujutsu High School 0.5 special booklet from my collection.' },
  { id: 'uzumaki', title: 'Uzumaki', series: 'Naruto', author: 'Masashi Kishimoto', image: uzumakiPhoto, color: '#efb760', description: 'Masashi Kishimoto’s Naruto artwork, collected in the original Uzumaki artbook.', source: 'https://www.viz.com/manga-books/art-book/art-of-naruto-uzumaki/product/1075' },
  { id: 'naruto', title: 'Naruto Illustration Book', series: 'Naruto', author: 'Masashi Kishimoto', image: narutoIllustrationPhoto, color: '#ff9e68', description: 'A collection of Naruto illustrations by Masashi Kishimoto. The orange-cover Japanese edition in my collection.', source: 'https://www.simonandschuster.co.uk/books/Naruto-Illustration-Book/Masashi-Kishimoto/Naruto-Illustration-Book/9781421538693' },
  { id: 'uzumaki-naruto', title: 'Uzumaki Naruto: Illustrations', series: 'Naruto', author: 'Masashi Kishimoto', image: uzumakiNarutoPhoto, color: '#f2ce86', description: 'The white-cover Naruto illustration collection, featuring artwork from the concluding years of the manga.', source: 'https://www.viz.com/manga-books/art-book/uzumaki-naruto-illustrations/product/3780' },
  { id: 'dragon-ball', title: 'Dragon Ball: A Visual History', series: 'Dragon Ball', author: 'Akira Toriyama', image: dragonBallHistoryPhoto, color: '#ff866e', description: 'A collection of Akira Toriyama’s Dragon Ball artwork, including illustrations, sketches and creator commentary.', source: 'https://www.viz.com/manga-books/art-book/dragon-ball-a-visual-history/product/6071' },
  { id: 'mha', title: 'My Hero Academia: Ultra Artworks', series: 'My Hero Academia', author: 'Kohei Horikoshi', image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/28453054/4974801625.jpg', color: '#77d8b2', description: 'Kohei Horikoshi’s illustration collection celebrating ten years of My Hero Academia.', source: 'https://www.simonandschuster.com/books/My-Hero-Academia-Ultra-Artworks/Kohei-Horikoshi/My-Hero-Academia-Ultra-Artworks/9781974768844' },
  { id: 'fullmetal', title: 'Fullmetal Alchemist 20th Anniversary Book', series: 'Fullmetal Alchemist', author: 'Hiromu Arakawa', image: fullmetalAnniversary, color: '#b6afff', description: 'Hiromu Arakawa’s 20th Anniversary Book from my collection.' },
]

function Cover({ book }) {
  const [failed, setFailed] = useState(false)
  return <span className={`artbook-cover${book.landscape ? " artbook-cover--landscape" : ""}`} style={{ '--book-accent': book.color }}>
    {book.image && !failed ? <img src={book.image} alt={`${book.title} cover`} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : <span className="artbook-cover-fallback"><span>ART / ARCHIVE</span><strong>{book.title}</strong><small>{book.author}</small><span className="artbook-cover-note">{book.coverPending ? 'Cover to follow' : 'Cover unavailable'}</span></span>}
  </span>
}

export default function MangaShelf({ intro, title, books = [], lang = 'en' }) {
  const [openBook, setOpenBook] = useState(null)
  const dialog = useRef(null)
  const japanese = lang === 'ja'
  const groups = [
    { id: 'dragon-ball', title: 'Dragon Ball', subtitle: japanese ? 'ボックスコレクション' : 'The boxed collection' },
    { id: 'naruto', title: 'Naruto', subtitle: japanese ? '岸本斉史の世界' : 'The world of Masashi Kishimoto' },
    { id: 'other', title: japanese ? 'ほかの作品' : 'Beyond the Hidden Leaf', subtitle: japanese ? 'お気に入りの漫画' : 'More from my manga collection' },
  ]
  useEffect(() => {
    if (openBook && !dialog.current.open) dialog.current.showModal()
    if (!openBook && dialog.current.open) dialog.current.close()
  }, [openBook])

  return <div className="manga-shelf">
    <p className="panel-note">{intro}</p>
    <section className="manga-collection" aria-labelledby="manga-collection-title">
      <div className="manga-section-heading"><h3 id="manga-collection-title">{title}</h3><span className="artbook-count">{japanese ? '表紙をタップして詳細を見る' : 'Tap a cover to explore'} ↗</span></div>
      {groups.map(group => {
        const items = books.filter(book => book.group === group.id)
        if (!items.length) return null
        return <section key={group.id} className={`manga-series manga-series--${group.id}`} aria-labelledby={`manga-series-${group.id}`}>
          <header className="manga-series-heading"><h4 id={`manga-series-${group.id}`}>{group.title}</h4><p>{group.subtitle}</p></header>
          <ul className="manga-display-shelf">{items.map(book => <li key={book.id}>
            <button type="button" className={`manga-volume${book.landscape ? ' manga-volume--feature' : ''}`} style={{ '--book-accent': book.color }} aria-haspopup="dialog" aria-label={`${japanese ? '詳細を見る' : 'View'}: ${book.title} · ${japanese ? book.jaNote : book.note}`} onClick={() => setOpenBook(book)}>
              <Cover book={book} />
              <span className="manga-volume-copy"><span className="manga-volume-japanese" lang="ja">{book.japanese}</span><strong>{book.title}</strong><span className="manga-volume-note">{japanese ? book.jaNote : book.note}</span><span className="manga-volume-open">{japanese ? '詳しく見る' : 'Take a closer look'} <span aria-hidden="true">↗</span></span></span>
            </button>
          </li>)}</ul>
        </section>
      })}
    </section>
    <section className="artbook-collection" aria-labelledby="artbook-collection-title">
      <div className="manga-section-heading"><span className="manga-section-index">02</span><h3 id="artbook-collection-title">Artbooks, Novels &amp; Specials</h3><span className="artbook-count">{String(ARTBOOKS.length).padStart(2, '0')} owned</span></div>
      <div className="artbook-grid">
        {ARTBOOKS.map((book, index) => <button key={book.id} className="artbook-card" style={{ '--book-accent': book.color }} onClick={() => setOpenBook(book)} aria-haspopup="dialog" aria-label={`View ${book.title}`}>
          <span className="artbook-card-top"><span>{String(index + 1).padStart(2, '0')} / {book.series}</span><span>↗</span></span>
          <Cover book={book} />
          <span className="artbook-card-title">{book.title}</span>
          <span className="artbook-card-author">{book.author}</span>
          <span className="artbook-owned">In my collection</span>
        </button>)}
      </div>
    </section>
    {createPortal(<dialog ref={dialog} className="artbook-dialog" aria-labelledby="artbook-dialog-title" onCancel={() => setOpenBook(null)} onClose={() => setOpenBook(null)} onClick={(event) => { if (event.target === event.currentTarget) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) setOpenBook(null) } }}>
      {openBook && <><button className="artbook-dialog-close" autoFocus aria-label="Close book details" onClick={() => setOpenBook(null)}>×</button><div className="artbook-dialog-layout"><Cover key={openBook.id} book={openBook} /><div className="artbook-dialog-copy"><span className="artbook-owned">In my collection</span><h3 id="artbook-dialog-title">{openBook.title}</h3><p className="artbook-author">{openBook.author}</p><p>{openBook.note ? (japanese ? openBook.jaNote : openBook.note) : openBook.description}</p>{openBook.source && <a href={openBook.source} target="_blank" rel="noreferrer">Book details ↗</a>}</div></div></>}
    </dialog>, document.body)}
  </div>
}
