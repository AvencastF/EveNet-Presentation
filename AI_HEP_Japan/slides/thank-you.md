---
class: no-page-number
transition: fade
---


<div flex>
  <div flex-1>
    <div mt-30 />
    <div text="[48px]">
      Thank you!
    </div>
    <div mt-8 text-lg text="zinc-300">
      Powered by <b>NERSC</b> with 512 <div inline-block mr-1 i-bi:nvidia />NVIDIA A100 GPUs
      <div inline-block ml-2 translate-y-0.8>
      </div>
    </div>
    <div mt-10 text-base text="zinc-400">
      For more details, please check talks at <a href="https://indico.physics.brown.edu/event/18/contributions/399/" class="talk-link">BOOST</a>, <a href="https://indico.cern.ch/event/1526677/contributions/6549544/" class="talk-link">ML4Jets</a>, <a href="https://indico.cern.ch/event/1493037/contributions/6610476/" class="talk-link">LeptonPhoton</a>.
    </div>
  </div>
  <div text-sm text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      Slides open sourced at <a href="https://github.com/AvencastF/EveNet-Presentation/tree/main/AI_HEP_Japan"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />AI_HEP_Japan</a>
    </div>
    <div>
      Slides built on top of <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a>
    </div>
  </div>
</div>

<div class="thank-you-evenet-wrap">
  <img src="/evenet-logo-color.svg" alt="" class="thank-you-evenet-logo" />
  <div class="thank-you-evenet-text-col">
    <span class="thank-you-evenet-text">EveNet</span>
    <span class="thank-you-evenet-sub">For HEP</span>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x translate-y--5">
  <div w-full flex items-center justify-end gap-1>
    <a href="https://www.nersc.gov" class="logo-link"><img src="/nersc-logo.svg" h-10 translate-y></a>
    <a href="https://www.nersc.gov/what-we-do/computing-for-science/perlmutter" class="logo-link"><img src="/perlmutter-logo.svg" h-10></a>
  </div>
</div>

<style>
.logo-link {
  text-decoration: none !important;
  border-bottom: none !important;
}

.thank-you-evenet-wrap {
  position: absolute;
  bottom: 1.25rem;
  left: 3.0rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
}

.thank-you-evenet-logo {
  height: 3.5rem;
  width: auto;
  flex-shrink: 0;
}

.thank-you-evenet-text-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}
.thank-you-evenet-text {
  font-size: 2rem;
  line-height: 1;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
.thank-you-evenet-sub {
  font-size: 0.85rem;
  line-height: 1;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}

.school-logo {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
}

.school-logo:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.school-logo .logo-img {
  height: 36px;
  width: auto;
  max-width: 160px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.school-logo:hover .logo-img {
  opacity: 1;
}

.talk-link {
  color: #00e5ff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.talk-link:hover {
  color: #00b8d4;
  text-decoration: underline;
}
</style>
