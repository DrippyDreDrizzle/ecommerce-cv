import { useId } from 'react'

// Original vector scenes keep the cards crisp without external image requests.
export default function ProfileArtwork({ type }) {
  const id = useId().replace(/:/g, '')
  const sky = `${id}-sky`
  const glow = `${id}-glow`
  const travel = type === 'travel'
  return <svg viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={sky} x2="0" y2="1"><stop stopColor={travel ? '#51345c' : '#252753'} /><stop offset="1" stopColor="#100e24" /></linearGradient>
      <radialGradient id={glow}><stop stopColor="#ffc7ca" stopOpacity=".8" /><stop offset="1" stopColor="#be79ee" stopOpacity="0" /></radialGradient>
    </defs>
    <path fill={`url(#${sky})`} d="M0 0h480v320H0z" />
    {travel ? <>
      <circle cx="316" cy="91" r="102" fill={`url(#${glow})`} /><circle cx="316" cy="91" r="29" fill="#edc6ce" />
      <path d="M0 167 85 69 122 104 187 25 262 127 306 96 398 157 449 92 480 125V240H0Z" fill="#625274" />
      <path d="m118 106 69-81 75 102-49-34-22 6-14-23-31 37-9-17z" fill="#d1b4d0" />
      <path d="M0 180 68 125 156 183 260 117 341 181 410 150 480 179V236H0Z" fill="#2f304b" />
      <path d="M0 196 Q150 182 250 202T480 193V320H0Z" fill="#575077" />
      <path d="m187 217 18 25-39 35 25 28h118l-34-36 42-31-37-21z" fill="#b596b2" opacity=".22" />
      <g stroke="#dac3da" opacity=".35"><path d="M15 218h108m177-6h151M50 240h112m118-7h100M5 259h105m220-6h108M110 283h106" /></g>
      <g fill="#ba657a" stroke="#211b35" strokeWidth="3"><path d="M250 128h12v109h-12zM345 128h12v109h-12z" /><path d="m232 113 144 0-6 13H238z" /><path d="M240 143h128v9H240z" /><path d="M295 124h17v27h-17z" /></g>
      <path d="M227 111q77 14 153 0" fill="none" stroke="#201e32" strokeWidth="7" />
      <g fill="#141a2a"><path d="M0 230 12 175 28 212 43 140 58 213 80 179 95 235v85H0zM418 232l15-65 12 31 14-62 21 77v107h-62z" /></g>
    </> : <>
      <path d="M0 230 330 0h150L170 320H0z" fill="#6c49b0" opacity=".55" />
      <g stroke="#c4b1ff" opacity=".3"><path d="M0 82 194 0M0 133 259 0M0 192 330 0M236 320 480 110M305 320 480 170M372 320 480 223" /></g>
      <circle cx="225" cy="110" r="146" fill={`url(#${glow})`} opacity=".45" />
      {/* Football: sweeping kick, angular kit and expressive manga silhouette. */}
      <g stroke="#101122" strokeWidth="4" strokeLinejoin="round">
        <path d="m143 158-14 53-53 33-32-9-10 17 50 13 75-36 23-59z" fill="#c2bddb" />
        <path d="m170 161 32 29 54-7 29 14 8-14-31-19-43 2-21-34z" fill="#ddd2e4" />
        <path d="m132 142-9 38 35 12 13-23 21 17 23-26-30-27z" fill="#151b3d" />
        <path d="m145 77-26 22 7 55 57 8 18-38-17-38z" fill="#586ad2" />
        <path d="m149 83 3 57m17-54 7 61" stroke="#b1b5fa" strokeWidth="8" />
        <path d="m123 94-30 23-18-15-9 9 28 24 35-18m63-21 24 13 23-36 12 7-22 51-35-12" fill="#d2b7ce" />
        <path d="m149 53-4 24 17 13 19-16 2-25z" fill="#e0bdd0" />
        <path d="m140 63-7-21 13 1 2-13 14 7 13-10 5 14 15 2-12 28-6-14-10 8-7-13-6 16z" fill="#141b34" />
        <path d="m164 69 9-2" strokeWidth="2" />
        <path d="m46 235-19 3-11 16 28 4 7-10m235-64 17-2 13 15-22 12-8-10" fill="#f1e8f9" />
      </g>
      <g transform="translate(72 189)" stroke="#1a1831" strokeWidth="2"><circle r="24" fill="#e2dbf1" /><path d="m0-12 12 9-5 14H-8l-5-14Z" fill="#292a48" /><path d="m0-12 2-12M12-3l12-4M7 11l7 9M-8 11l-10 6M-13-3l-10-8" fill="none" /></g>
      {/* Basketball: a rising jump shot, red jersey and ink-like action strokes. */}
      <g stroke="#161323" strokeWidth="4" strokeLinejoin="round">
        <path d="m322 169-9 50 18 51 15-4-10-48 12-35m11-12 24 39-2 45 16 2 9-52-28-51" fill="#deb6c3" />
        <path d="m319 146-7 37 29 10 12-19 12 13 30-12-21-36z" fill="#9b3d69" />
        <path d="m327 80-12 25 4 45 55 4 9-45-17-28z" fill="#c75578" />
        <path d="m324 84 4 14 25 7 16-19M321 141l51 4" fill="none" stroke="#f5cbd6" strokeWidth="5" />
        <path d="m319 99-19-26 13-35 11 4-7 28 18 15m37 6 13-31-12-29 10-7 21 34-20 48" fill="#e3b9c7" />
        <path d="m334 57 1 22 15 12 15-13 1-23z" fill="#e4bbc9" />
        <path d="m329 62-2-16 12-9 24 2 11 14-10 12-3-13-24 3-1 12z" fill="#542b4b" />
        <path d="m342 65 8 2m5-1 7-2" strokeWidth="2" />
        <path d="m329 264-8 14 8 8 24-7-6-14m32-13-5 16 24 8 10-8-13-15" fill="#eee0f1" />
      </g>
      <g transform="translate(345 25)" stroke="#3b2135" strokeWidth="2.5"><circle r="25" fill="#e5a076" /><path d="M-25 0h50M0-25v50M-19-17q29 16 0 34M19-17q-29 16 0 34" fill="none" /></g>
      <path d="m98 63-48 42m155 29 50-66m166 44 43-77M272 253l-43 48" stroke="#e6d4ff" strokeWidth="3" opacity=".6" />
    </>}
  </svg>
}
