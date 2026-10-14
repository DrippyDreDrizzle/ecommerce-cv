import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
import { makeParticle, stepParticle, drawParticle } from './particleEngine'
import { drawTrail, tapTrail, TRAIL_LIFETIME } from './trailEngine'

export default function ElementCursor({ element, enabled }) {
  const canvas = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!enabled || reduced || element === 'off') return
    const node = canvas.current, ctx = node?.getContext('2d')
    if (!ctx) return
    let trail = [], target = null, smooth = null
    let particles = [], frame = 0, previousTime = 0, previousPoint = null, width = 0, height = 0
    const clear = () => { cancelAnimationFrame(frame); frame=0; particles=[]; trail=[]; target=null; smooth=null; previousPoint=null; previousTime=0;ctx.clearRect(0,0,width,height) }
    const resize = () => {
      clear(); width=window.innerWidth; height=window.innerHeight
      const dpr=Math.min(window.devicePixelRatio || 1,2)
      node.width=Math.round(width*dpr);node.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    const animate = time => {
      frame=0
      const dt=previousTime ? Math.min((time-previousTime)/1000,.04) : 1/60
      previousTime=time;ctx.clearRect(0,0,width,height)
      if (element !== 'fire') {
        if (target && smooth) {
          const follow=1-Math.exp(-32*dt)
          const x=smooth.x+(target.x-smooth.x)*follow,y=smooth.y+(target.y-smooth.y)*follow
          const last=trail[trail.length-1]
          if(!last || Math.hypot(x-last.x,y-last.y)>.35) trail.push({x,y,time})
          smooth={x,y}
        }
        trail=trail.filter(p=>time-p.time<TRAIL_LIFETIME).slice(-80)
        drawTrail(ctx,trail,element,time)
      }
      particles=particles.filter(p=>stepParticle(p,dt))
      for (const p of particles) drawParticle(ctx,p)
      if (particles.length || trail.length>1 || (target && smooth && Math.hypot(target.x-smooth.x,target.y-smooth.y)>.5)) frame=requestAnimationFrame(animate)
      else previousTime=0
    }
    const emit = (event, burst=false) => {
      if (document.hidden || (!burst && event.pointerType === 'touch')) return
      const x=event.clientX,y=event.clientY,now=performance.now()
      if (element !== 'fire') {
        if (burst && (event.pointerType==='touch' || trail.length<2)) {
          trail=tapTrail(x,y,now);target=null;smooth=null
        } else {
          if (!smooth || !target || now-target.time>TRAIL_LIFETIME || Math.hypot(x-target.x,y-target.y)>450) {
            trail=[];smooth={x,y};trail.push({x,y,time:now})
          }
          target={x,y,time:now}
        }
        if(!frame) frame=requestAnimationFrame(animate)
        return
      }
      const old=previousPoint && now-previousPoint.time<100 ? previousPoint : {x,y,time:now}
      const dx=x-old.x,dy=y-old.y,distance=Math.hypot(dx,dy)
      if (!burst && previousPoint && now-previousPoint.time<12) return
      const count=burst ? 16 : Math.min(9,Math.max(2,Math.ceil(distance/5)))
      for(let i=0;i<count;i++) {
        const f=(i+1)/count
        particles.push(makeParticle(element,old.x+dx*f,old.y+dy*f,Math.max(-80,Math.min(dx,80)),Math.max(-80,Math.min(dy,80))))
      }
      if(particles.length>150) particles.splice(0,particles.length-150)
      previousPoint={x,y,time:now}
      if(!frame) frame=requestAnimationFrame(animate)
    }
    const move=event=>emit(event)
    const down=event=>emit(event,true)
    const leave=()=>{previousPoint=null;target=null;smooth=null}
    resize()
    window.addEventListener('resize',resize)
    window.addEventListener('pointermove',move,{passive:true})
    window.addEventListener('pointerdown',down,{passive:true})
    document.addEventListener('pointerleave',leave)
    window.addEventListener('blur',clear)
    document.addEventListener('visibilitychange',clear)
    return () => {
      clear();window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down)
      document.removeEventListener('pointerleave',leave);window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear)
    }
  }, [element, enabled, reduced])
  if (!enabled || reduced || element === 'off') return null
  return createPortal(<canvas ref={canvas} className="element-cursor-canvas" aria-hidden="true" />,document.body)
}
