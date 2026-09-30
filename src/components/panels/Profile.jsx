import Panel from '../Panel'
import MBTIBadge from '../MBTIBadge'
import { useLanguage } from '../../context/LanguageContext'
import ProfileArtwork from './ProfileArtwork'
import './Profile.css'

const copy = {
  en: {
    role: 'Senior eCommerce Manager', location: 'Sevenoaks, UK', experience: '10 years’ experience',
    intro: 'I turn practical ideas into better online experiences.',
    summary: 'From apprentice to taking ownership of a growing ecommerce business.',
    story: 'My story', body: 'I started as an apprentice after sixth form and built my experience by getting hands-on. Over the past 10 years, I’ve worked across Shopify, product data and customer journeys — solving problems, improving the details and helping a business grow.',
    steps: ['Apprentice', 'Store builder', 'eCommerce manager'],
    working: 'How I work', traits: [
      ['Ownership', 'I enjoy the independence to take responsibility, work through problems and see an idea through.'],
      ['One-to-one', 'I work closely with business owners, listening to their ideas and helping turn their dream website into reality.'],
      ['Collaboration', 'I enjoy sharing ideas with people who help each other do better work, with encouragement and constructive feedback.'],
    ],
    beyond: 'Beyond the screen', hobbies: 'Hobbies', hobbiesSub: 'Football · Basketball · Anime', travel: 'Travel', travelSub: 'Places, memories & what’s next', explore: 'Explore',
  },
  ja: {
    role: 'シニアECマネージャー', location: '英国・セブノークス', experience: '10年の経験',
    intro: '実用的なアイデアを、より良いオンライン体験へ。', summary: '見習いから、成長するEC事業を支える立場へ。',
    story: '私のストーリー', body: '高校卒業後に見習いとしてスタートし、実際に手を動かしながら経験を積んできました。この10年間、Shopify、商品データ、購入体験の改善に携わり、課題を解決し、細部を磨きながら事業の成長を支えてきました。',
    steps: ['見習い', 'ストア構築', 'ECマネージャー'], working: '私の働き方', traits: [
      ['主体性', '自ら責任を持ち、課題を解決し、アイデアを最後まで形にすることを大切にしています。'],
      ['一対一の協働', '事業主の想いに耳を傾け、理想のウェブサイトを一緒に実現します。'],
      ['チームワーク', '互いを尊重し、前向きな意見交換を通じて、より良い仕事につなげます。'],
    ], beyond: '仕事の外では', hobbies: '趣味', hobbiesSub: 'サッカー・バスケ・アニメ', travel: '旅', travelSub: '場所、思い出、次の冒険', explore: '見る',
  },
}

export default function Profile({ onNavigate }) {
  const { lang, t } = useLanguage()
  const c = copy[lang] || copy.en
  return <Panel eyebrow={`01 — ${t.tabs.profile}`} title={t.profileTitle}>
    <div className="profile-dossier">
      <header className="profile-hero">
        <span className="profile-watermark" aria-hidden="true">PROFILE</span>
        <div className="profile-identity">
          <p className="profile-kicker">{c.role}</p>
          <h3 className="profile-name">André<span>Marjolin<span className="profile-name-dot">.</span></span></h3>
          <div className="profile-meta"><span>{c.location}</span><span>{c.experience}</span></div>
          <p className="profile-intro">{c.intro}</p>
          <p className="profile-summary">{c.summary}</p>
        </div>
        <div className="profile-insignia"><div className="profile-monogram" aria-hidden="true"><span>AM</span><small>PROFILE / 01</small></div><MBTIBadge /></div>
      </header>
      <section className="profile-story" aria-labelledby="profile-story-title">
        <div><p className="profile-section-index" aria-hidden="true">01 / ORIGIN</p><h3 id="profile-story-title">{c.story}</h3></div>
        <div><p>{c.body}</p><ol className="profile-timeline">{c.steps.map((step, i) => <li key={step}><span aria-hidden="true">0{i + 1}</span>{step}</li>)}</ol></div>
      </section>
      <section className="profile-working" aria-labelledby="profile-working-title">
        <div className="profile-section-heading"><h3 id="profile-working-title">{c.working}</h3><span aria-hidden="true">02 / APPROACH</span></div>
        <div className="profile-traits">{c.traits.map(([title, text], i) => <article key={title}><span className="profile-trait-number" aria-hidden="true">0{i + 1}</span><h4>{title}</h4><p>{text}</p></article>)}</div>
      </section>
      <section aria-labelledby="profile-beyond-title">
        <div className="profile-section-heading"><h3 id="profile-beyond-title">{c.beyond}</h3><span aria-hidden="true">03 / EXPLORE</span></div>
        <div className="profile-destinations">{['hobbies', 'travel'].map(id => <button type="button" className={`profile-destination profile-destination--${id}`} key={id} onClick={event => onNavigate(id, event)}>
          <ProfileArtwork type={id} />
          <span className="profile-destination-content"><span className="profile-destination-title">{c[id]}</span><span className="profile-destination-subtitle">{c[`${id}Sub`]}</span><span className="profile-destination-cta">{c.explore}<span aria-hidden="true">↗</span></span></span>
        </button>)}</div>
      </section>
    </div>
  </Panel>
}
