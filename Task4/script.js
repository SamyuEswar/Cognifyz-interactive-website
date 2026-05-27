/* =============================================
   TASK 4 - script.js
   Interactive Mission Control - Background Color
   Changes via Button Click (Space Exploration)
   ============================================= */

// ─────────────────────────────────────────────
//  MISSION PHASES DATA
//  Each click cycles through a new phase.
//  background-color change is applied via body class.
// ─────────────────────────────────────────────
const PHASES = [
  {
    id: 'idle',
    bodyClass: 'phase-idle',
    phaseBadge: 'PHASE 00',
    titleLine1: 'EXPLORE THE',
    titleLine2: 'COSMOS',
    description: 'Humanitys greatest adventure awaits. From Earth\'s orbit to the edges of our solar system — every mission begins with a single launch. Are you ready to ignite the engines?',
    btnIcon: '🚀',
    btnText: 'INITIATE LAUNCH',
    btnSub: 'Click to begin mission',
    statusLabel: 'STANDBY',
    statDistance: '0 km',
    statSpeed: '0 km/s',
    statCrew: '0',
    logMsg: 'Mission Control online. Awaiting launch sequence.',
  },
  {
    id: 'launch',
    bodyClass: 'phase-launch',
    phaseBadge: 'PHASE 01',
    titleLine1: 'IGNITION &',
    titleLine2: 'LIFTOFF',
    description: 'Main engines at full thrust! We have liftoff. The rocket clears the launchpad as 7.5 million pounds of force pushes us toward the sky at 28,000 km/h.',
    btnIcon: '🔥',
    btnText: 'STAGE SEPARATION',
    btnSub: 'Boosters jettisoned',
    statusLabel: 'LAUNCHING',
    statDistance: '12 km',
    statSpeed: '7.8 km/s',
    statCrew: '4',
    logMsg: 'Main engines nominal. Altitude 12 km. Booster separation confirmed.',
  },
  {
    id: 'orbit',
    bodyClass: 'phase-orbit',
    phaseBadge: 'PHASE 02',
    titleLine1: 'EARTH',
    titleLine2: 'ORBIT',
    description: 'We have achieved stable orbit at 408 km above Earth. The curvature of our planet fills the viewport — a pale blue marble suspended in infinite darkness.',
    btnIcon: '🌍',
    btnText: 'PLOT COURSE',
    btnSub: 'Heading to deep space',
    statusLabel: 'IN ORBIT',
    statDistance: '408 km',
    statSpeed: '7.66 km/s',
    statCrew: '4',
    logMsg: 'Stable orbit achieved. 408 km altitude. Earth visible through all viewports.',
  },
  {
    id: 'deepspace',
    bodyClass: 'phase-deepspace',
    phaseBadge: 'PHASE 03',
    titleLine1: 'DEEP SPACE',
    titleLine2: 'TRANSIT',
    description: 'Weve left Earths gravitational sphere. Stars stretch into infinity. The silence of deep space is absolute. Our destination: the red planet, 54 million km away.',
    btnIcon: '🌌',
    btnText: 'APPROACH ORBIT',
    btnSub: 'Mars in visual range',
    statusLabel: 'DEEP SPACE',
    statDistance: '54M km',
    statSpeed: '24.1 km/s',
    statCrew: '4',
    logMsg: 'Translunar injection complete. Entering interplanetary transit. ETA: 7 months.',
  },
  {
    id: 'planet',
    bodyClass: 'phase-planet',
    phaseBadge: 'PHASE 04',
    titleLine1: 'MARS',
    titleLine2: 'ARRIVAL',
    description: 'Weve reached Mars! The rusty surface of the red planet stretches below.The first human settlement site, Olympus Base, is locked in on our landing radar.',
    btnIcon: '🔴',
    btnText: 'RESET MISSION',
    btnSub: 'Return to Mission Control',
    statusLabel: 'MARS ORBIT',
    statDistance: '54.6M km',
    statSpeed: '3.4 km/s',
    statCrew: '4',
    logMsg: 'Mars orbit insertion complete. Landing sequence initiated. Olympus Base: confirmed.',
  },
];

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let currentPhaseIndex = 0;
let missionStartTime = Date.now();
let logCount = 0;

// ─────────────────────────────────────────────
//  DOM REFS
// ─────────────────────────────────────────────
const body = document.getElementById('main-body');
const phaseBadge = document.getElementById('phase-badge');
const titleLine1 = document.getElementById('title-line-1');
const titleLine2 = document.getElementById('title-line-2');
const heroDesc = document.getElementById('hero-description');
const btnIcon = document.getElementById('btn-icon');
const btnText = document.getElementById('btn-text');
const btnSub = document.getElementById('btn-sub');
const statusLabel = document.getElementById('status-label');
const statDistance = document.getElementById('stat-distance');
const statSpeed = document.getElementById('stat-speed');
const statCrew = document.getElementById('stat-crew');
const logList = document.getElementById('log-list');
const launchBtn = document.getElementById('launch-btn');

// ─────────────────────────────────────────────
//  MISSION CLOCK
// ─────────────────────────────────────────────
function getMissionTime() {
  const elapsed = Math.floor((Date.now() - missionStartTime) / 1000);
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

// ─────────────────────────────────────────────
//  UPDATE PROGRESS STEPS
// ─────────────────────────────────────────────
function updateProgress(activeIndex) {
  for (let i = 0; i < PHASES.length; i++) {
    const step = document.getElementById(`step-${i}`);
    if (!step) continue;
    step.classList.remove('active', 'done');
    if (i === activeIndex) step.classList.add('active');
    else if (i < activeIndex) step.classList.add('done');
  }
}

// ─────────────────────────────────────────────
//  ADD LOG ENTRY
// ─────────────────────────────────────────────
function addLog(message) {
  logCount++;
  const li = document.createElement('li');
  li.classList.add('log-entry');

  const timeSpan = document.createElement('span');
  timeSpan.classList.add('log-time');
  timeSpan.textContent = getMissionTime();

  const msgSpan = document.createElement('span');
  msgSpan.classList.add('log-msg');
  msgSpan.textContent = message;

  li.appendChild(timeSpan);
  li.appendChild(msgSpan);
  logList.appendChild(li);

  // Auto-scroll to latest
  logList.scrollTop = logList.scrollHeight;
}

// ─────────────────────────────────────────────
//  BURST PARTICLES on click
// ─────────────────────────────────────────────
function spawnParticles(x, y, count = 14) {
  const container = document.getElementById('particles-container');
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 8 + 4;
    const angle = Math.random() * 360;
    const radius = Math.random() * 80 + 30;
    const tx = Math.cos((angle * Math.PI) / 180) * radius;
    const ty = Math.sin((angle * Math.PI) / 180) * radius;
    const delay = Math.random() * 0.3;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation-delay: ${delay}s;
      transform: translate(-50%, -50%);
    `;

    // Custom keyframe via style
    const kf = `
      @keyframes pd_${i}_${Date.now()} {
        0%   { opacity: 0.9; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
        100% { opacity: 0;   transform: translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0); }
      }
    `;
    const style = document.createElement('style');
    style.textContent = kf;
    document.head.appendChild(style);
    p.style.animation = `pd_${i}_${Date.now()} 1s ease-out ${delay}s forwards`;

    container.appendChild(p);
    setTimeout(() => {
      p.remove();
      style.remove();
    }, 1500);
  }
}

// ─────────────────────────────────────────────
//  NEXT PHASE  ← MAIN BUTTON HANDLER
//  This is the core JS requirement:
//  clicking the button changes the background color
// ─────────────────────────────────────────────
function nextPhase() {
  // Advance to next phase (loop back to idle after last)
  currentPhaseIndex = (currentPhaseIndex + 1) % PHASES.length;
  const phase = PHASES[currentPhaseIndex];

  // ── 1. CHANGE BACKGROUND COLOR ──────────────
  // Remove all phase classes, then apply new one.
  // CSS transitions on body handle the smooth color change.
  body.classList.remove(...PHASES.map(p => p.bodyClass));
  body.classList.add(phase.bodyClass);

  // ── 2. Flash animation ─────────────────────
  body.classList.remove('phase-flash');
  void body.offsetWidth; // reflow trick to restart animation
  body.classList.add('phase-flash');

  // ── 3. Update all text content ─────────────
  phaseBadge.querySelector('#phase-number').textContent = phase.phaseBadge;
  titleLine1.textContent = phase.titleLine1;
  titleLine2.textContent = phase.titleLine2;
  heroDesc.textContent = phase.description;
  btnIcon.textContent = phase.btnIcon;
  btnText.textContent = phase.btnText;
  btnSub.textContent = phase.btnSub;
  statusLabel.textContent = phase.statusLabel;

  // ── 4. Update Stats ────────────────────────
  animateStat(statDistance, phase.statDistance);
  animateStat(statSpeed, phase.statSpeed);
  animateStat(statCrew, phase.statCrew);

  // ── 5. Update Progress Steps ───────────────
  updateProgress(currentPhaseIndex);

  // ── 6. Log the event ──────────────────────
  addLog(phase.logMsg);

  // ── 7. Spawn particles at button center ────
  const rect = launchBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  spawnParticles(cx, cy, 18);
}

// ─────────────────────────────────────────────
//  STAT ANIMATION (count-up illusion)
// ─────────────────────────────────────────────
function animateStat(el, newValue) {
  el.style.transform = 'scale(1.3)';
  el.style.opacity = '0.4';
  setTimeout(() => {
    el.textContent = newValue;
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  }, 200);
  el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
}

// ─────────────────────────────────────────────
//  STARFIELD CANVAS
// ─────────────────────────────────────────────
(function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 220;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        alpha: Math.random(),
        dAlpha: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
        speed: Math.random() * 0.15 + 0.02,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.dAlpha;
      if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1;
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.min(Math.max(s.alpha, 0), 1)})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); createStars(); });
  resize();
  createStars();
  drawStars();
})();

// ─────────────────────────────────────────────
//  INIT — set first step as active
// ─────────────────────────────────────────────
updateProgress(0);
