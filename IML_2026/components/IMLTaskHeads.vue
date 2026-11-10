<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { animate } from 'animejs'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ mode: 'deterministic' | 'generative' }>()
const { $nav, $page, $renderContext } = useSlideContext()
const motion = reactive({ phase: 0.75 })
const reduced = ref(false)
const hidden = ref(false)
const running = computed(() => $nav.value.currentPage === $page.value && $renderContext.value === 'slide' && !hidden.value && !reduced.value)
let loop: ReturnType<typeof animate> | undefined
let media: MediaQueryList | undefined
const clamp = (v:number) => Math.max(0, Math.min(1,v))
const progress = computed(() => { const t=clamp((motion.phase-.12)/.6); return t*t*(3-2*t) })
const colors = ['#77c9ff','#edc57f','#bca7ee']
const eventPoints = Array.from({length:33},(_,i)=>({g:i%3,x:[64,199,108][i%3]+Math.cos(i*2.4)*(9+i%6*4),y:[65,75,132][i%3]+Math.sin(i*2.4)*(7+i%5*3)}))
const particles = Array.from({length:12},(_,i)=>({x:31+i%4*37,y:52+Math.floor(i/4)*44,g:[0,0,1,2,1,0,2,2,0,1,1,2][i]}))
const cloud = Array.from({length:16},(_,i)=>({x:37+i%4*19,y:50+Math.floor(i/4)*22,dx:Math.sin(i*2.1)*20,dy:Math.cos(i*1.8)*20,masked:[1,3,6,8,11,14].includes(i)}))
const invisible = Array.from({length:10},(_,i)=>({x:305+(i%2)*38+Math.cos(i*2.4)*12,y:80+(i%2)*38+Math.sin(i*2.4)*12,nx:282+(i%5)*17,ny:38+Math.floor(i/5)*100}))
const mix=(a:number,b:number,t:number)=>a+(b-a)*t
function sync() {
  loop?.cancel()
  if(running.value) loop=animate(motion,{phase:{from:0,to:1},duration:6500,ease:'linear',loop:true})
  else motion.phase=.85
}
function preference(){reduced.value=!!media?.matches}
function visibility(){hidden.value=document.hidden}
onMounted(()=>{media=window.matchMedia('(prefers-reduced-motion: reduce)'); media.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);preference();visibility();sync()})
watch(running,sync)
onBeforeUnmount(()=>{loop?.cancel();media?.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility)})
</script>

<template>
  <div class="iml-tasks" :data-mode="mode" :data-running="running" :data-phase="motion.phase">
    <template v-if="mode==='deterministic'">
      <div class="task-common"><span>Particle features</span><span class="flow-arrow">→</span><strong>Object Encoder</strong><span class="flow-arrow">→</span><span>Three task heads</span></div>
      <div class="task-columns">
        <section v-for="(name,k) in ['Classification','Assignment','Segmentation']" :key="name" :style="{'--task-color':colors[k]}">
          <div class="task-heading"><span class="task-dot"/><h2>{{name}}</h2></div>
          <div class="task-diagram">
            <svg v-if="k===0" viewBox="0 0 270 215" role="img" aria-label="Schematic event classification and process probabilities">
              <ellipse v-for="(c,j) in [{x:64,y:65},{x:199,y:75},{x:108,y:132}]" :key="j" :cx="c.x" :cy="c.y" rx="45" ry="33" :stroke="colors[j]" fill="none" stroke-opacity=".25" stroke-dasharray="3 5" />
              <circle v-for="(p,i) in eventPoints" :key="i" :cx="p.x" :cy="p.y" r="3.2" :fill="colors[p.g]" opacity=".8" />
              <path d="M235 152 Q180 160 64 65" fill="none" stroke="#77c9ff" stroke-opacity=".25" stroke-dasharray="3 5"/>
              <circle :cx="mix(235,64,progress)" :cy="mix(152,65,progress)" r="8" fill="#1b2028" stroke="#fff" stroke-width="2" />
              <rect v-for="j in 3" :key="j" :x="28+(j-1)*82" y="183" width="61" height="8" rx="4" fill="#ffffff12" />
              <rect v-for="j in 3" :key="j" :x="28+(j-1)*82" y="183" :width="mix(20,[54,14,7][j-1],progress)" height="8" rx="4" :fill="colors[j-1]" />
            </svg>
            <svg v-if="k===1" viewBox="0 0 270 215" role="img" aria-label="Schematic assignment of jets to a fixed top decay topology">
              <path d="M128 31 L58 89 M128 31 L188 58 M188 58 L154 107 M188 58 L226 107" fill="none" stroke="#a6aebc" stroke-opacity=".65" stroke-width="1.5"/>
              <g v-for="(x,j) in [58,154,226]" :key="x">
                <path :d="`M${[32,113,235][j]} 178 Q${x} 145 ${x} ${j===0?109:128}`" fill="none" stroke="#edc57f" stroke-width="2.2" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="80*(1-progress)" />
                <circle :cx="mix([32,113,235][j],x,progress)" :cy="mix(178,j===0?109:128,progress)" r="3" fill="#fff1cf" />
              </g>
              <circle v-for="j in 6" :key="j" :cx="32+(j-1)*40.6" cy="178" r="6" :fill="[1,3,6].includes(j)?'#edc57f':'#657183'"/>
              <foreignObject x="114" y="8" width="28" height="29"><div class="math-label"><LaTeX formula="t" /></div></foreignObject>
              <foreignObject x="173" y="37" width="30" height="29"><div class="math-label"><LaTeX formula="W" /></div></foreignObject>
              <foreignObject v-for="(f,j) in ['b','q','\\bar q']" :key="f" :x="[44,140,212][j]" :y="j===0?80:98" width="28" height="29"><div class="math-label"><LaTeX :formula="f"/></div></foreignObject>
            </svg>
            <svg v-if="k===2" viewBox="0 0 270 215" role="img" aria-label="Learned resonance queries select flexible groups of input objects">
              <g v-for="(group,j) in [{x:63,y:77,n:3,f:'t'},{x:194,y:77,n:2,f:'W'},{x:131,y:159,n:2,f:'Z'}]" :key="j">
                <ellipse :cx="group.x" :cy="group.y" rx="47" ry="33" :fill="colors[j]" :fill-opacity=".035+.08*progress" :stroke="colors[j]" stroke-width="1.7" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="80*(1-progress)" />
                <circle v-for="i in group.n" :key="i" :cx="group.x+(i-(group.n+1)/2)*22" :cy="group.y+(i%2?7:-7)" r="6" :fill="colors[j]" />
                <foreignObject :x="group.x-20" :y="group.y-57" width="40" height="28"><div class="math-label"><LaTeX :formula="group.f" /></div></foreignObject>
              </g>
              <circle cx="27" cy="158" r="5" fill="#657183"/><circle cx="236" cy="158" r="5" fill="#657183"/>
            </svg>
            <div class="diagram-caption">{{['Event probabilities','Fixed topology → fill decay slots','Flexible groups → classes + masks'][k]}}</div>
          </div>
          <p class="task-purpose">{{['Identify the physics process.','The decay structure is specified.','Predict each resonance and its members.'][k]}}</p>
        </section>
      </div>
    </template>
    <template v-else>
      <div class="task-common"><span>Shared backbone</span><span class="flow-arrow">→</span><strong>Diffusion decoders</strong><span class="task-common-end">Different learning signals</span></div>
      <div class="generation-columns">
        <section v-for="(name,k) in ['Self-supervised generation','Supervised generation']" :key="name" :style="{'--task-color':k===0?'#70dcb2':'#f69cab'}">
          <div class="gen-kicker">{{ k===0?'SS-Gen · ReconGeneration':'Sup-Gen · TruthGeneration' }}</div>
          <h2>{{name}}</h2>
          <div class="gen-diagram">
            <div class="gen-stages"><span>{{k===0?'Perturbed inputs':'Observed event + noise'}}</span><span>{{k===0?'Reconstructed inputs':'Invisible-particle samples'}}</span></div>
            <svg viewBox="0 0 390 172" role="img" :aria-label="k===0?'Self-supervised denoising of perturbed observed features':'Truth-supervised generation of invisible particles conditioned on the observed event'">
              <path d="M122 89 H166 M222 89 H266" stroke="#8a95a6" stroke-opacity=".6" stroke-width="1.5"/>
              <path d="M260 85 L266 89 L260 93" fill="none" stroke="#8a95a6"/>
              <circle cx="194" cy="89" r="26" fill="#ffffff04" :stroke="k===0?'#70dcb2':'#f69cab'" stroke-opacity=".6"/>
              <circle cx="194" cy="89" r="20" fill="none" :stroke="k===0?'#70dcb2':'#f69cab'" stroke-width="2" stroke-dasharray="24 102" :transform="`rotate(${motion.phase*360} 194 89)`"/>
              <circle v-for="(p,i) in cloud" :key="i" :cx="p.x+(k===0&&p.masked?p.dx:0)" :cy="p.y+(k===0&&p.masked?p.dy:0)" r="3.7" :fill="k===0&&p.masked?'#70dcb2':'#aeb9c7'" />
              <template v-if="k===0">
                <circle v-for="(p,i) in cloud" :key="i" :cx="p.x+248+(p.masked?p.dx*(1-progress):0)" :cy="p.y+(p.masked?p.dy*(1-progress):0)" r="3.7" :fill="p.masked?'#70dcb2':'#aeb9c7'"/>
              </template>
              <template v-else>
                <circle v-for="(p,i) in invisible" :key="i" :cx="mix(p.nx,p.x,progress)" :cy="mix(p.ny,p.y,progress)" r="3.5" :fill="i%2?'#bca7ee':'#f69cab'"/>
                <ellipse cx="305" cy="80" rx="22" ry="20" fill="none" stroke="#f69cab" :stroke-opacity=".4*progress" stroke-dasharray="3 4"/>
                <ellipse cx="343" cy="118" rx="22" ry="20" fill="none" stroke="#bca7ee" :stroke-opacity=".4*progress" stroke-dasharray="3 4"/>
                <circle cx="106" cy="145" r="4" fill="#f69cab"/><circle cx="119" cy="145" r="4" fill="#bca7ee"/>
                <foreignObject x="285" y="140" width="78" height="30"><div class="math-label gen-math"><LaTeX formula="\nu,\;\bar\nu" /></div></foreignObject>
              </template>
            </svg>
          </div>
          <p class="learning-signal">{{k===0?'Learns from the input itself.':'Learns from simulation truth.'}}</p>
          <p class="gen-purpose">{{k===0?'Reconstruct masked inputs; generate full events.':'Infer invisible momenta from observed objects.'}}</p>
          <div class="truth-note">{{k===0?'No truth-level targets required.':'Truth targets are used only during training.'}}</div>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.iml-tasks { margin-top:20px; }
.task-common { display:flex; align-items:center; gap:15px; height:42px; border-bottom:1px solid #ffffff20; color:#aeb7c3; font-size:15px; }
.task-common strong { color:#ece8df; font-weight:500; }
.flow-arrow { color:#dfb86f; }
.task-common-end { margin-left:auto; color:#8793a2; font-size:13px; }
.task-columns { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:26px; margin-top:26px; }
.task-columns section { min-width:0; }
.task-heading { display:flex; align-items:center; gap:9px; }
.task-dot { width:7px; height:7px; background:var(--task-color); border-radius:50%; }
.iml-tasks h2 { margin:0!important; font-size:21px!important; font-weight:550!important; color:var(--task-color)!important; line-height:1.25!important; }
.task-diagram { margin-top:12px; }
.task-diagram svg { width:100%; height:180px; display:block; overflow:hidden; }
.math-label { font-size:18px!important; line-height:27px!important; text-align:center; color:#eee9de; }
.diagram-caption { font-size:14px; font-weight:550; color:#ece8df; text-align:center; margin:4px 0 15px; }
.iml-tasks .task-purpose { font-size:16px; line-height:1.35; color:#aeb7c3; margin:0; text-align:center; }
.task-footnote { font-size:12px!important; color:#8793a2; line-height:1.3!important; margin:24px 0 0!important; }
.generation-columns { display:grid; grid-template-columns:1fr 1fr; gap:44px; margin-top:23px; }
.generation-columns section+section { border-left:1px solid #ffffff18; padding-left:27px; }
.gen-kicker { color:#929dab; font-size:12px; letter-spacing:.02em; margin-bottom:7px; }
.gen-stages { display:flex; justify-content:space-between; gap:15px; color:#aeb7c3; font-size:12px; margin:18px 0 0; }
.gen-stages span { max-width:48%; }
.gen-stages span:last-child { text-align:right; }
.gen-diagram svg { width:100%; height:132px; display:block; overflow:hidden; }
.gen-math { font-size:15px!important; }
.iml-tasks .learning-signal { color:var(--task-color); font-size:20px; font-weight:500; line-height:1.3; margin:9px 0 10px; }
.iml-tasks .gen-purpose { font-size:16px; line-height:1.4; color:#d8dce2; margin:0 0 12px; }
.truth-note { font-size:14px; color:#aeb7c3; border-left:2px solid var(--task-color); padding-left:10px; }
.iml-tasks[data-mode='generative'] .task-footnote { margin-top:22px!important; }
</style>
