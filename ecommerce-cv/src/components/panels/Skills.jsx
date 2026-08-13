import Panel from '../Panel'
import SkillRadar from '../SkillRadar'
import MBTIBadge from '../MBTIBadge'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

// Values are language-independent — only the labels come from
// translations.js. Adjust these numbers (0-100) to taste.
const STAT_VALUES = {
  social: 70,
  creativity: 85,
  drive: 90,
  adaptability: 75,
  intelligence: 80,
}

export default function Skills() {
  const { t } = useLanguage()
  const stats = t.content.skillStats.map((s) => ({ label: s.label, value: STAT_VALUES[s.key] }))

  return (
    <Panel eyebrow="02 — Skills" title={t.skillsTitle}>
      <div className="skill-stat-row">
        <SkillRadar stats={stats} />

        <div className="special-skills-col">
          <div className="special-skills-header">
            <span className="special-skills-title">{t.content.specialSkillsHeader}</span>
            <MBTIBadge type="INTJ" />
          </div>

          {t.content.specialSkills.map((s) => (
            <div key={s.name} className={`special-skill-card ${s.ultimate ? 'is-ultimate' : ''}`}>
              <div className="special-skill-name-row">
                <span className="special-skill-name">{s.name}</span>
                <span className="special-skill-tag">{s.tag}</span>
              </div>
              <p className="special-skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

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
