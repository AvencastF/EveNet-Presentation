<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ scene: 'align' | 'lep' | 'higgs' | 'foundation' }>()
const canvas = ref<HTMLCanvasElement>()
const { $nav, $page, $renderContext } = useSlideContext()
const reduced = ref(false), hidden = ref(false)
const active = computed(() => $nav.value.currentPage === $page.value && $renderContext.value === 'slide' && !reduced.value && !hidden.value)
let media: MediaQueryList | undefined
let frame = 0, last = 0, time = 0
let ctx: CanvasRenderingContext2D | null = null
// Illustrative geometry only: not a detector model, event simulation or measured trajectory.
type P = [number, number, number]
function project(p: P, t: number): [number, number, number] {
  const turn = .46 + Math.sin(t * .045) * .06
  const [x,y,z] = p
  const a = x * Math.cos(turn) + z * Math.sin(turn)
  const b = -x * Math.sin(turn) + z * Math.cos(turn)
  const c = y * .64 - b * .768, d = y * .768 + b * .64
  const q = 860 / (860 + d)
  return [756 + (a * .89 + c * .456) * q * 1.25, 275 + (-a * .456 + c * .89) * q * 1.25, d]
}
function point(r:number,a:number,z:number): P { return [r*Math.cos(a),r*Math.sin(a),z] }
function path(points:P[], t:number, color:string, width=1, dash:number[]=[]){
  if(!ctx)return
  ctx.beginPath();points.forEach((p,i)=>{const v=project(p,t);if(i)ctx!.lineTo(v[0],v[1]);else ctx!.moveTo(v[0],v[1])})
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([])
}
function line2(points: number[][], color: string, width=1) {
  if(!ctx)return
  ctx.beginPath();points.forEach((p,i)=>i?ctx!.lineTo(p[0],p[1]):ctx!.moveTo(p[0],p[1]))
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()
}
function probability(t:number){
  if(!ctx)return
  // Broad, multimodal candidate density becomes more concentrated; a visual metaphor only.
  const focus=.5-.5*Math.cos(t*Math.PI/10)
  const width=100-46*focus
  const height=(x:number,z:number)=>{
    const primary=Math.exp(-((x-35)**2+(z+15)**2)/(2*width**2))*(100+145*focus)
    const secondary=Math.exp(-((x+140)**2+(z-55)**2)/(2*70**2))*(65-25*focus)
    return primary+secondary
  }
  const view=(x:number,z:number):number[]=>[735+x*.95+z*.42,365+z*.48-x*.13-height(x,z)]
  for(let z=-240;z<=240;z+=12){
    const ps=Array.from({length:71},(_,i)=>view(-350+i*10,z))
    const next=Array.from({length:71},(_,i)=>view(350-i*10,z+12))
    ctx.beginPath();[...ps,...next].forEach((p,i)=>i?ctx!.lineTo(p[0],p[1]):ctx!.moveTo(p[0],p[1]));ctx.closePath()
    ctx.fillStyle='rgba(27,28,31,.76)';ctx.fill()
    line2(ps,z>-90&&z<90?'rgba(240,195,110,.47)':'rgba(119,201,255,.24)',.8)
  }
  for(let x=-350;x<=350;x+=17)line2(Array.from({length:61},(_,i)=>view(x,-240+i*8)),'rgba(183,199,210,.18)',.65)
  // Contours on the base make the changing concentration visible at a glance.
  for(let r=40;r<240;r+=30){
    line2(Array.from({length:91},(_,i)=>{const a=i/90*Math.PI*2;const x=35+Math.cos(a)*r,z=-15+Math.sin(a)*r;return [735+x*.95+z*.42,376+z*.48-x*.13]}),'rgba(119,201,255,.12)',.7)
  }
  for(let i=0;i<36;i++){
    const a=i*2.39996+t*.055,r=(45+(i%9)*18)*(1-focus*.4)
    const v=view(35+Math.cos(a)*r,-15+Math.sin(a)*r)
    ctx.beginPath();ctx.arc(v[0],v[1],1.4,0,Math.PI*2);ctx.fillStyle='rgba(255,218,153,.56)';ctx.fill()
  }
}
function quantum(t:number){
  if(!ctx)return
  const spheres=[[605,138,132],[872,362,169]]
  // Correlated two-body state, drawn as linked state-space spheres, not a factorization of rho.
  for(let j=0;j<2;j++){
    const [cx,cy,r]=spheres[j],turn=t*.075*(j? -1:1)
    const sph=(a:number,b:number)=>{
      const x=r*Math.cos(a)*Math.cos(b),y=r*Math.sin(b),z=r*Math.sin(a)*Math.cos(b)
      return [cx+x*Math.cos(turn)+z*Math.sin(turn),cy+y*.86+(z*Math.cos(turn)-x*Math.sin(turn))*.37]
    }
    for(let k=1;k<11;k++){
      const b=-Math.PI/2+k*Math.PI/11
      line2(Array.from({length:91},(_,i)=>sph(i/90*Math.PI*2,b)),j?'rgba(240,195,110,.23)':'rgba(119,201,255,.29)',.8)
    }
    for(let k=0;k<12;k++)line2(Array.from({length:91},(_,i)=>sph(k*Math.PI/6,i/90*Math.PI*2)),j?'rgba(240,195,110,.2)':'rgba(119,201,255,.22)',.7)
    const a=t*.19+(j?Math.PI:0),b=.42*Math.sin(t*.15)
    const tip=sph(a,b)
    line2([[cx,cy],tip],j?'rgba(255,220,159,.65)':'rgba(157,217,255,.65)',1.6)
    ctx.beginPath();ctx.arc(tip[0],tip[1],3,0,Math.PI*2);ctx.fillStyle=j?'#d9b97d':'#88bad7';ctx.fill()
  }
  for(let k=0;k<19;k++){
    const ps=Array.from({length:81},(_,i)=>{
      const u=i/80,envelope=Math.sin(Math.PI*u),a=u*Math.PI*3+t*.22+k*.11
      return [605+267*u+Math.sin(a)*envelope*(28+k*2),138+224*u+Math.cos(a)*envelope*(32+k*1.8)]
    })
    line2(ps,k%2?'rgba(240,195,110,.16)':'rgba(119,201,255,.18)',.7)
  }
  // Central Z vertex with two outgoing branches to the paired state.
  line2([[742,248],[668,189],[605,138]],'rgba(119,201,255,.6)',1.2)
  line2([[742,248],[798,304],[872,362]],'rgba(240,195,110,.6)',1.2)
  ctx.beginPath();ctx.arc(742,248,4,0,Math.PI*2);ctx.fillStyle='rgba(246,226,187,.65)';ctx.fill()
}
function foundation(t:number){
  if(!ctx)return
  // Many event streams -> one shared representation -> five task pathways.
  // A decorative foundation-model metaphor, not a literal network architecture.
  const cx=746,cy=276,turn=t*.065
  const palette=['255,189,89','255,240,186','255,207,163','255,145,181','245,176,188']
  const dot=(x:number,y:number,r:number,color:string)=>{
    ctx!.beginPath();ctx!.arc(x,y,r,0,Math.PI*2);ctx!.fillStyle=color;ctx!.fill()
  }
  const glow=ctx.createRadialGradient(cx,cy,10,cx,cy,285)
  glow.addColorStop(0,'rgba(240,195,110,.16)')
  glow.addColorStop(.42,'rgba(255,145,181,.055)')
  glow.addColorStop(1,'rgba(255,145,181,0)')
  ctx.fillStyle=glow;ctx.fillRect(cx-285,cy-285,570,570)
  // Fine orbital architecture gives the shared representation physical depth.
  const sphere=(a:number,b:number,r=158)=>{
    const x=r*Math.cos(b)*Math.cos(a+turn),z=r*Math.cos(b)*Math.sin(a+turn),y=r*Math.sin(b)
    return [cx+x*.9+y*.32,cy+y*.9-x*.28+z*.23,z]
  }
  for(let k=0;k<19;k++){
    const b=-Math.PI/2+(k+1)*Math.PI/20
    line2(Array.from({length:101},(_,i)=>sphere(i/100*Math.PI*2,b)),`rgba(240,195,110,${.1+.13*Math.cos(b)})`,.65)
  }
  for(let k=0;k<30;k++){
    line2(Array.from({length:81},(_,i)=>sphere(k/30*Math.PI*2,-Math.PI/2+i/80*Math.PI)), 'rgba(255,209,181,.16)',.65)
  }
  // Nested, tilted latent-space orbits, with slowly moving packets.
  for(let k=0;k<6;k++){
    const orbit=(a:number)=>{
      const r=184+k*7,x=Math.cos(a)*r,y=Math.sin(a)*r*(.27+k*.025),tilt=-.48+k*.19
      return [cx+x*Math.cos(tilt)-y*Math.sin(tilt),cy+x*Math.sin(tilt)+y*Math.cos(tilt)]
    }
    line2(Array.from({length:161},(_,i)=>orbit(i/160*Math.PI*2)),`rgba(${palette[k%5]},.17)`,.8)
    const a=t*.17+k*1.1
    line2(Array.from({length:15},(_,i)=>orbit(a-i*.012)),`rgba(${palette[k%5]},.65)`,1.4)
    const p=orbit(a);dot(p[0],p[1],2,`rgba(${palette[k%5]},.9)`)
  }
  // Split champagne/rose rim and radial traces echo the emblem without copying it.
  for(let half=0;half<2;half++){
    const rim=Array.from({length:81},(_,i)=>{
      const a=-Math.PI/2+.07+half*Math.PI+i/80*(Math.PI-.14)
      return [cx+151*Math.cos(a),cy+146*Math.sin(a)]
    })
    line2(rim,`rgba(${half?'255,240,186':'255,145,181'},.38)`,1.5)
  }
  // Stable node identities: links rotate with the manifold instead of flickering.
  const nodes=Array.from({length:90},(_,i)=>sphere(i*2.399963,Math.asin(-.96+i/89*1.92),156))
  for(let i=0;i<nodes.length;i++){
    const p=nodes[i]
    if(i%2===0 && p[2]>-45){
      const color=p[0]<cx?'255,240,186':'255,145,181'
      line2([[cx,cy],p],`rgba(${color},${p[2]>0?.22:.08})`,.8)
    }
    for(let j=i+1;j<nodes.length;j++){
      const q=nodes[j],distance=Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])
      if(distance<63)line2([p,q],`rgba(240,210,158,${p[2]>0?.19:.065})`,.7)
    }
    dot(p[0],p[1],p[2]>0?1.8:1,`rgba(255,224,170,${p[2]>0?.8:.25})`)
  }
  // Heterogeneous event traces enter from the lower left, below the cover copy.
  for(let k=0;k<28;k++){
    const stream=(u:number)=>{
      const spread=(k-13.5)*10
      return [210+u*480,548-u*244+spread*(1-u)**1.7+Math.sin(u*7+k*.34)*22*Math.sin(Math.PI*u)]
    }
    line2(Array.from({length:81},(_,i)=>stream(i/80)),`rgba(${palette[k%5]},.16)`,.75)
    const phase=(t*.095+k*.071)%1
    line2(Array.from({length:9},(_,i)=>stream(Math.max(0,phase-i*.006))),`rgba(${palette[k%5]},.65)`,1.2)
    const p=stream(phase);dot(p[0],p[1],1.3,`rgba(${palette[k%5]},.8)`)
  }
  // Five task constellations use variations within the emblem's warm palette.
  for(let k=0;k<5;k++){
    const endY=75+k*95,endX=938-Math.abs(k-2)*12
    const branch=(u:number)=>[cx+u*(endX-cx),cy+(endY-cy)*(u*u*(3-2*u))]
    for(let strand=-2;strand<=2;strand++){
      line2(Array.from({length:71},(_,i)=>{const u=i/70,p=branch(u);return [p[0],p[1]+strand*5*Math.sin(Math.PI*u)]}),`rgba(${palette[k]},.23)`,.8)
    }
    const phase=(t*.12+k*.18)%1,p=branch(phase)
    dot(p[0],p[1],2,`rgba(${palette[k]},.85)`)
    for(let j=0;j<7;j++){
      const a=j*Math.PI*2/6,x=endX+Math.cos(a)*17,y=endY+Math.sin(a)*17
      line2([[endX,endY],[x,y]],`rgba(${palette[k]},.4)`,.8)
      dot(x,y,j===6?2.5:1.6,`rgba(${palette[k]},.75)`)
    }
    dot(endX,endY,3,`rgba(${palette[k]},.9)`)
  }
  const core=ctx.createRadialGradient(cx,cy,0,cx,cy,52)
  core.addColorStop(0,'rgba(255,174,193,.55)');core.addColorStop(.18,'rgba(240,195,110,.12)');core.addColorStop(1,'rgba(240,195,110,0)')
  ctx.fillStyle=core;ctx.fillRect(cx-52,cy-52,104,104)
}
function render(t:number){
  if(!ctx)return
  ctx.clearRect(0,0,980,551)
  if(props.scene==='foundation'){foundation(t);return}
  if(props.scene==='align'){probability(t);return}
  if(props.scene==='lep'){quantum(t);return}
  // Perspective barrel: separated annular plates, ribs and recessed detector layers.
  const panels:{p:P[],depth:number,lit:number}[]=[]
  const radius=props.scene==='higgs'?205:185
  for(const z0 of [-300,-278,-240,-210,-180,-150,-120,-90,90,120,150,180,210,240,278,300]){
    const z=z0+(z0<0?-1:1)*(16+Math.sin(t*.11)*8)
    for(let i=0;i<56;i++){
      const a=i*Math.PI*2/56, b=(i+.88)*Math.PI*2/56
      const r=radius+(Math.abs(z0)>260?15:0)
      const ps=[point(r,a,z),point(r,b,z),point(r-22,b,z),point(r-22,a,z)]
      panels.push({p:ps,depth:project(ps[0],t)[2],lit:(Math.cos(a-.7)+1)/2})
    }
  }
  panels.sort((a,b)=>b.depth-a.depth)
  for(const panel of panels){
    ctx.beginPath();panel.p.forEach((p,i)=>{const v=project(p,t);if(i)ctx!.lineTo(v[0],v[1]);else ctx!.moveTo(v[0],v[1])});ctx.closePath()
    const l=Math.round(25+panel.lit*14)
    ctx.fillStyle=`rgb(${l+3},${l+2},${l})`;ctx.fill();ctx.strokeStyle=`rgba(188,174,150,${.09+panel.lit*.2})`;ctx.lineWidth=.65;ctx.stroke()
  }
  for(let i=0;i<28;i++){
    const a=i*Math.PI*2/28
    path([point(radius+4,a,-320),point(radius+4,a,320)],t,'rgba(149,161,171,.2)',.7)
  }
  // Open central tracking volume, with fine internal rings.
  for(const z of [-72,-48,-24,0,24,48,72]){
    const ps=Array.from({length:81},(_,i)=>point(123,i*Math.PI*2/80,z))
    path(ps,t,'rgba(119,201,255,.16)',.65)
  }
  const phase=(t%12)/12
  const beam:P[]=Array.from({length:60},(_,i)=>[0,0,-550+i*1100/59] as P)
  path(beam,t,'rgba(180,197,212,.22)',.8)
  // Incoming bunches approach the interaction point, without flashing.
  for(const sign of [-1,1]){
    const z=sign*(1-phase)*500
    path([[0,0,z],[0,0,z+sign*65]],t,'rgba(179,214,244,.55)',1.5)
  }
  // Two Higgs branches, each ending in a daughter pair. No channel or analysis result implied.
  for(const side of [-1,1]){
    const vertex:P=[side*90,side*75,side*28]
    path([[0,0,0],vertex],t,'rgba(240,195,110,.65)',1.6)
    const v=project(vertex,t)
    ctx.beginPath();ctx.arc(v[0],v[1],6,0,Math.PI*2);ctx.strokeStyle='rgba(255,224,165,.65)';ctx.lineWidth=1;ctx.stroke()
    for(const branch of [-1,1]){
      const ps:P[]=Array.from({length:61},(_,i)=>{const u=i/60;return [vertex[0]+side*u*260,vertex[1]+side*u*(90+branch*110),vertex[2]+branch*u*130] as P})
      path(ps,t,branch>0?'rgba(240,195,110,.42)':'rgba(119,201,255,.38)',1.2)
      const offset=Math.floor(((phase+.18*(side+1)+.1*branch)%1)*50)
      path(ps.slice(offset,offset+8),t,'rgba(255,229,184,.75)',1.8)
      for(let k=1;k<4;k++)path(ps.map((p,i)=>[p[0],p[1]+Math.sin(i/60*Math.PI)*k*5,p[2]+k*3] as P),t,'rgba(153,188,211,.11)',.65)
    }
  }
  const origin=project([0,0,0],t)
  const light=ctx.createRadialGradient(origin[0],origin[1],0,origin[0],origin[1],95)
  light.addColorStop(0,'rgba(255,223,166,.16)');light.addColorStop(.25,'rgba(119,201,255,.045)');light.addColorStop(1,'rgba(0,0,0,0)')
  ctx.fillStyle=light;ctx.fillRect(origin[0]-95,origin[1]-95,190,190)
  ctx.beginPath();ctx.arc(origin[0],origin[1],2.4,0,Math.PI*2);ctx.fillStyle='rgba(255,231,188,.75)';ctx.fill()
}
function tick(stamp:number){
  if(!active.value)return
  if(stamp-last>=33){time+=last?Math.min((stamp-last)/1000,.1):0;last=stamp;render(time)}
  frame=requestAnimationFrame(tick)
}
function sync(){cancelAnimationFrame(frame);last=0;render(time);if(active.value)frame=requestAnimationFrame(tick)}
function motionChange(){reduced.value=!!media?.matches}
function visibility(){hidden.value=document.hidden}
onMounted(()=>{
  const c=canvas.value;if(!c)return
  const dpr=Math.min(window.devicePixelRatio||1,2)
  c.width=980*dpr;c.height=551*dpr;ctx=c.getContext('2d');ctx?.scale(dpr,dpr)
  media=window.matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',motionChange)
  document.addEventListener('visibilitychange',visibility);motionChange();visibility();sync()
})
watch(active,sync)
onBeforeUnmount(()=>{cancelAnimationFrame(frame);media?.removeEventListener('change',motionChange);document.removeEventListener('visibilitychange',visibility)})
</script>

<template>
  <div class="chapter-scene" :data-scene="scene" :data-animated="active" aria-hidden="true">
    <canvas ref="canvas" />
    <div v-if="scene === 'align'" class="scene-notation probability-notation"><LaTeX formula="p_\theta(\nu,\bar{\nu}\mid x)" /></div>
    <template v-if="scene === 'lep'">
      <div class="scene-notation tau-plus"><LaTeX formula="\tau^+" /></div>
      <div class="scene-notation tau-minus"><LaTeX formula="\tau^-" /></div>
      <div class="scene-notation z-vertex"><LaTeX formula="Z" /></div>
      <div class="scene-notation state-notation"><LaTeX formula="\rho_{\tau^+\tau^-}" /></div>
    </template>
    <template v-if="scene === 'higgs'">
      <div v-for="side in [-1,1]" :key="side" class="scene-notation higgs-notation" :style="{ left: `${project([side*90,side*75,side*28],0)[0]/9.8}%`, top: `${(project([side*90,side*75,side*28],0)[1]-28)/5.51}%` }"><LaTeX formula="H" /></div>
    </template>
    <div class="chapter-scene-shade" />
  </div>
</template>

<style scoped>
.chapter-scene{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:#0c0d0f}
.chapter-scene canvas{display:block;width:100%;height:100%;opacity:.87}
.chapter-scene-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(12,13,15,.97) 0%,rgba(12,13,15,.8) 34%,rgba(12,13,15,.38) 65%,rgba(12,13,15,.05) 100%),linear-gradient(0deg,rgba(12,13,15,.96),transparent 22%,transparent 88%,rgba(12,13,15,.18))}
.chapter-scene[data-scene="foundation"] .chapter-scene-shade{background:linear-gradient(90deg,#0c0d0f 0%,rgba(12,13,15,.94) 32%,rgba(12,13,15,.65) 50%,rgba(12,13,15,.06) 73%),linear-gradient(0deg,rgba(12,13,15,.6),transparent 18%,transparent 85%,rgba(12,13,15,.28))}
.scene-notation{position:absolute;color:#d9bd8e;opacity:.5;font-size:28px;line-height:1;pointer-events:none}
.probability-notation{left:77%;top:12%;font-size:32px}
.tau-plus{left:60%;top:21%;color:#99cee9}.tau-minus{left:87%;top:65%}
.z-vertex{left:75%;top:39%;font-size:20px}.state-notation{left:84%;top:7%;font-size:35px}
.higgs-notation{font-size:25px}
@media print{.chapter-scene canvas{opacity:.5}}
</style>
