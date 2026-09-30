import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import './MBTIBadge.css'

const COPY = {
  en: {
    label: 'Working style', open: 'About my ISTP working style', close: 'Close personality explanation', heading: 'My working style',
    intro: 'MBTI is a framework describing preferences for recharging, taking in information, making decisions and approaching everyday life. It doesn’t measure ability or define someone completely.',
    traits: [ ['I', 'Introversion', 'I recharge through quiet time, while enjoying time with friends and supportive teammates.'], ['S', 'Sensing', 'I tend to learn through concrete examples and hands-on experience.'], ['T', 'Thinking', 'I value sound reasoning and effective results, with feedback delivered respectfully.'], ['P', 'Perceiving', 'I enjoy flexibility, experimentation and room to improve things.'] ],
    note: 'My best-fit type from informal self-reflection, rather than an official assessment.',
  },
  ja: {
    label: '働き方', open: 'ISTPと私の働き方について', close: '性格タイプの説明を閉じる', heading: '私の働き方',
    intro: 'MBTIは、エネルギーの回復、情報の受け取り方、意思決定、日々の過ごし方の傾向を表す枠組みです。能力を測定したり、その人のすべてを定義したりするものではありません。',
    traits: [ ['I', '内向', '静かな時間でエネルギーを回復しますが、友人や協力的な仲間と過ごす時間も楽しみます。'], ['S', '感覚', '具体的な例や実際に手を動かす経験から学ぶ傾向があります。'], ['T', '思考', '筋道の通った考え方と効果的な結果を重視し、相手を尊重して意見を伝えます。'], ['P', '知覚', '柔軟性、試行錯誤、改善の余地を大切にしています。'] ],
    note: '正式な検査結果ではなく、自己理解を通じて最も近いと感じたタイプです。',
  },
}

export default function MBTIBadge() {
  const dialog = useRef(null)
  const headingId = useId()
  const { lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  return <>
    <button className="mbti-badge" aria-label={c.open} aria-haspopup="dialog" onClick={() => dialog.current.showModal()}>
      <span className="mbti-badge-label">MBTI / {c.label}</span><span className="mbti-badge-type">ISTP <span aria-hidden="true">ⓘ</span></span>
    </button>
    {createPortal(<dialog ref={dialog} className="mbti-dialog" aria-labelledby={headingId} onClick={event => {
      if (event.target !== event.currentTarget) return
      const r = dialog.current.getBoundingClientRect()
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.current.close()
    }}>
      <button className="mbti-close" autoFocus aria-label={c.close} onClick={() => dialog.current.close()}>×</button>
      <p className="mbti-dialog-kicker">PERSONALITY / ISTP</p><h2 id={headingId}>{c.heading}</h2><p className="mbti-intro">{c.intro}</p>
      <dl className="mbti-traits">{c.traits.map(([letter, title, description]) => <div key={letter}><dt><span>{letter}</span>{title}</dt><dd>{description}</dd></div>)}</dl>
      <p className="mbti-note">{c.note}</p>
    </dialog>, document.body)}
  </>
}
