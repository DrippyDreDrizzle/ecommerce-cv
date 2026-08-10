import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const awards = [
  { title: 'Ecommerce Growth Award', org: 'Regional Retail Awards', year: '2024' },
  { title: 'Best Shopify Build', org: 'Platform Dev Awards', year: '2023' },
  { title: 'Top CRO Case Study', org: 'Industry Conference', year: '2022' },
]

export default function Awards() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="07 — Awards" title={t.awardsTitle}>
      <div className="record-list">
        {awards.map((a) => (
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
