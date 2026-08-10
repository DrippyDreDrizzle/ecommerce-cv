import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const education = [
  { title: 'BA Marketing & Business', org: 'University College London', year: '2016 – 2019' },
  { title: 'Shopify Partner Certification', org: 'Shopify Academy', year: '2020' },
  { title: 'Growth Marketing Certificate', org: 'CXL Institute', year: '2021' },
]

export default function Education() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="08 — Education" title={t.educationTitle}>
      <div className="record-list">
        {education.map((e) => (
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
