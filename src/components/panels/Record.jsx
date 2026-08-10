import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const entries = [
  {
    title: 'Cart Abandonment Fix',
    desc: 'Redesigned checkout flow, 4 steps down to 1 page. Client: DTC home goods brand.',
    metric: '22% ↓',
  },
  {
    title: 'PDP Conversion Lift',
    desc: 'A/B tested social proof + sticky add-to-cart. Client: Skincare subscription box.',
    metric: '38% ↑',
  },
  {
    title: 'Shopify Replatform',
    desc: 'Migrated legacy store to a custom Liquid theme. Client: Multi-brand fashion retailer.',
    metric: '2.1s',
  },
]

export default function Record() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="03 — Record" title={t.recordTitle}>
      <div className="record-list">
        {entries.map((e) => (
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
