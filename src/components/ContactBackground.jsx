import './ContactBackground.css'

const stars = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 73.37 + 11) % 100,
  y: (i * 37.19 + 7) % 58,
  size: i % 11 === 0 ? 2 : 1,
  delay: `${(i % 13) * -.37}s`,
}))

const meteors = [
  { x: '12%', y: '17%', color: '#a68cff', delay: '1s', duration: '9s' },
  { x: '58%', y: '9%', color: '#7edcff', delay: '4s', duration: '11s' },
  { x: '78%', y: '27%', color: '#f6aa9c', delay: '2s', duration: '13s' },
  { x: '35%', y: '6%', color: '#bce8c5', delay: '7s', duration: '12s' },
]

export default function ContactBackground() {
  return (
    <div className="contact-bg" aria-hidden="true">
      <div className="contact-bg-sky" />
      <div className="contact-bg-glow" />
      <div className="contact-bg-stars">
        {stars.map((star, i) => <span key={i} className="contact-bg-star" style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: star.delay }} />)}
        {meteors.map((meteor, i) => <span key={i} className="contact-bg-meteor" style={{ left: meteor.x, top: meteor.y, '--meteor-color': meteor.color, animationDelay: meteor.delay, animationDuration: meteor.duration }} />)}
      </div>
      <div className="contact-bg-horizon" />
      <svg className="contact-bg-landscape" viewBox="0 0 1440 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="contact-far" x2="0" y2="1"><stop stopColor="#535277"/><stop offset="1" stopColor="#25253f"/></linearGradient>
          <linearGradient id="contact-near" x2="0" y2="1"><stop stopColor="#273248"/><stop offset="1" stopColor="#101827"/></linearGradient>
          <linearGradient id="contact-water" x2="0" y2="1"><stop stopColor="#36445b"/><stop offset=".38" stopColor="#192b3e"/><stop offset="1" stopColor="#0a1422"/></linearGradient>
          <linearGradient id="contact-snow" x2="0" y2="1"><stop stopColor="#d0d4de"/><stop offset="1" stopColor="#8896ae"/></linearGradient>
        </defs>
        <path d="M0 375 95 309 150 332 280 142 380 297 456 261 555 164 694 339 766 297 876 199 1037 351 1108 316 1230 139 1370 323 1440 275V700H0Z" fill="url(#contact-far)"/>
        <path d="m221 207 59-65 57 107-56-38-24 34Zm300 8 34-51 73 114-72-50-26 29Zm668-28 41-48 66 110-68-46-31 31Z" fill="url(#contact-snow)" opacity=".86"/>
        <path d="M0 440 98 376 199 416 317 327 425 426 540 341 677 438 787 352 929 428 1094 320 1220 420 1348 341 1440 401V700H0Z" fill="url(#contact-near)"/>
        <g transform="translate(0 175) scale(1 .75)">
          <path d="M0 470Q350 452 720 472T1440 465V700H0Z" fill="url(#contact-water)"/>
          <path d="M0 470Q350 452 720 472T1440 465" fill="none" stroke="#a9acbd" strokeWidth="2" opacity=".45"/>
          <g stroke="#aec0ce" strokeLinecap="round" opacity=".23"><path d="M530 502h389M626 516h255M410 542h309M768 550h414M250 578h385M903 599h282M549 628h334M144 650h334" strokeWidth="2"/><path d="M628 488h176M684 528h156M529 563h154M794 584h142M413 611h215"/></g>
          {meteors.map((meteor, i) => (
            <g key={i} className="contact-bg-reflection" style={{ '--meteor-color': meteor.color, animationDelay: meteor.delay, animationDuration: meteor.duration }} transform={`translate(${[200, 780, 1130, 510][i]} ${[525, 547, 510, 572][i]})`}>
              <path d="M-45 0 H45" stroke="var(--meteor-color)" strokeWidth="1.4" opacity=".4" />
              <path d="M-25 7 H27 M-13 13 H15" stroke="var(--meteor-color)" strokeWidth="1" opacity=".25" />
            </g>
          ))}
          <path d="M0 508 64 482 91 501 146 478 194 507 220 490 265 519 298 505 351 538 403 530 445 570 344 565 276 548 201 551 136 529 76 540 0 523Zm1440 5-66-32-46 25-51-26-46 28-30-16-59 36-52-9-46 36-59-15-62 29 110-5 75-17 70 16 72-29 72 13 68-18 50 6Z" fill="#07121c"/>
        </g>
      </svg>
      <div className="contact-bg-vignette" />
    </div>
  )
}
