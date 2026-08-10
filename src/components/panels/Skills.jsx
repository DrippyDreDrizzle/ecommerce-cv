import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Skills() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="02 — Skills" title={t.skillsTitle}>
      <div className="skill-grid">
        {t.content.skills.map((s) => (
          <div className="skill-card" key={s.label}>
            <h3>{s.label}</h3>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  )
}
