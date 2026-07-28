import Panel from '../Panel'
import './panels.css'

export default function Profile() {
  return (
    <Panel eyebrow="01 — Profile" title="Jordan Rivers">
      <p className="lede">
        I turn browsers into buyers. Ecommerce growth strategist and
        Shopify developer — checkout flows, conversion testing, and
        the platform work that makes both of those actually ship.
      </p>

      <div className="stat-row">
        <div className="stat-box">
          <span className="stat-number">6</span>
          <span className="stat-label">Years in ecommerce</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">30+</span>
          <span className="stat-label">Stores shipped</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">A/B</span>
          <span className="stat-label">Tested, not guessed</span>
        </div>
      </div>

      <p className="panel-note">
        Use the menu on the left — Skills, Record, Equipment, Contact —
        to see how this actually plays out.
      </p>
    </Panel>
  )
}
