import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'

export default function Equipment() {
  const { t } = useLanguage()
  return (
    <Panel eyebrow="04 — Equipment" title={t.equipmentTitle}>
      <div className="equip-grid">
        {t.content.equipment.map((tool) => (
          <div className="equip-card" key={tool.name}>
            <span className="equip-name">{tool.name}</span>
            <span className="equip-tier">{tool.tier}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
