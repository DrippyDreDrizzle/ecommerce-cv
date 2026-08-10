import { useState } from 'react'
import Panel from '../Panel'
import Boombox from '../Boombox'
import AnimeShelf from './hobbies/AnimeShelf'
import MangaShelf from './hobbies/MangaShelf'
import SportsSection from './hobbies/SportsSection'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const CATEGORY_ICONS = { anime: '📼', manga: '📚', sports: '⚽' }

export default function Hobbies() {
  const { t } = useLanguage()
  const [view, setView] = useState('home')
  const h = t.content.hobbies

  if (view !== 'home') {
    return (
      <Panel eyebrow="06 — Hobbies" title={h.categories[view]}>
        <button className="hobby-back" onClick={() => setView('home')}>
          {t.back}
        </button>
        {view === 'anime' && <AnimeShelf intro={h.anime.intro} />}
        {view === 'manga' && <MangaShelf intro={h.manga.intro} />}
        {view === 'sports' && <SportsSection intro={h.sports.intro} items={h.sports.items} />}
      </Panel>
    )
  }

  return (
    <Panel eyebrow="06 — Hobbies" title={t.hobbiesTitle}>
      <div className="equip-grid">
        {h.intro.map((item) => (
          <div className="equip-card" key={item}>
            <span className="equip-name">{item}</span>
          </div>
        ))}
      </div>

      <div className="hobby-category-grid">
        {Object.keys(h.categories).map((key) => (
          <button key={key} className="hobby-category-card" onClick={() => setView(key)}>
            <span className="hobby-category-icon">{CATEGORY_ICONS[key]}</span>
            <span>{h.categories[key]}</span>
          </button>
        ))}
      </div>

      <p className="panel-note" style={{ marginTop: '2rem' }}>
        {t.playRandom}
      </p>
      <Boombox collectionLabel={t.collection} playLabel={t.playRandom} />
    </Panel>
  )
}
