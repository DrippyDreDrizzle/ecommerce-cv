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
              <div className="contact-links" aria-label={c.detailsLabel}>
                <span className="contact-links-label">{c.detailsLabel}</span>
                <div className="contact-links-grid">
                  <a className="contact-link-card contact-link-github" href="https://github.com/DrippyDreDrizzle" target="_blank" rel="noopener noreferrer">
                    <span className="contact-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.78 2.04 3.25 1.45.1-.73.39-1.23.71-1.52-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.56.23 2.71.11 3 .73.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.75 1.02.75 2.06v3.07c0 .3.21.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg></span>
                    <span className="contact-link-copy"><strong>GitHub</strong><small>DrippyDreDrizzle</small></span>
                    <span className="contact-link-arrow" aria-hidden="true">↗</span>
                  </a>
                  <a className="contact-link-card contact-link-email" href="mailto:apsm99@icloud.com">
                    <span className="contact-link-icon" aria-hidden="true">✉</span>
                    <span className="contact-link-copy"><strong>Email</strong><small>apsm99@icloud.com</small></span>
                    <span className="contact-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div className="contact-caption" aria-hidden="true"><span>THE NEXT CHAPTER STARTS HERE</span><span>✦ &nbsp; 51°16′ N / 0°11′ E</span></div>
    </div>
  )
}
