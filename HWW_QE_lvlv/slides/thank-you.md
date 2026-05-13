---
class: no-page-number
transition: fade
---

<div class="thank-you-root h-full w-full min-h-0 relative overflow-hidden flex flex-col box-border">
<div class="thanks-main flex-1 min-h-0 flex flex-col justify-end items-center w-full box-border pb-1 px-1">

<div class="thanks-layout">
  <div class="thanks-copy">
    <div class="thanks-title gradient-animated">Thank you</div>
    <div class="thanks-subtitle">Questions and discussion</div>
    <div class="special-thanks">
      <div class="special-kicker">Special thanks</div>
      <div class="special-name">Yuan-Yen</div>
      <div class="special-text">
        For providing the data, baseline reference, plotting support, and many useful discussions throughout this study.
      </div>
    </div>
    <div class="resource-line">
      More information: <a href="https://arxiv.org/abs/2601.17126" class="talk-link"><div inline-block mr-1 translate-y-0.5 i-simple-icons:arxiv />arXiv:2601.17126</a><span class="dot">·</span><a href="https://gitlab.cern.ch/yulei/hww_lvlv_qe_evenet" class="talk-link"><div inline-block mr-1 translate-y-0.5 i-ri:github-fill />repository</a><span class="dot">·</span><a href="https://evenet-hep.github.io/EveNet-Full/" class="talk-link">documentation</a>
    </div>
  </div>
  <div class="thanks-stage" aria-label="fun thank-you illustration for Yuan-Yen">
    <div class="spark spark-a">✦</div>
    <div class="spark spark-b">✧</div>
    <div class="spark spark-c">✦</div>
    <div class="thank-card">
      <div class="thank-card-small">Special thanks to</div>
      <div class="thank-card-name">Yuan-Yen</div>
      <div class="thank-card-foot">data + help</div>
    </div>
    <div class="mini-presenter">
      <div class="mini-head"></div>
      <div class="mini-body"></div>
      <div class="mini-arm mini-arm-left"></div>
      <div class="mini-arm mini-arm-right"></div>
      <div class="mini-leg mini-leg-left"></div>
      <div class="mini-leg mini-leg-right"></div>
    </div>
  </div>
</div>

</div>

<div class="slide-meta">
  <div>
    Slides open sourced at <a href="https://github.com/AvencastF/EveNet-Presentation/tree/main/HWW_QE_lvlv"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />HWW_QE_lvlv</a>
  </div>
  <div>
    Built with <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a>
  </div>
</div>

<div class="thank-you-evenet-wrap">
  <img src="/evenet-logo-color.svg" alt="" class="thank-you-evenet-logo" />
  <div class="thank-you-evenet-text-col">
    <span class="thank-you-evenet-text gradient-animated">EveNet</span>
    <span class="thank-you-evenet-sub">For HEP</span>
  </div>
</div>

<div class="thanks-bottom-logos" w-full absolute bottom-2 left-0 right-0 flex items-end justify-end gap-1 px-3 pb-1>
  <div w-full flex items-center justify-end gap-1>
    <a href="https://www.nersc.gov" class="logo-link"><img src="/nersc-logo.svg" h-10 translate-y></a>
    <a href="https://www.nersc.gov/what-we-do/computing-for-science/perlmutter" class="logo-link"><img src="/perlmutter-logo.svg" h-10></a>
  </div>
</div>

</div>

<style>
.logo-link {
  text-decoration: none !important;
  border-bottom: none !important;
}

.thanks-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 270px;
  gap: 2.25rem;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.thanks-copy {
  position: relative;
  z-index: 20;
  padding-top: 1.4rem;
}

.thanks-title {
  display: inline-block;
  font-size: 56px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: 0.01em;
}

.thanks-subtitle {
  margin-top: 0.75rem;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.74);
}

.special-thanks {
  margin-top: 2.2rem;
  max-width: 620px;
  padding-left: 1rem;
  border-left: 3px solid rgba(103, 232, 249, 0.62);
}

.special-kicker {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(103, 232, 249, 0.95);
}

.special-name {
  margin-top: 0.32rem;
  font-size: 28px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 0 18px rgba(103, 232, 249, 0.28);
}

.special-text {
  margin-top: 0.5rem;
  font-size: 17px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.78);
}

.resource-line {
  margin-top: 1rem;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.58);
}

.dot {
  display: inline-block;
  margin: 0 0.6rem;
  color: rgba(255, 255, 255, 0.35);
}

.slide-meta {
  position: absolute;
  top: 1.05rem;
  right: 1.4rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  text-align: right;
  font-size: 12px;
  color: rgba(212, 212, 216, 0.78);
}

.thanks-stage {
  position: relative;
  height: 285px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 800px;
}

.thanks-stage::before {
  content: '';
  position: absolute;
  inset: 30px 4px 10px;
  border-radius: 48% 48% 42% 42%;
  background:
    radial-gradient(circle at 50% 18%, rgba(103, 232, 249, 0.22), transparent 36%),
    radial-gradient(circle at 58% 72%, rgba(168, 85, 247, 0.18), transparent 40%);
  filter: blur(0.5px);
}

.thanks-stage::after {
  content: '';
  position: absolute;
  bottom: 32px;
  width: 205px;
  height: 20px;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgba(103, 232, 249, 0.26), rgba(168, 85, 247, 0.11), transparent 72%);
  filter: blur(1px);
}

.thank-card {
  position: relative;
  z-index: 3;
  width: 205px;
  padding: 1rem 0.8rem 0.92rem;
  margin-top: -300px;
  border-radius: 16px;
  text-align: center;
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.88)),
    linear-gradient(135deg, rgba(103, 232, 249, 0.5), rgba(168, 85, 247, 0.5));
  border: 1px solid rgba(103, 232, 249, 0.34);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.34), 0 0 32px rgba(103, 232, 249, 0.14);
  transform: rotate(-4deg);
  animation: card-pop 3.8s ease-in-out infinite;
}

.thank-card::before,
.thank-card::after {
  content: '';
  position: absolute;
  bottom: -55px;
  width: 8px;
  height: 58px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.9);
  z-index: -1;
}

.thank-card::before {
  left: 44px;
  transform: rotate(5deg);
}

.thank-card::after {
  right: 44px;
  transform: rotate(-5deg);
}

.thank-card-small {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(103, 232, 249, 0.92);
}

.thank-card-name {
  margin-top: 0.15rem;
  font-size: 28px;
  line-height: 1;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 0 18px rgba(103, 232, 249, 0.34);
}

.thank-card-foot {
  margin-top: 0.34rem;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.62);
}

.mini-presenter {
  position: absolute;
  bottom: 42px;
  left: 50%;
  z-index: 2;
  width: 96px;
  height: 126px;
  transform: translateX(-50%);
  animation: presenter-bounce 2.6s ease-in-out infinite;
}

.mini-head {
  position: absolute;
  left: 33px;
  top: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: linear-gradient(145deg, #f5c09a, #d69064);
  box-shadow: inset -6px -6px 10px rgba(0, 0, 0, 0.12);
}

.mini-head::before {
  content: '';
  position: absolute;
  left: 3px;
  top: -3px;
  width: 30px;
  height: 14px;
  border-radius: 999px 999px 7px 7px;
  background: #211827;
}

.mini-head::after {
  content: '';
  position: absolute;
  left: 9px;
  top: 17px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 13px 0 0 rgba(30, 41, 59, 0.8), 7px 8px 0 -1px rgba(30, 41, 59, 0.52);
}

.mini-body {
  position: absolute;
  left: 24px;
  top: 37px;
  width: 52px;
  height: 56px;
  border-radius: 18px 18px 14px 14px;
  background: linear-gradient(145deg, rgba(34, 211, 238, 0.94), rgba(124, 58, 237, 0.94));
  box-shadow: inset -8px -8px 15px rgba(0, 0, 0, 0.14), 0 12px 24px rgba(0, 0, 0, 0.24);
}

.mini-arm,
.mini-leg {
  position: absolute;
  border-radius: 999px;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18);
}

.mini-arm {
  width: 13px;
  height: 54px;
  top: 36px;
  background: rgba(226, 232, 240, 0.94);
}

.mini-arm-left {
  left: 18px;
  transform: rotate(142deg);
  transform-origin: top center;
}

.mini-arm-right {
  right: 18px;
  transform: rotate(-142deg);
  transform-origin: top center;
}

.mini-leg {
  top: 88px;
  width: 16px;
  height: 40px;
  background: rgba(31, 41, 55, 0.92);
}

.mini-leg-left {
  left: 32px;
  transform: rotate(8deg);
}

.mini-leg-right {
  right: 32px;
  transform: rotate(-8deg);
}

.spark {
  position: absolute;
  z-index: 4;
  color: rgba(103, 232, 249, 0.9);
  font-size: 20px;
  text-shadow: 0 0 16px rgba(103, 232, 249, 0.5);
  animation: sparkle-float 2.8s ease-in-out infinite;
}

.spark-a {
  top: 32px;
  left: 18px;
}

.spark-b {
  top: 78px;
  right: 12px;
  animation-delay: 0.5s;
  color: rgba(196, 181, 253, 0.9);
}

.spark-c {
  bottom: 76px;
  left: 34px;
  animation-delay: 1s;
  color: rgba(74, 222, 128, 0.85);
}

@keyframes card-pop {
  0%, 100% {
    transform: rotate(-4deg) translateY(0);
  }
  50% {
    transform: rotate(-2deg) translateY(-7px);
  }
}

@keyframes presenter-bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes sparkle-float {
  0%, 100% {
    transform: translateY(0) scale(0.9);
    opacity: 0.55;
  }
  50% {
    transform: translateY(-8px) scale(1.12);
    opacity: 1;
  }
}

.thank-you-evenet-wrap {
  position: absolute;
  top: 1.25rem;
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
