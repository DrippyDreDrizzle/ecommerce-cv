import Panel from '../Panel'
import ContactBackground from '../ContactBackground'
import { useLanguage } from '../../context/LanguageContext'
import './panels.css'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.content.contact
  return (
    <div className="contact-scene">
      <ContactBackground />
      <div className="contact-scene-content">
        <Panel eyebrow="09 — Contact" title={t.contactTitle}>
          <div className="contact-layout">
            <div className="contact-intro">
              <span className="contact-kicker">ANDRÉ MARJOLIN / SEVENOAKS, UK</span>
              <p className="contact-heading">{c.heading}</p>
              <p className="contact-lede">{c.lede}</p>
              <a className="contact-cta" href="mailto:apsm99@icloud.com">{c.emailBtn}<span aria-hidden="true">↗</span></a>
              <a className="contact-email" href="mailto:apsm99@icloud.com">apsm99@icloud.com</a>
            </div>
            <div className="contact-side" aria-label={c.detailsLabel}>
              <span className="contact-side-rule" />
              <span className="contact-side-index">01 / 02</span>
              <span className="contact-side-title">{c.detailsLabel}</span>
              <a href="https://github.com/DrippyDreDrizzle" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href="mailto:apsm99@icloud.com">Email <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </Panel>
      </div>
      <div className="contact-caption" aria-hidden="true"><span>THE NEXT CHAPTER STARTS HERE</span><span>✦ &nbsp; 51°16′ N / 0°11′ E</span></div>
    </div>
  )
}
