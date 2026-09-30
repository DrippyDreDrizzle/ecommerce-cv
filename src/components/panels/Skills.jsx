import Panel from '../Panel'
import MBTIBadge from '../MBTIBadge'
import { useLanguage } from '../../context/LanguageContext'
import { skillsContent } from './skillsContent'
import './Skills.css'

export default function Skills() {
  const { lang, t } = useLanguage()
  const c = skillsContent[lang] || skillsContent.en
  return <Panel eyebrow={`02 — ${t.tabs.skills}`} title={t.skillsTitle}>
    <div className="skills-dossier">
      <header className="skills-identity">
        <div><p className="skills-kicker">{c.role}</p><h3>{c.heading}</h3><p>{c.intro}</p><span className="skills-tenure">{c.experience}</span></div>
        <MBTIBadge />
      </header>
      <section className="skills-section" aria-labelledby="skills-core-heading">
        <h3 className="skills-section-heading" id="skills-core-heading">{c.core}</h3>
        <div className="skills-core-grid">{c.strengths.map((skill, index) => <article className="skills-ability" key={skill.title}>
          <div className="skills-ability-top"><span className="skills-ability-number">0{index + 1}</span><span>{skill.tag}</span></div>
          <h4>{skill.title}</h4><p>{skill.desc}</p><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul>
        </article>)}</div>
      </section>
      <section className="skills-section" aria-labelledby="skills-evidence-heading">
        <h3 className="skills-section-heading" id="skills-evidence-heading">{c.evidence}</h3>
        <div className="skills-evidence-grid">{c.projects.map(project => <article className="skills-evidence" key={project.title}><strong>{project.metric}</strong><h4>{project.title}</h4><p>{project.desc}</p></article>)}</div>
      </section>
      <section className="skills-section skills-tools" aria-labelledby="skills-tools-heading">
        <h3 className="skills-section-heading" id="skills-tools-heading">{c.tools}</h3>
        <p className="skills-tool-label">{c.primary}</p><ul className="skills-tool-chips"><li>Google Merchant Center</li><li>Google Search Console</li></ul>
        <p className="skills-tool-label">{c.supporting}</p><ul className="skills-tool-chips is-secondary"><li>Shopify</li><li>Excel</li><li>HTML / CSS / JavaScript</li></ul>
      </section>
      <div className="skills-working-grid"><section className="skills-working"><h3>{c.approach}</h3><p>{c.build}</p></section><section className="skills-working"><h3>{c.working}</h3><p>{c.teamwork}</p></section></div>
    </div>
  </Panel>
}
