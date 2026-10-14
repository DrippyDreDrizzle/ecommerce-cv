import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ELEMENTS } from './elements'
import './ElementPicker.css'

export default function ElementPicker({ value, onChange }) {
  const { lang } = useLanguage()
  const reduced = useReducedMotion()
  const japanese = lang === 'ja'
  const active = ELEMENTS.find(item => item.id === value)
  return <aside className="element-picker" style={{ '--element-color': active?.color || '#b6acc5' }} aria-labelledby="element-picker-title">
    <span className="element-picker-kicker">{japanese ? 'あなたの力' : 'A little extra magic'}</span>
    <h2 id="element-picker-title">{japanese ? '属性を選ぶ' : <>Choose your<br />element.</>}</h2>
    <div className="element-seal" aria-hidden="true"><span>{active?.symbol || '無'}</span><i /><i /></div>
    <p className="element-picker-description" aria-live="polite">{active ? (japanese ? active.jaDescription : active.description) : (japanese ? '静かなひととき。' : 'A moment of calm.')}</p>
    <div className="element-options" role="group" aria-label={japanese ? 'カーソルの属性' : 'Cursor element'}>
      {ELEMENTS.map(item => <button type="button" key={item.id} aria-pressed={value === item.id} onClick={() => onChange(item.id)} style={{ '--choice-color': item.color }}><span aria-hidden="true">{item.symbol}</span>{japanese ? item.ja : item.name}</button>)}
      <button type="button" className="element-off" aria-pressed={value === 'off'} onClick={() => onChange('off')}>{japanese ? 'エフェクトをオフ' : 'Effects off'}</button>
    </div>
    <p className="element-picker-note">{reduced ? (japanese ? '動きを減らす設定により、エフェクトは停止中です。' : 'Effects paused by your reduced-motion setting.') : <><span className="element-pointer-note">{japanese ? 'カーソルを動かしてみよう。' : 'Move your cursor. Make it yours.'}</span><span className="element-touch-note">{japanese ? 'タップしてエフェクトを楽しもう。' : 'Tap for a little burst of your element.'}</span></>}</p>
  </aside>
}
