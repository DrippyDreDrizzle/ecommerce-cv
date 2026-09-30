import { menuTheme } from './menuTheme'

function Reflection({ motif }) {
  if (motif === 'mountain') return <><circle cx="299" cy="111" r="40" fill="currentColor" opacity=".5" /><path d="M-30 330 L125 108 L211 236 L270 156 L445 354Z" fill="currentColor" opacity=".28" /><path d="M55 306 L125 108 L159 213 L132 190 L113 225Z" fill="#faf5ff" /><path d="M0 353 Q180 327 430 357 M10 375 Q240 344 400 380 M75 402 H335" /></>
  if (motif === 'radar') return <><path d="M210 79 L347 178 L295 338 H125 L73 178Z M210 133 L295 194 L263 289 H157 L125 194Z M210 79 V222 M347 178 L210 222 L295 338 M125 338 L210 222 L73 178" opacity=".6" /><path d="M210 109 L328 185 L262 293 L142 314 L109 189Z" fill="currentColor" fillOpacity=".35" strokeWidth="4" /><circle cx="210" cy="222" r="8" fill="#fff" /></>
  if (motif === 'chart') return <><path d="M74 105 V353 H361" opacity=".5" /><path d="M104 313 V251 H143 V313 M177 313 V201 H216 V313 M250 313 V136 H289 V313" fill="currentColor" fillOpacity=".28" /><path d="M83 260 L166 222 L223 236 L330 106 M289 111 L330 106 L325 149" strokeWidth="7" /></>
  if (motif === 'tools') return <><rect x="67" y="110" width="291" height="201" rx="10" fill="currentColor" fillOpacity=".13" /><path d="M70 149 H355 M102 130 H106 M119 130 H123 M136 130 H140 M150 192 L117 224 L150 256 M274 192 L307 224 L274 256 M232 182 L193 269 M165 349 H269 M216 312 V347" strokeWidth="6" /></>
  if (motif === 'book') return <><path d="M210 151 Q145 113 65 138 V316 Q147 294 210 331 Q277 294 357 316 V138 Q281 113 210 151Z" fill="currentColor" fillOpacity=".2" /><path d="M210 151 V331 M93 173 Q142 161 178 182 M93 212 Q142 200 178 221 M93 251 Q142 239 178 260 M242 182 Q288 161 328 173 M242 221 Q288 200 328 212" strokeWidth="4" /></>
  if (motif === 'star') return <><circle cx="210" cy="208" r="115" opacity=".35" /><path d="M210 94 L241 172 L325 179 L260 233 L280 317 L210 272 L140 317 L160 233 L95 179 L179 172Z" fill="currentColor" fillOpacity=".32" strokeWidth="4" /><path d="M157 306 L128 397 L210 356 L292 397 L264 306" /></>
  if (motif === 'letter') return <><circle cx="213" cy="223" r="137" opacity=".22" /><path d="M64 142 H358 V316 H64Z" fill="currentColor" fillOpacity=".18" strokeWidth="4" /><path d="M64 142 L211 250 L358 142 M64 316 L165 227 M358 316 L258 227" strokeWidth="4" /><path d="M96 356 H329 M141 378 H287" opacity=".5" /></>
  if (motif === 'manga') return <>
    <path d="M85 108 L298 81 L326 284 L113 312Z" fill="currentColor" fillOpacity=".15" strokeWidth="4" />
    <path d="M105 129 L188 119 L199 204 L116 215Z M208 116 L282 106 L293 191 L219 201Z M119 231 L297 207 L304 264 L127 288Z" fill="currentColor" fillOpacity=".18" strokeWidth="2" />
    <path d="M133 155 L177 182 M135 185 L169 142 M236 135 L251 163 L270 126 M145 251 L278 234" strokeWidth="4" />
    <path d="M142 287 Q125 279 114 302 L91 358 Q84 388 110 387 L153 356 H269 L310 386 Q336 393 328 360 L306 302 Q298 280 278 287Z" fill="#151321" strokeWidth="5" />
    <path d="M137 310 V344 M120 327 H154" strokeWidth="7" />
    <circle cx="278" cy="316" r="6" fill="currentColor" /><circle cx="297" cy="335" r="6" fill="currentColor" />
    <path d="M190 329 H205 M219 329 H234 M60 219 L81 207 M331 146 L354 131 M331 175 H359" strokeWidth="3" />
  </>
  return <>
    <path d="M210 72 L346 150 V307 L210 385 L74 307 V150Z" fill="currentColor" fillOpacity=".1" strokeWidth="3" />
    <path d="M210 94 L326 161 M326 287 L210 357 M94 285 V172" opacity=".5" strokeWidth="6" />
    <path d="M112 281 L153 167 L194 281 M129 237 H178 M215 281 V168 L259 232 L303 168 V281" stroke="currentColor" strokeWidth="13" strokeLinecap="square" />
    <path d="M147 313 H272 M171 329 H248" opacity=".6" strokeWidth="3" />
    <circle cx="210" cy="72" r="6" fill="#f7f2ff" /><circle cx="74" cy="307" r="5" fill="currentColor" /><circle cx="346" cy="150" r="5" fill="currentColor" />
  </>
}

function HoverScene({ id }) {
  if (id === 'travel') return <g className="menu-hover-scene menu-flight-scene">
    <g className="menu-cloud menu-cloud-one"><path d="M60 155 Q40 155 40 138 Q40 120 62 120 Q66 94 91 98 Q116 99 119 121 Q147 117 151 138 Q154 155 132 155Z" fill="currentColor" fillOpacity=".3" /></g>
    <g className="menu-cloud menu-cloud-two"><path d="M235 300 Q215 300 215 283 Q215 265 237 265 Q241 239 266 243 Q291 244 294 266 Q322 262 326 283 Q329 300 307 300Z" fill="currentColor" fillOpacity=".23" /></g>
    <g className="menu-plane"><path d="M98 235 167 222 213 145 233 142 212 216 286 202 Q305 200 310 211 Q311 223 288 228L209 242 176 303 159 306 177 247 126 254 103 276 89 275 104 247 82 232Z" fill="currentColor" stroke="#effff8" strokeWidth="3" /><path d="M62 220H18M75 247H31" opacity=".5" strokeWidth="4" /></g>
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
  return <span className={`menu-card-art ${['travel', 'record', 'education'].includes(tab.id) ? 'menu-card-art--animated' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 420 460" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <g className="menu-static-scene"><Reflection motif={menuTheme(tab.id).motif} /></g>
        <HoverScene id={tab.id} />
      </g>
    </svg>
  </span>
}
