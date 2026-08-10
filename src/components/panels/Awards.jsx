import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Awards() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="07 — Awards" title={t.awardsTitle}>
      <div className="record-list">
        {t.content.awards.map((a) => (
          <div className="record-entry" key={a.title}>
            <div>
              <h3>{a.title}</h3>
              <p>{a.org}</p>
            </div>
            <span className="record-metric">{a.year}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
