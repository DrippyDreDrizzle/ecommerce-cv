import { Jet, Radar, Sports, Mail, Television } from './MenuScenes'
import { menuTheme } from './menuTheme'

export function Reflection({ motif }) {
  if (motif === 'mountain') return <Jet />
  if (motif === 'radar') return <Radar />
  if (motif === 'chart') return <><path d="M74 105 V353 H361" opacity=".5" /><path d="M104 313 V251 H143 V313 M177 313 V201 H216 V313 M250 313 V136 H289 V313" fill="currentColor" fillOpacity=".28" /><path d="M83 260 L166 222 L223 236 L330 106 M289 111 L330 106 L325 149" strokeWidth="7" /></>
  if (motif === 'tools') return <><rect x="67" y="110" width="291" height="201" rx="10" fill="currentColor" fillOpacity=".13" /><path d="M70 149 H355 M102 130 H106 M119 130 H123 M136 130 H140 M150 192 L117 224 L150 256 M274 192 L307 224 L274 256 M232 182 L193 269 M165 349 H269 M216 312 V347" strokeWidth="6" /></>
  if (motif === 'book') return <><path d="M210 151 Q145 113 65 138 V316 Q147 294 210 331 Q277 294 357 316 V138 Q281 113 210 151Z" fill="currentColor" fillOpacity=".2" /><path d="M210 151 V331 M93 173 Q142 161 178 182 M93 212 Q142 200 178 221 M93 251 Q142 239 178 260 M242 182 Q288 161 328 173 M242 221 Q288 200 328 212" strokeWidth="4" /></>
  if (motif === 'star') return <><circle cx="210" cy="208" r="115" opacity=".35" /><path d="M210 94 L241 172 L325 179 L260 233 L280 317 L210 272 L140 317 L160 233 L95 179 L179 172Z" fill="currentColor" fillOpacity=".32" strokeWidth="4" /><path d="M157 306 L128 397 L210 356 L292 397 L264 306" /></>
  if (motif === 'letter') return <Mail />
  if (motif === 'manga') return <Sports />
  return <>
    <path d="M210 72 L346 150 V307 L210 385 L74 307 V150Z" fill="currentColor" fillOpacity=".1" strokeWidth="3" />
    <path d="M210 94 L326 161 M326 287 L210 357 M94 285 V172" opacity=".5" strokeWidth="6" />
    <path d="M112 281 L153 167 L194 281 M129 237 H178 M215 281 V168 L259 232 L303 168 V281" stroke="currentColor" strokeWidth="13" strokeLinecap="square" />
    <path d="M147 313 H272 M171 329 H248" opacity=".6" strokeWidth="3" />
    <circle cx="210" cy="72" r="6" fill="#f7f2ff" /><circle cx="74" cy="307" r="5" fill="currentColor" /><circle cx="346" cy="150" r="5" fill="currentColor" />
  </>
}

function HoverScene({ id }) {
  if (id === 'profile') return <g className="menu-hover-scene">
    <Reflection motif="identity" />
    <path className="menu-monogram-trace" d="M210 72 346 150V307L210 385 74 307V150Z" pathLength="100" stroke="#eadbff" strokeWidth="6" strokeLinecap="round" strokeDasharray="18 82" />
  </g>
  if (id === 'record') return <g className="menu-hover-scene menu-growth-scene">
    <path d="M74 105V353H361" opacity=".5" />
    {[{x:104,y:251},{x:177,y:201},{x:250,y:136}].map((bar,i) => <rect key={bar.x} className={`menu-growing-bar menu-growing-bar-${i}`} x={bar.x} y={bar.y} width="39" height={313-bar.y} fill="currentColor" fillOpacity=".35" />)}
    <g className="menu-rising-arrow"><path d="M83 260 166 222 223 236 330 106M289 111 330 106 325 149" strokeWidth="7" /><circle cx="330" cy="106" r="12" fill="currentColor" opacity=".3" /></g>
  </g>
  if (id === 'education') return <g className="menu-hover-scene menu-book-scene">
    <path d="M210 151Q145 113 65 138V316Q147 294 210 331Q277 294 357 316V138Q281 113 210 151Z" fill="currentColor" fillOpacity=".2" />
    <path d="M210 151V331M93 173Q142 161 178 182M93 212Q142 200 178 221M242 182Q288 161 328 173M242 221Q288 200 328 212" strokeWidth="4" />
    {[0,1,2].map(i => <g key={i} className={`menu-turning-page menu-turning-page-${i}`}><path d="M210 151Q281 113 350 132V307Q276 291 210 331Z" fill="#292638" stroke="currentColor" strokeWidth="3" /><path d="M239 183Q286 162 322 174M239 220Q286 199 322 211M239 257Q286 236 322 248" strokeWidth="3" opacity=".75" /></g>)}
  </g>
  return null
}

export default function MenuArtwork({ tab }) {
  return <span className={`menu-card-art ${['profile', 'record', 'education'].includes(tab.id) ? 'menu-card-art--animated' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 420 460" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <g className="menu-static-scene"><Reflection motif={menuTheme(tab.id).motif} /></g>
        {tab.id === 'hobbies' && <Television />}
        <HoverScene id={tab.id} />
      </g>
    </svg>
  </span>
}
