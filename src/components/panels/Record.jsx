import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Record() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="03 — Record" title={t.recordTitle}>
      <div className="record-list">
        {t.content.record.map((e) => (
          <div className="record-entry" key={e.title}>
            <div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
            </div>
            <span className="record-metric">{e.metric}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
