import tvGrain from '../assets/menu/tv-grain.png'

// Each scene is also its resting artwork. CSS moves only the active main-menu card.
export function Radar() {
  const shape = '210,91 340,186 287,339 133,339 80,186'
  return <g>
    {[1,.7,.4].map(s => <polygon key={s} points={shape} transform={`translate(210 223) scale(${s}) translate(-210 -223)`} opacity=".45" />)}
    <path d="M210 91V223L340 186M287 339L210 223 133 339M210 223 80 186" opacity=".35"/>
    <g className="radar-growth"><polygon points="210,108 318,192 270,312 148,317 109,195" fill="currentColor" fillOpacity=".32" strokeWidth="4"/>
    {[[210,108],[318,192],[270,312],[148,317],[109,195]].map(([x,y])=><circle key={x} cx={x} cy={y} r="5" fill="#deffff"/>)}</g>
    <circle cx="210" cy="223" r="5" fill="#efffff"/>
  </g>
}

const cloud = 'M0 33Q-4 17 13 15Q19 -5 40 3Q53 -6 65 13Q84 12 90 32Q70 38 0 33Z'
export function Jet() {
  return <g strokeLinejoin="round">
    <g className="sky-back"><path d={cloud} transform="translate(200 122) scale(1.3)" fill="#adcfc7" stroke="none" opacity=".44"/><path d={cloud} transform="translate(40 271)" fill="currentColor" opacity=".28"/></g>
    <g className="jet-cruise"><g transform="rotate(-10 210 215)">
      <path d="m183 207-45-73 15 1 85 68" fill="#769d9b" stroke="#bad6d3"/>
      <path d="m89 209-29-62 17 2 52 54" fill="#3c837e" stroke="#c6eee2"/>
      <path d="M66 202q52 3 108-2l104-5q24-2 43 8l21 13q6 7-8 10-33 9-99 9l-102-4q-40-2-67-17l-13-10Z" fill="#ebf4ee" stroke="#a0c6bd" strokeWidth="3"/>
      <path d="M82 215q106 22 251 5-15 15-100 15l-100-4Z" fill="#82aaa7" stroke="none"/>
      <path d="m306 201 11 3 12 8-16-2-11-5Z" fill="#1e3c4a" stroke="none"/>
      {Array.from({length:13},(_,i)=><rect key={i} x={139+i*11} y={207-i*.24} width="5" height="5" rx="2" fill="#2e505d" stroke="none"/>)}
      <path d="m63 215 62-3-35 22-17 1 12-15Z" fill="#a4c4be"/>
      <path d="m197 222 62-3-108 74-25 1 46-55Z" fill="#bed7d1" stroke="#effff8" strokeWidth="3"/>
      <path d="m151 284 92-60-61 46Z" fill="#679696" stroke="none"/>
      <path d="M191 250q9-9 31-7l3 9-26 9q-11 1-8-11Z" fill="#496d73"/><ellipse cx="222" cy="247" rx="5" ry="6" fill="#182e38"/>
    </g></g>
    <g className="sky-front"><path d={cloud} transform="translate(260 265) scale(1.15 .85)" fill="#c5e5d8" stroke="none" opacity=".65"/></g>
  </g>
}

export function Sports() {
  return <g strokeLinejoin="round">
    <path d="M203 125h47v56h-47Z" fill="#323344" stroke="#e9c6dd" strokeWidth="4"/><path d="M212 147h26v22h-26Z" opacity=".65"/>
    <g className="hoop-mesh" stroke="#ead4dd"><path d="m152 174 11 50q19 8 34-1l13-49Z" fill="#301f31" fillOpacity=".6"/>
      <path d="m154 178 38 46m-24-48 33 36m-16-36 18 19m4-18-38 47m23-48-32 36m14-36-17 21"/></g>
    <g transform="translate(82 147)"><g className="hoop-shot"><circle r="19" fill="#e29870" stroke="#442d37" strokeWidth="3"/><path d="M-18-5 18 5M-4-18 4 18M-15 11Q2 0 12-14M-15-11Q-3 8 12 14" stroke="#583a3b" strokeWidth="2.6"/></g></g>
    <path d="M150 173q29 8 60 0" fill="none" stroke="#ffa378" strokeWidth="7" strokeLinecap="round"/>
    <g transform="translate(-24 -28)">
    <path d="m260 248 96-14 22 18-95 18Z" fill="#d199bb" fillOpacity=".14"/>
    <g className="football-mesh"><path d="m260 248 96-14 22 77-101 17Z" fill="#312937" stroke="#b184a3"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`M${265+17*i} ${248-2.4*i}l17 76`} opacity=".52"/>)}
    {[1,2,3,4].map(i=><path key={i} d={`M${260+4*i} ${248+15*i}l97 -14`} opacity=".52"/>)}</g>
    <path d="M261 326v-78l95-14v78" fill="none" stroke="#fff6fc" strokeWidth="6"/>
    <g transform="translate(182 339)"><g className="football-shot"><circle r="18" fill="#fffaf5" stroke="#57465b"/><path d="m0-8 8 5-3 9h-10l-4-9Zm-15 1 4-6 4-2-2 7Zm22-8 7 4 3 7-7-4ZM-13 7l5 5-1 4-6-5Zm19 5 7-5 1 5-6 5Z" fill="#423446" stroke="none"/></g></g>
  </g></g>
}

export function Television() {
  return <g transform="translate(32 221) rotate(-4 55 45)" strokeLinejoin="round">
    <path d="m30 2 20 20L78 0" fill="none" stroke="#d1becd" strokeWidth="3"/>
    <rect x="1" y="19" width="112" height="79" rx="9" fill="#473848" stroke="#d9a8bf" strokeWidth="3"/>
    <rect x="8" y="27" width="80" height="60" rx="9" fill="#17151f" stroke="#876d83" strokeWidth="3"/>
    <svg x="13" y="33" width="70" height="48" viewBox="0 0 70 48" overflow="hidden">
      <image className="crt-grain" href={tvGrain} x="-18" y="-16" width="110" height="84" preserveAspectRatio="none"/>
      <path d="M0 5Q27 0 60 4" fill="none" stroke="white" opacity=".18"/>
    </svg>
    <g stroke="#d6a9bd" fill="#2a202c"><circle cx="100" cy="38" r="6"/><circle cx="100" cy="54" r="6"/></g>
    <path d="m97 40 6-4m-6 20 6-4m-9 18h12m-12 5h12m-12 5h12" stroke="#ceabbc"/>
    <path d="m19 99-3 5h13l3-5m50 0 3 5h13l-4-5" fill="#866d81" stroke="none"/>
  </g>
}

export function Mail() {
  return <g>
    <rect x="136" y="136" width="190" height="83" rx="8" fill="#665148" stroke="#d5b68c" strokeWidth="4"/>
    <rect x="153" y="153" width="156" height="45" rx="5" fill="#201a23" stroke="#ae8c6c"/>
    <svg x="52" y="177" width="295" height="180" viewBox="52 177 295 180" overflow="hidden">
      <g className="mail-delivery"><g transform="rotate(-12 163 258)"><rect x="98" y="217" width="133" height="82" rx="4" fill="#e7daf1" stroke="#9c87ac" strokeWidth="3"/>
      <path d="m100 295 51-43m78 43-50-43M100 220l64 48 65-48" stroke="#85708f" strokeWidth="3"/></g></g>
    </svg>
    <path className="brass-flap" d="M151 151h160l-4 32H155Z" fill="#c2a17a" stroke="#f0d9af" strokeWidth="3"/>
    <path d="M168 158h124" stroke="#fbe6c7" opacity=".7"/>
    <circle cx="144" cy="178" r="2" fill="#ffe6c1"/><circle cx="318" cy="178" r="2" fill="#ffe6c1"/>
  </g>
}
