import Panel from '../Panel'
import './panels.css'

export default function Contact() {
  return (
    <Panel eyebrow="05 — Contact" title="Get In Touch">
      <p className="lede">
        If your store needs more carts closed and fewer carts
        abandoned, let&apos;s talk.
      </p>
      <div className="contact-actions">
        <a className="contact-btn" href="mailto:hello@example.com">
          Email Me
        </a>
        <a className="contact-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a className="contact-link" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </Panel>
  )
}
