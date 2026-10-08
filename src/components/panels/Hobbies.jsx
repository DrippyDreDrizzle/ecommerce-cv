import { useRef, useState } from 'react'
import Panel from '../Panel'
import MangaShelf from './hobbies/MangaShelf'
import { useLanguage } from '../../context/LanguageContext'
import sportsArt from '../../assets/profile/hobbies-anime.webp'
import './Hobbies.css'
import demonSlayer08 from '../../assets/books/demon-slayer-08.webp'
import fullmetal27 from '../../assets/books/fullmetal-27.webp'
import onePunch01 from '../../assets/books/one-punch-man-01.webp'
import jjk0 from '../../assets/books/jujutsu-kaisen-0.webp'

import naruto26 from '../../assets/books/naruto-26.webp'
import naruto37 from '../../assets/books/naruto-37.webp'
import naruto53 from '../../assets/books/naruto-53.webp'
import naruto63 from '../../assets/books/naruto-63.webp'

const ANIME = ['Naruto', 'Fullmetal Alchemist: Brotherhood', 'My Hero Academia', 'Dragon Ball Z', 'Demon Slayer', 'Jujutsu Kaisen']
const SHOWS = ['How I Met Your Mother', 'Parks and Recreation', 'The Inbetweeners', 'South Park', 'American Dad!', 'Bob’s Burgers', 'Brooklyn Nine-Nine', 'It’s Always Sunny in Philadelphia']
const FILMS = ['Shrek', 'Step Brothers', 'Superbad', 'Scary Movie']
const KON = ['Perfect Blue', 'Paprika', 'Millennium Actress']
const BOOKS = [
  ['Dragon Ball Z', 'Full collection · special covers', '全巻コレクション・特別カバー', 'ドラゴンボール', '#f4b669'],
  ['Naruto — 26', 'Volume 26', '第26巻', 'ナルト', '#ee9569', naruto26],
  ['Naruto — 37', 'Volume 37', '第37巻', 'ナルト', '#ee9569', naruto37],
  ['Naruto — 53', 'Volume 53', '第53巻', 'ナルト', '#ee9569', naruto53],
  ['Naruto — 63', 'Volume 63', '第63巻', 'ナルト', '#ee9569', naruto63],
  ['Fullmetal Alchemist', 'Volume 27 · final volume', '第27巻・最終巻', '鋼の錬金術師', '#bdafec', fullmetal27],
  ['Jujutsu Kaisen 0', 'Volume 0 · Yuta’s story', '第0巻・乙骨憂太の物語', '呪術廻戦', '#83c9c1', jjk0],
  ['Demon Slayer', 'Volume 8', '第8巻', '鬼滅の刃', '#ee9569', demonSlayer08],
  ['One-Punch Man', 'Volume 1', '第1巻', 'ワンパンマン', '#f4b669', onePunch01],
]
const COPY = {
  en: {
    title: 'Off the clock.', intro: 'Sport, stories and the art that stays with me.', tabs: ['Sports', 'Anime & Manga', 'TV & Film'],
    sports: 'Two sports. A lot of memories.', sportsIntro: 'I no longer play, but football and basketball have been a big part of my life.',
    football: 'Football', keeper: 'Goalkeeper', footballText: 'Arsenal supporter. Former goalkeeper, county-level competition winner and always drawn to the energy of match day.', footballMore: 'My football story',
    footballDetails: ['I played to a high level as a goalkeeper, winning county-level competitions and attending trials with Chelsea FC and Leyton Orient at 15.', 'I also helped coach Maidstone United’s first-team goalkeepers on match days in the National League and FA Cup.', 'One recent highlight: being in North London for Arsenal’s parade on 31 May 2026. The atmosphere was incredible.'],
    basketball: 'Basketball', positions: 'Shooting guard · Small forward · Power forward', basketballText: 'Miami Heat supporter. I played for many years across three positions, and Dwyane Wade is my favourite player.', basketballMore: 'Following the game', basketballDetail: 'NBA tip-off times can make following games from the UK tricky, but I watch whenever I can. Even though I no longer play, I still love the game.',
    anime: 'Stories that hit different.', animeIntro: 'Beautiful art, unforgettable fights and emotional moments that bring goosebumps—or tears. Naruto is probably my favourite, but there are so many I love.', favourites: 'Personal favourites', watching: 'Currently watching', first: 'New to anime?', recommendation: 'Demon Slayer and Jujutsu Kaisen are my go-to recommendations: exciting action, strong pacing and emotional stories, with less of the fan service that can put newcomers off.',
    shelf: 'Collected for the art.', shelfIntro: 'I collect Japanese editions for the artwork rather than to read. The illustrations, covers and artbooks are what draw me in.', photo: 'More collection photos to follow',
    screen: 'Usually, something funny.', screenIntro: 'Comedy is my favourite—live action, animation and films I can come back to. Satoshi Kon’s work has a place here too.', television: 'On television', films: 'Movie favourites', director: 'The worlds of Satoshi Kon',
  },
  ja: {
    title: 'オフの時間。', intro: 'スポーツ、物語、心に残るアート。', tabs: ['スポーツ', 'アニメ・漫画', 'テレビ・映画'],
    sports: '二つのスポーツ、たくさんの思い出。', sportsIntro: '今はプレーしていませんが、サッカーとバスケットボールは人生の大きな一部です。',
    football: 'サッカー', keeper: 'ゴールキーパー', footballText: 'アーセナルを応援しています。ゴールキーパーとして州レベルの大会で優勝した経験があり、試合の日の熱気が大好きです。', footballMore: 'サッカーの思い出',
    footballDetails: ['ゴールキーパーとして高いレベルでプレーし、州レベルの大会で優勝。15歳でチェルシーFCとレイトン・オリエントのトライアルに参加しました。', 'メイドストーン・ユナイテッドでは、ナショナルリーグとFAカップの試合日にトップチームのGK指導を手伝いました。', '最近の思い出は2026年5月31日、北ロンドンで見たアーセナルのパレード。素晴らしい雰囲気でした。'],
    basketball: 'バスケットボール', positions: 'SG・SF・PF', basketballText: 'マイアミ・ヒートのファンです。長年、三つのポジションでプレーしました。好きな選手はドウェイン・ウェイドです。', basketballMore: '今も観戦を楽しむ', basketballDetail: 'NBAの試合時間は英国から見るには難しいこともありますが、できる限り観戦しています。今はプレーしていなくても、バスケが大好きです。',
    anime: '心に響く物語。', animeIntro: '美しい絵、忘れられない戦い、鳥肌が立つ瞬間や涙する物語。特に好きなのはナルトですが、大好きな作品はたくさんあります。', favourites: 'お気に入り', watching: '視聴中', first: 'アニメを初めて見るなら', recommendation: 'おすすめは鬼滅の刃と呪術廻戦。迫力あるアクション、テンポの良さ、心に響く物語があり、初めての人が戸惑うようなファンサービスも比較的少ない作品です。',
    shelf: 'アートを集める。', shelfIntro: '読むためというより、絵を楽しむために日本語版を集めています。イラスト、表紙、画集に惹かれます。', photo: 'コレクションの写真は順次追加',
    screen: 'やっぱりコメディ。', screenIntro: '実写もアニメも、何度でも見たい映画も。コメディが一番好きです。今敏監督の作品も大切なお気に入りです。', television: 'テレビのお気に入り', films: '映画のお気に入り', director: '今敏の世界',
  },
}

function TitleGallery({ titles, kind }) {
  return <ul className={`hobbies-gallery hobbies-gallery--${kind}`}>{titles.map((title, index) => <li key={title} style={{ '--poster-tone': ['#ee8ba7', '#bd9bed', '#f5ba75', '#83c6cc'][index % 4] }}>
    <span className="hobbies-poster-orbit" aria-hidden="true" />
    <span className="hobbies-poster-mark" aria-hidden="true">{kind === 'anime' ? 'アニメ' : kind === 'kon' ? '今 敏' : '★'}</span>
    <h4>{title}</h4>
  </li>)}</ul>
}

export default function Hobbies() {
  const { lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const selectWithKeys = (event, index) => {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % 3
    if (event.key === 'ArrowLeft') next = (index + 2) % 3
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = 2
    if (next === undefined) return
    event.preventDefault(); setActive(next); tabs.current[next]?.focus()
  }
  return <Panel title={c.title}>
    <div className="hobbies-hub">
      <p className="hobbies-intro">{c.intro}</p>
      <div className="hobbies-tabs" role="tablist" aria-label={lang === 'ja' ? '趣味のカテゴリー' : 'Hobby categories'}>{c.tabs.map((tab, index) => <button key={index} type="button" role="tab" id={`hobby-tab-${index}`} aria-controls={`hobby-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={el => { tabs.current[index] = el }} onClick={() => setActive(index)} onKeyDown={event => selectWithKeys(event, index)}>{tab}</button>)}</div>
      <section className="hobbies-content" role="tabpanel" id={`hobby-panel-${active}`} aria-labelledby={`hobby-tab-${active}`} tabIndex={0} key={active}>
        {active === 0 && <>
          <header className="hobbies-section-intro"><h3>{c.sports}</h3><p>{c.sportsIntro}</p></header>
          <div className="hobbies-sport-grid">
            <article className="hobbies-sport-card hobbies-sport-card--football">
              <div className="hobbies-sport-art"><img src={sportsArt} alt="" /><span>{c.football}</span></div>
              <div className="hobbies-sport-copy"><span className="hobbies-team-label">North London / Arsenal</span><h4>Arsenal<span>FC</span></h4><p className="hobbies-position">{c.keeper}</p><p>{c.footballText}</p><details><summary>{c.footballMore}</summary>{c.footballDetails.map(text => <p key={text}>{text}</p>)}</details></div>
            </article>
            <article className="hobbies-sport-card hobbies-sport-card--basketball">
              <div className="hobbies-sport-art"><img src={sportsArt} alt="" /><span>{c.basketball}</span></div>
              <div className="hobbies-sport-copy"><span className="hobbies-team-label">Miami / Heat</span><h4>Miami<span>Heat</span></h4><p className="hobbies-position">{c.positions}</p><p>{c.basketballText}</p><details><summary>{c.basketballMore}</summary><p>{c.basketballDetail}</p></details></div>
            </article>
          </div>
        </>}
        {active === 1 && <>
          <header className="hobbies-section-intro"><h3>{c.anime}</h3><p>{c.animeIntro}</p></header>
          <aside className="hobbies-watching"><span><i aria-hidden="true" />{c.watching}</span><strong>The Elusive Samurai</strong><strong>Daemons of the Shadow Realm</strong></aside>
          <h3 className="hobbies-subtitle">{c.favourites}</h3><TitleGallery titles={ANIME} kind="anime" />
          <aside className="hobbies-recommendation"><h4>{c.first}</h4><p>{c.recommendation}</p></aside>
          <MangaShelf intro={c.shelfIntro} collection={<><h3 className="hobbies-subtitle">{c.shelf}</h3><p className="hobbies-photo-note">{c.photo}</p><ul className="hobbies-bookshelf">{BOOKS.map(([title, note, jaNote, japanese, color, image]) => <li key={title} style={{ '--book-color': color }}><div className={`hobbies-book-jacket ${image ? 'hobbies-book-jacket--photo' : ''}`}>{image ? <img src={image} alt={`${title} — ${lang === 'ja' ? jaNote : note}`} width="1152" height="1536" loading="lazy" decoding="async" /> : <><span lang="ja">{japanese}</span><strong>{title}</strong></>}</div><h4>{title}</h4><p>{lang === 'ja' ? jaNote : note}</p></li>)}</ul></>} />
        </>}
        {active === 2 && <>
          <header className="hobbies-section-intro"><h3>{c.screen}</h3><p>{c.screenIntro}</p></header>
          <h3 className="hobbies-subtitle">{c.television}</h3><TitleGallery titles={SHOWS} kind="tv" />
          <h3 className="hobbies-subtitle">{c.films}</h3><TitleGallery titles={FILMS} kind="film" />
          <h3 className="hobbies-subtitle">{c.director}</h3><TitleGallery titles={KON} kind="kon" />
        </>}
      </section>
    </div>
  </Panel>
}
