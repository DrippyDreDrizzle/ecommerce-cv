import Panel from '../Panel'
import ContactCard from '../ContactCard'
import ContactBackground from '../ContactBackground'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.content.contact
  return (
    <Panel eyebrow="09 — Contact" title={t.contactTitle}>
      <p className="lede">{c.lede}</p>

      {/* Fixed, full-screen decorative backdrop — sits behind everything */}
      <ContactBackground />

      {/* Normal stacking order, above the background, fully clickable */}
      <div className="contact-card-wrap">
        <ContactCard>
          <div className="contact-actions" style={{ marginTop: 0, flexDirection: 'column', alignItems: 'center' }}>
            <a className="contact-btn" href="mailto:hello@example.com">
              {c.emailBtn}
            </a>
            <a className="contact-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="contact-link" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </ContactCard>
      </div>

      <p className="panel-note" style={{ textAlign: 'center' }}>{t.flipCard}</p>
    </Panel>
  )
}
