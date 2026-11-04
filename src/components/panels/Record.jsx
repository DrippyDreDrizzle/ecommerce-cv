import { useState } from 'react'
import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import { plate, catalogue, building } from './recordArt'
import './Record.css'

const sales = [17, 425, 1200, 1100, 1800, 2000, 2400, 3000]
const amount = n => n < 1000 ? '£' + n + 'k' : '£' + n / 1000 + 'm'
const x = i => 4 + 92*i/7
const y = n => 98 - n/3000*90
const point = i => [x(i), y(sales[i])].join(',')

export default function Record() {
  const { lang } = useLanguage()
  const ja = lang === 'ja'
  const [selected, select] = useState(4)
  const forecast = ja ? '予測' : 'forecast'
  const year = 2019 + selected
  const cases = ja ? [
    [plate,'車両検索','購入率 約2倍','車両登録データと商品を紐付け、登録番号から適合商品を探せるようにしました。'],
    [catalogue,'商品登録','約1週間 → 1日','通常200〜300点の商品をまとめて登録。']
  ] : [
    [plate,'Vehicle lookup','≈2× conversion','I mapped registration data to our catalogue so drivers could find products that fit their car. Conversion roughly doubled after launch.'],
    [catalogue,'Catalogue onboarding','1 week → 1 day','I cut the time to list a typical batch of 200–300 products from about a week to a day.']
  ]
  return <Panel className="record-page">
    <div className="rec-hero" style={{'--building': 'url('+building+')'}}>
      <h2 className="panel-title" tabIndex={-1}>{ja ? '自分で築いたストア。' : 'I built the store.'}<br/>{ja ? '自分で伸ばした売上。' : 'I grew the sales.'}</h2>
      <p>{ja ? '最初の通年売上42.5万ポンドから、2025年には240万ポンドへ。' : 'From £425k in my first full year to £2.4m in 2025.'}</p>
    </div>
    <section className="rec-chart">
      <h3>{ja ? 'Shopify 総売上' : 'Shopify total sales'}</h3>
      <div className="rec-grid">
        {[0,1000,2000,3000].map(n=><div key={n} className="rec-rule" style={{top:y(n)+'%'}}><span>{n ? amount(n) : '£0'}</span></div>)}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={sales.slice(0,7).map((_,i)=>point(i)).join(' ')}/><line x1={x(6)} y1={y(sales[6])} x2={x(7)} y2={y(sales[7])} strokeDasharray="7 6"/></svg>
        {sales.map((n,i)=><div key={i} className={'rec-column'+(i===selected?' chosen':'')} style={{left:x(i)+'%'}}>
          <button type="button" style={{top:y(n)+'%'}} onClick={()=>select(i)} aria-pressed={i===selected} aria-label={2019+i+' · '+amount(n)+(i===7?' '+forecast:'')}><i/><b>{amount(n)}{i===7&&<em>{forecast}</em>}</b></button>
          <span>{2019+i}</span>
        </div>)}
      </div>
      <p className="rec-readout" aria-live="polite"><strong>{year} /</strong> {selected===4 ? (ja?'Shopifyでの総売上が180万ポンドに。':'Shopify sales reached £1.8m.') : amount(sales[selected])+' · '+(selected===7 ? forecast : selected===0 ? (ja?'初年度（通年未満）':'Partial launch year') : (ja?'Shopify 年間総売上':'Annual Shopify sales'))}</p>
      <p className="rec-note"><b>{ja?'仕事の進め方':'How I work'}</b><span>{ja?'まずお客様がどこで困っているのかを見つけ、Shopifyのテーマや商品データのどこを変えるべきか考えます。':'I start with what’s difficult for the customer, then work out what needs to change in the Shopify theme or the product data.'}</span></p>
    </section>
    <h3 className="rec-inside">{ja?'制作の裏側':'Inside the build'}</h3>
    <div className="rec-cases">{cases.map(([img,title,metric,body])=><article key={title}><img src={img} alt=""/><div><small>{ja?'事例':'Case file'} /</small><h4>{title}</h4><strong>{metric}</strong><p>{body}</p></div></article>)}</div>
  </Panel>
}
