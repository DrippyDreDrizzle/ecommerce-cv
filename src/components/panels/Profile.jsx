import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Profile() {
  const { t } = useLanguage()
  const c = t.content.profile
  return (
    <Panel eyebrow="01 — Profile" title={t.profileTitle}>
      <p className="lede">{c.lede}</p>

      <div className="stat-row">
        {c.stats.map((s) => (
          <div className="stat-box" key={s.label}>
            <span className="stat-number">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="panel-note">{c.note}</p>
    </Panel>
  )
}
