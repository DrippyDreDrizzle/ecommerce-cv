import Panel from '../Panel'
import Boombox from '../Boombox'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const hobbies = ['Vinyl & DJ gear', 'Streetwear design', 'Weekend photography', 'Amateur cooking']

export default function Hobbies() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="06 — Hobbies" title={t.hobbiesTitle}>
      <div className="equip-grid">
        {hobbies.map((h) => (
          <div className="equip-card" key={h}>
            <span className="equip-name">{h}</span>
          </div>
        ))}
      </div>

      <p className="panel-note" style={{ marginTop: '2rem' }}>
        {t.playRandom}
      </p>
      <Boombox collectionLabel={t.collection} playLabel={t.playRandom} />
    </Panel>
  )
}
