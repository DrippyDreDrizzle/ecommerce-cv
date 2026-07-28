import Panel from '../Panel'
import './panels.css'

const skills = [
  {
    label: 'Conversion & Growth',
    items: ['A/B & multivariate testing', 'Funnel diagnostics', 'Checkout optimization', 'Landing page teardown'],
  },
  {
    label: 'Shopify Development',
    items: ['Custom themes (Liquid)', 'App integrations', 'Headless / Hydrogen', 'Performance tuning'],
  },
  {
    label: 'Analytics & Data',
    items: ['GA4 & server-side tracking', 'Dashboarding', 'Attribution modelling', 'Experiment design'],
  },
  {
    label: 'Merchandising',
    items: ['Product page strategy', 'Search & filtering UX', 'Email/lifecycle flows', 'Pricing experiments'],
  },
]

export default function Skills() {
  return (
    <Panel eyebrow="02 — Skills" title="Skill Set">
      <div className="skill-grid">
        {skills.map((s) => (
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
