// Small, dependency-free canvas renderer. Bounded particles and no work when idle.
const TAU = Math.PI * 2
export function makeParticle(element, x, y, dx = 0, dy = 0) {
  const r = Math.random
  return { element, x: x + (r()-.5)*9, y: y + (r()-.5)*9, vx: (r()-.5)*35-dx*.18, vy: (r()-.5)*35-dy*.18,
    life: 0, duration: .45+r()*.45, size: 3+r()*8, angle: r()*TAU, seed: r(), spin: (r()-.5)*4 }
}
export function stepParticle(p, dt) {
  p.life += dt
  if (p.element === 'fire') { p.vy -= 100*dt; p.vx += Math.sin(p.life*12+p.seed*10)*30*dt }
  if (p.element === 'wind') { p.vx += 55*dt; p.vy -= 15*dt }
  if (p.element === 'water') p.vy += 95*dt
  if (p.element === 'ice') p.vy += 32*dt
  if (p.element === 'earth') p.vy += 180*dt
  p.x += p.vx*dt; p.y += p.vy*dt; p.angle += p.spin*dt
  return p.life < p.duration
}
export function drawParticle(ctx, p) {
  const t = p.life/p.duration, fade = Math.max(0,1-t), s = p.size*(.35+.65*fade)
  ctx.save(); ctx.translate(p.x,p.y); ctx.globalAlpha = fade*.8
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (p.element === 'fire') {
    ctx.globalCompositeOperation = 'lighter'
    const glow = ctx.createRadialGradient(0,0,0,0,0,s*2)
    glow.addColorStop(0,'#fff2ad'); glow.addColorStop(.2,'#ffba42'); glow.addColorStop(.5,'#ff5b1c'); glow.addColorStop(1,'#ff310000')
    ctx.fillStyle = glow; ctx.beginPath(); ctx.ellipse(0,0,s*1.1,s*2,-.2,0,TAU); ctx.fill()
    ctx.fillStyle = '#ffdb71'; ctx.globalAlpha *= .6; ctx.beginPath(); ctx.moveTo(-s*.3,0); ctx.quadraticCurveTo(-s*.6,-s*.8,s*.1,-s*2.8); ctx.quadraticCurveTo(s*.7,-s*.4,s*.35,0); ctx.fill()
  } else if (p.element === 'wind') {
    ctx.rotate(p.angle*.25); ctx.strokeStyle = '#bdfbe3'; ctx.lineWidth = 1.2
    const length = s*(2+t*3)
    ctx.beginPath(); ctx.moveTo(-length,2); ctx.bezierCurveTo(-length*.4,-s,length*.6,s,length,0); ctx.bezierCurveTo(length+s,-s,length,-s*1.4,length-s,-s); ctx.stroke()
  } else if (p.element === 'water') {
    ctx.strokeStyle = '#91e5ff'; ctx.fillStyle = '#53baff'; ctx.lineWidth = 1.2
    if (p.seed > .65) { ctx.globalAlpha *= .55; ctx.beginPath(); ctx.ellipse(0,0,s*(1+t*5),s*(.4+t*2),0,0,TAU); ctx.stroke() }
    else { ctx.rotate(p.angle*.2); ctx.beginPath(); ctx.moveTo(0,-s*1.5); ctx.bezierCurveTo(s*1.3,0,s*.7,s,-0,s); ctx.bezierCurveTo(-s*.7,s,-s*1.3,0,0,-s*1.5); ctx.fill(); ctx.stroke(); ctx.fillStyle='#ddf9ff';ctx.beginPath();ctx.arc(-s*.2,s*.1,s*.18,0,TAU);ctx.fill() }
  } else if (p.element === 'lightning') {
    ctx.globalCompositeOperation = 'lighter'; ctx.rotate(p.angle); ctx.strokeStyle = '#bb83ff'; ctx.lineWidth = 3; ctx.globalAlpha *= .7
    const length = s*4
    ctx.beginPath(); ctx.moveTo(0,-length/2);ctx.lineTo(-s*.7,-s*.4);ctx.lineTo(s*.5,0);ctx.lineTo(-s*.3,length/2);ctx.lineTo(s*.8,s*.6)
    ctx.stroke();ctx.strokeStyle='#f5e9ff';ctx.lineWidth=1;ctx.stroke()
  } else if (p.element === 'ice') {
    ctx.rotate(p.angle); ctx.fillStyle = '#91d9f6'; ctx.strokeStyle = '#e9ffff';ctx.lineWidth=1
    ctx.beginPath();ctx.moveTo(0,-s*1.8);ctx.lineTo(s*.65,0);ctx.lineTo(0,s);ctx.lineTo(-s*.65,0);ctx.closePath();ctx.fill();ctx.stroke()
    ctx.beginPath();ctx.moveTo(0,-s*1.8);ctx.lineTo(0,s);ctx.stroke()
  } else if (p.element === 'earth') {
    ctx.rotate(p.angle); ctx.fillStyle = p.seed>.5 ? '#c49b67' : '#826449';ctx.strokeStyle='#ebc38a';ctx.lineWidth=.7
    ctx.beginPath();ctx.moveTo(-s,-s*.2);ctx.lineTo(-s*.3,-s*.8);ctx.lineTo(s*.7,-s*.5);ctx.lineTo(s,s*.4);ctx.lineTo(-s*.2,s*.65);ctx.closePath();ctx.fill();ctx.stroke()
    ctx.globalAlpha *= .3;ctx.fillStyle='#c6a277';ctx.beginPath();ctx.arc(-s*1.8,s,2+t*5,0,TAU);ctx.fill()
  }
  ctx.restore()
}
