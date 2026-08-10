import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

const tools = [
  { name: 'Shopify / Liquid', tier: 'Primary' },
  { name: 'GA4', tier: 'Primary' },
  { name: 'Figma', tier: 'Secondary' },
  { name: 'Klaviyo', tier: 'Secondary' },
  { name: 'VS Code', tier: 'Daily' },
  { name: 'Hotjar', tier: 'Secondary' },
]

export default function Equipment() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="04 — Equipment" title={t.equipmentTitle}>
      <div className="equip-grid">
        {tools.map((tool) => (
          <div className="equip-card" key={tool.name}>
            <span className="equip-name">{tool.name}</span>
            <span className="equip-tier">{tool.tier}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
