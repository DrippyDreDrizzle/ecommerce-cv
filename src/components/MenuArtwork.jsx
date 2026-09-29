import { useId } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { menuTheme } from './menuTheme'

const SHARDS = [
  '38,51 282,17 218,147 12,241',
  '298,22 403,73 374,293 230,153',
  '20,257 216,162 345,306 94,423',
  '237,173 367,311 343,443 110,438',
]

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

export default function MenuArtwork({ tab, label }) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const theme = menuTheme(tab.id)
  return <div className="menu-artwork" aria-hidden="true" style={{ '--section-color': theme.color }}>
    <div className="menu-art-orbit" />
    <div className="menu-art-index">{tab.number}</div>
    <AnimatePresence initial={false}>
      <motion.div key={tab.id} className="menu-art-reflection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}>
        <svg viewBox="0 0 420 460" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${id}-${tab.id}-glass`} x2="1" y2="1"><stop stopColor={theme.color} stopOpacity=".26" /><stop offset=".52" stopColor="#080b15" /><stop offset="1" stopColor={theme.color} stopOpacity=".45" /></linearGradient>
            <g id={`${id}-${tab.id}-reflection`} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect width="420" height="460" fill={`url(#${id}-${tab.id}-glass)`} stroke="none" /><Reflection motif={theme.motif} /></g>
            {SHARDS.map((points, i) => <clipPath id={`${id}-${tab.id}-${i}`} key={i}><polygon points={points} /></clipPath>)}
          </defs>
          {SHARDS.map((points, i) => <g key={i}><g clipPath={`url(#${id}-${tab.id}-${i})`}><use href={`#${id}-${tab.id}-reflection`} /><path d="M-40 320 L430 38 L465 77 L0 368Z" fill="#fff" opacity=".065" /></g><polygon points={points} stroke="currentColor" strokeWidth="1.2" opacity=".65" /></g>)}
          <path d="M8 153 L31 112 L21 186Z M374 366 L410 348 L390 397Z" fill="currentColor" opacity=".55" />
        </svg>
      </motion.div>
    </AnimatePresence>
    <div className="menu-art-caption"><span>{tab.number} /</span> {label}</div>
  </div>
}
