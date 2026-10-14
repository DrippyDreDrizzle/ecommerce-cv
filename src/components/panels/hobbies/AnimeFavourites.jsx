import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ANIME_DETAILS } from './animeDetails'
import './AnimeFavourites.css'

function Artwork({ character, decorative = false }) {
  const [failed, setFailed] = useState(false)
  return failed ? <span className="anime-art-fallback">{character.name}</span> : <img src={character.image} alt={decorative ? '' : character.name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
}

function Moments({ show, japanese }) {
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState(0)
  const clips = show.moments.filter(clip => /^[A-Za-z0-9_-]{11}$/.test(clip.youtubeId))
  const clip = clips[selected]
  return <section className="anime-moments">
    <h4>{japanese ? 'お気に入りの戦いと名場面' : 'Favourite fights & moments'}</h4>
    {!clip ? <div className="collection-empty"><span aria-hidden="true">▷</span><p>{japanese ? 'お気に入りの動画を選んでいます。' : 'My picks are on the way.'}</p></div> : !revealed ? <button className="anime-reveal" onClick={() => setRevealed(true)}>{japanese ? 'ネタバレ注意・動画を表示' : 'Show moments · contains spoilers'}</button> : <>
      <div className="anime-video"><iframe key={clip.youtubeId} title={clip.title} src={`https://www.youtube-nocookie.com/embed/${clip.youtubeId}`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
      <a href={`https://www.youtube.com/watch?v=${clip.youtubeId}`} target="_blank" rel="noreferrer">{clip.title} · {japanese ? 'YouTubeで見る' : 'Watch on YouTube'} ↗</a>
      <div className="anime-clip-list">{clips.map((item, index) => <button key={item.youtubeId} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.title}</button>)}</div>
    </>}
  </section>
}

export default function AnimeFavourites({ lang }) {
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const opener = useRef(null)
  const japanese = lang === 'ja'
  useEffect(() => {
    const node = dialog.current
    if (selected && !node.open) node.showModal()
    if (!selected && node.open) { node.close(); opener.current?.focus() }
  }, [selected])
  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])
  function close() { setSelected(null) }
  return <>
    <ul className="anime-favourites-grid">{ANIME_DETAILS.map((show, index) => <li key={show.id} style={{ '--anime-tone': show.tone }}>
      <button className="anime-favourite-card" aria-haspopup="dialog" onClick={event => { opener.current = event.currentTarget; setSelected(show) }}>
        <span className="anime-card-index">{String(index + 1).padStart(2, '0')} / アニメ</span>
        <div className="anime-card-art"><Artwork character={show.characters[0]} decorative /></div>
        <span className="anime-card-copy"><span>{show.subtitle}</span><strong>{show.title}</strong><span className="anime-card-open">{japanese ? '作品を見る' : 'Explore the story'} ↗</span></span>
      </button>
    </li>)}</ul>
    {createPortal(<dialog ref={dialog} className="anime-dialog" aria-labelledby="anime-dialog-title" onCancel={close} onClose={close} onClick={event => {
      if (event.target !== event.currentTarget) return
      const r = event.currentTarget.getBoundingClientRect()
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close()
    }}>
      {selected && <div style={{ '--anime-tone': selected.tone }}>
        <button className="anime-dialog-close" autoFocus aria-label={japanese ? '閉じる' : 'Close anime details'} onClick={close}>×</button>
        <header><span className="anime-eyebrow">{japanese ? 'お気に入り' : 'Personal favourites'}</span><h3 id="anime-dialog-title">{selected.title}</h3><p>{japanese ? selected.jaDescription : selected.description}</p></header>
        <div className="anime-dialog-columns"><section><h4>{japanese ? '登場人物' : 'Meet the characters'}</h4><div className="anime-character-grid">{selected.characters.map(character => <figure key={character.name}><Artwork character={character} /><figcaption>{character.name}</figcaption></figure>)}</div><a className="anime-source" href={selected.source} target="_blank" rel="noreferrer">{japanese ? '公式アート・作品情報' : 'Official artwork & series details'} ↗</a></section>
          <Moments key={selected.id} show={selected} japanese={japanese} /></div>
      </div>}
    </dialog>, document.body)}
  </>
}
