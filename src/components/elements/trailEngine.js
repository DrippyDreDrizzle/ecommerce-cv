// Continuous, tapered paths rather than repeated symbols. All geometry is in CSS pixels.
export const TRAIL_LIFETIME = 720
const clamp = (n, low, high) => Math.max(low, Math.min(n, high))
const noise = n => Math.sin(n * 12.9898 + 78.233) * 43758.5453 % 1

function smoothPath(ctx, points, move = true) {
  if (!points.length) return
  if (move) ctx.moveTo(points[0].x, points[0].y)
  for (let i=1;i<points.length-1;i++) {
    const a=points[i], b=points[i+1]
    ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)
  }
  const end=points[points.length-1]
  ctx.lineTo(end.x,end.y)
}

// Sample by distance so texture density doesn't depend on pointer-event frequency.
export function sampleTrail(trail, now) {
  if (trail.length < 2) return []
  const points=[]
  let distance=0
  for(let i=1;i<trail.length;i++) {
    const a=trail[i-1],b=trail[i],length=Math.hypot(b.x-a.x,b.y-a.y)
    const steps=Math.max(1,Math.ceil(length/5))
    for(let j=0;j<steps;j++) {
      const f=j/steps
      points.push({x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f,time:a.time+(b.time-a.time)*f,d:distance+length*f})
    }
    distance+=length
  }
  points.push({...trail[trail.length-1],d:distance})
  // Bound drawing work even after unusually large mouse movements.
  const bounded=points.length>180 ? points.filter((_,i)=>i%Math.ceil(points.length/180)===0 || i===points.length-1) : points
  return bounded.map((p,i)=>{
    const a=bounded[Math.max(0,i-1)],b=bounded[Math.min(bounded.length-1,i+1)]
    const length=Math.hypot(b.x-a.x,b.y-a.y) || 1
    const progress=distance ? p.d/distance : 0
    const age=clamp((now-p.time)/TRAIL_LIFETIME,0,1)
    return {...p,nx:-(b.y-a.y)/length,ny:(b.x-a.x)/length,age,
      taper:Math.pow(Math.sin(Math.PI*progress),.65)*(1-age)}
  })
}
function offset(points, amount, time, phase=0) {
  return points.map(p=>{
    const drift=Math.sin(p.d*.024-time*.003+phase)*amount*p.taper
    return {...p,x:p.x+p.nx*drift,y:p.y+p.ny*drift}
  })
}
function ribbon(ctx, points, width, color, opacity, blur=0) {
  if(points.length<2) return
  ctx.save();ctx.globalAlpha=opacity;ctx.fillStyle=color
  ctx.shadowColor=color;ctx.shadowBlur=blur
  const left=points.map(p=>({x:p.x+p.nx*width*p.taper,y:p.y+p.ny*width*p.taper}))
  const right=points.map(p=>({x:p.x-p.nx*width*p.taper,y:p.y-p.ny*width*p.taper})).reverse()
  ctx.beginPath();smoothPath(ctx,left);ctx.lineTo(right[0].x,right[0].y);smoothPath(ctx,right,false);ctx.closePath();ctx.fill();ctx.restore()
}
function stroke(ctx,points,color,width,alpha,blur=0,angular=false) {
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.globalAlpha=alpha;ctx.shadowColor=color;ctx.shadowBlur=blur
  ctx.beginPath()
  if(angular){points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y))}else smoothPath(ctx,points)
  ctx.stroke();ctx.restore()
}

export function drawTrail(ctx, trail, element, now) {
  const points=sampleTrail(trail,now)
  if(points.length<3) return
  const head=points[points.length-1],fade=1-head.age
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round'
  ctx.globalCompositeOperation=element==='earth'?'source-over':'lighter'
  if(element==='water') {
    const flow=offset(points,4,now)
    ribbon(ctx,flow,12,'#1269bd',.12,12)
    ribbon(ctx,flow,6,'#258bda',.35,7)
    ribbon(ctx,flow,2.4,'#5edaff',.6,3)
    for(let k=0;k<3;k++) ribbon(ctx,offset(points,5+k*2,now,k*2.1),.55,'#c7f4ff',.5)
  } else if(element==='wind') {
    ribbon(ctx,points,10,'#9be0c8',.035,14)
    for(let k=0;k<5;k++) {
      const wisp=offset(points,5+k*3,now*.75,k*1.4)
      ribbon(ctx,wisp,k===2?.85:.4,k===2?'#e0fff4':'#8dd6bf',k===2?.55:.28,2)
    }
  } else if(element==='lightning') {
    const bolt=points.filter((_,i)=>i%2===0 || i===points.length-1).map(p=>{
      // Stable spatial noise: bolts travel with the path instead of flashing randomly.
      const displacement=(Math.sin(p.d*.62+p.time*.011)+Math.sin(p.d*1.7))*4*p.taper
      return {...p,x:p.x+p.nx*displacement,y:p.y+p.ny*displacement}
    })
    stroke(ctx,bolt,'#8248df',5,.16*fade,12,true)
    stroke(ctx,bolt,'#c299ff',2,.65*fade,5,true)
    stroke(ctx,bolt,'#f7edff',.7,.9*fade,0,true)
    for(let i=8;i<bolt.length-3;i+=12){
      const p=bolt[i],side=i%24===8?1:-1,length=14*p.taper
      const branch=[p,{x:p.x+p.nx*length*side+3,y:p.y+p.ny*length*side-4},{x:p.x+p.nx*length*1.6*side-3,y:p.y+p.ny*length*1.6*side-9}]
      stroke(ctx,branch,'#dac4ff',.65,.45*fade*p.taper,3,true)
    }
  } else if(element==='ice') {
    ribbon(ctx,points,13,'#88c8e4',.06,12)
    ribbon(ctx,offset(points,3,now*.3),2.2,'#91dbf5',.3,6)
    ribbon(ctx,points,.65,'#e4fbff',.65,2)
    // Frost grows from the shared spine; no detached diamond sprites.
    for(let i=3;i<points.length-2;i+=4){
      const p=points[i],growth=Math.min(1,p.age*6+.2),length=(4+Math.abs(noise(p.time))*9)*p.taper*growth
      for(const side of [-1,1]){
        const tip={x:p.x+p.nx*length*side-p.ny*length*.6,y:p.y+p.ny*length*side+p.nx*length*.6}
        stroke(ctx,[p,tip],'#d5f5ff',.65,p.taper*.55,2)
        const mid={x:(p.x+tip.x)/2,y:(p.y+tip.y)/2}
        stroke(ctx,[mid,{x:mid.x+p.nx*length*.4*side,y:mid.y+p.ny*length*.4*side}],'#b6e9fc',.45,p.taper*.4)
      }
    }
  } else if(element==='earth') {
    const dust=points.map(p=>({...p,y:p.y+p.age*p.age*28}))
    ribbon(ctx,dust,17,'#8f6844',.065,16)
    ribbon(ctx,offset(dust,6,now*.4),8,'#be9461',.12,8)
    for(let k=0;k<3;k++) ribbon(ctx,offset(dust,8+k*3,now*.5,k*2),.8,'#caa574',.18,3)
    // Fine grains embedded in the dust plume, not large repeated rock shapes.
    ctx.fillStyle='#e1c59b'
    for(let i=1;i<dust.length;i+=2){
      const p=dust[i],spread=noise(p.time)*17*p.taper
      ctx.globalAlpha=.4*p.taper;ctx.beginPath();ctx.arc(p.x+p.nx*spread,p.y+p.ny*spread,.45+Math.abs(noise(p.d))*.5,0,Math.PI*2);ctx.fill()
    }
  }
  ctx.restore()
}

export function tapTrail(x,y,time) {
  return Array.from({length:28},(_,i)=>{
    const f=i/27,a=f*Math.PI*1.7,r=5+f*25
    return {x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,time:time-90*(1-f)}
  })
}
