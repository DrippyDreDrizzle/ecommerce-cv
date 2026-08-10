import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Education() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="08 — Education" title={t.educationTitle}>
      <div className="record-list">
        {t.content.education.map((e) => (
          <div className="record-entry" key={e.title}>
            <div>
              <h3>{e.title}</h3>
              <p>{e.org}</p>
            </div>
            <span className="record-metric">{e.year}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
