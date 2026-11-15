// Juan Carlos Gutiérrez Pesquero — QA Portfolio Interactive Engine

// --- 1. Typewriter Effect (Works in Normal View & inside Modo Agentes) ---
const typedEl = document.getElementById('typed');
const caretEl = document.getElementById('caret');

const phrases = [
  'suites de test robustas.',
  'ejecuciones E2E en segundos.',
  'arquitecturas de QA limpias.',
  'fixtures deterministas.',
  'compuertas de CI/CD fiables.'
];

let phraseIndex = 0;
let charIndex = phrases[0].length;
let isDeleting = true;
let typingSpeed = 70;
let isTypingActive = false;
let typeTimer = null;

function setTypedContent(text) {
  if (typedEl) {
    typedEl.textContent = text;
  }
  if (window.__swarmRoot) {
    const swarmEls = window.__swarmRoot.querySelectorAll('#typed');
    swarmEls.forEach((el) => {
      el.textContent = text;
    });
  }
}

function resetTypewriter() {
  clearTimeout(typeTimer);
  isTypingActive = false;
  phraseIndex = 0;
  charIndex = phrases[0].length;
  isDeleting = true;
  setTypedContent(phrases[0]);
}

function startTypewriter(delay = 0) {
  clearTimeout(typeTimer);
  if (isTypingActive) return;
  isTypingActive = true;
  if (delay > 0) {
    typeTimer = setTimeout(typeLoop, delay);
  } else {
    typeLoop();
  }
}

function typeLoop() {
  if (!isTypingActive) return;
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    setTypedContent(currentPhrase.substring(0, charIndex));
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeTimer = setTimeout(typeLoop, 400);
      return;
    }
  } else {
    charIndex++;
    setTypedContent(currentPhrase.substring(0, charIndex));
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typeTimer = setTimeout(typeLoop, 2200);
      return;
    }
  }

  const speed = isDeleting ? 35 : typingSpeed + (Math.random() * 25);
  typeTimer = setTimeout(typeLoop, speed);
}



// --- 2. Interactive Compare Slider (Before / After Inspector) ---
const demoStage = document.getElementById('demo-stage');
const diffView = document.getElementById('diff-view');
const cmpBar = document.getElementById('cmp-bar');

let isDragging = false;

function updateSlider(clientX) {
  if (!demoStage) return;
  const rect = demoStage.getBoundingClientRect();
  const x = clientX - rect.left;
  let percent = (x / rect.width) * 100;
  percent = Math.max(0, Math.min(100, percent));

  demoStage.style.setProperty('--p', `${percent}%`);
  demoStage.setAttribute('aria-valuenow', Math.round(percent).toString());
}

if (demoStage) {
  demoStage.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  demoStage.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Keyboard accessibility
  demoStage.addEventListener('keydown', (e) => {
    const current = parseFloat(demoStage.getAttribute('aria-valuenow') || '50');
    if (e.key === 'ArrowLeft') {
      const next = Math.max(0, current - 5);
      demoStage.style.setProperty('--p', `${next}%`);
      demoStage.setAttribute('aria-valuenow', next.toString());
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(100, current + 5);
      demoStage.style.setProperty('--p', `${next}%`);
      demoStage.setAttribute('aria-valuenow', next.toString());
      e.preventDefault();
    }
  });
}


// --- 3. Interactive Scenario Pills (Switch Test Suites dynamically) ---
const scenarios = {
  e2e: {
    title: 'google-website-e2e.spec.ts',
    liveText: '6/6 Specs Passed · 0.18s',
    rows: [
      { name: "page.goto('https://www.google.com')", time: '38ms', delay: 1050 },
      { name: "locator('textarea[name=\"q\"]').fill('playwright test automation engineer')", time: '14ms', delay: 420 },
      { name: "page.waitForResponse('**/complete/search?*') → HTTP 200", time: '22ms', delay: 780 },
      { name: "expect(page.getByRole('button', { name: 'Buscar con Google' })).toBeVisible()", time: '9ms', delay: 320 },
      { name: "page.keyboard.press('Enter') → Results loaded", time: '31ms', delay: 880 },
      { name: "expect(page.locator('#search .g')).toHaveCount(10)", time: '18ms', delay: 360 }
    ],
    ascii: `   ____   _    ____ ____  _____ ____  
  |  _ \\ / \\  / ___/ ___|| ____|  _ \\ 
  | |_) / _ \\ \\___ \\___ \\|  _| | | | |
  |  __/ ___ \\ ___) |__) | |___| |_| |
  |_| /_/   \\_\\____/____/|_____|____/ 
  ─────────────────────────────────────────────
  ✔ Target App: https://www.google.com
  ✔ 6/6 E2E specs executed with zero flakiness
  ✔ Network mocks: 0 timeout leaks
  ✔ Artifacts: trace.playwright.dev, video, snapshot`
  },
  api: {
    title: 'google-api-testing.contract.ts',
    liveText: '24/24 Contracts Validated · 0.09s',
    rows: [
      { name: "GET /complete/search?client=chrome&q=how+to+hire → HTTP 200", time: '14ms', delay: 720 },
      { name: "Schema: Strict JSON Schema Draft 2020-12 validation", time: '6ms', delay: 380 },
      { name: "Headers: Cache-Control & Content-Type: application/json", time: '4ms', delay: 280 },
      { name: "Payload: Expect suggestions[0] === 'Juan Carlos Gutierrez'", time: '8ms', delay: 460 },
      { name: "Performance: p99 latency < 45ms across 100 iterations", time: '12ms', delay: 840 }
    ],
    ascii: `    _    ____ ___ 
   / \\  |  _ \\_ _|
  / _ \\ | |_) | | 
 / ___ \\|  __/| | 
/_/   \\_\\_|  |___|
  ─────────────────────────────────────────────────────
  ✔ Google Autocomplete API Contract verified
  ✔ Strict payload type validation (zero drift)
  ✔ SLA: p99 latency 14ms (Target: < 100ms)`
  },
  a11y: {
    title: 'google-accessibility-wcag.spec.ts',
    liveText: '0 Violations · WCAG 2.2 AAA Certified',
    rows: [
      { name: "AxeBuilder(page).include('#searchform').analyze() → 0 Violations", time: '41ms', delay: 920 },
      { name: "Color Contrast: 7:1 ratio verified across dark canvas (WCAG AAA)", time: '18ms', delay: 540 },
      { name: "ARIA & Landmarks: Combobox, listbox role & live regions valid", time: '12ms', delay: 480 },
      { name: "Keyboard Focus: Tab order navigable & focus visible ring", time: '24ms', delay: 650 },
      { name: "Screen Reader Audit: Explicit labels on search & mic buttons", time: '16ms', delay: 380 }
    ],
    ascii: `    _     _   _  __   __
   / \\   / | / | \\ \\ / /
  / _ \\  | | | |  \\ V / 
 / ___ \\ | | | |   | |  
/_/   \\_\\_|_|_|_|  |_|  
  ────────────────────────────────────────────────────────
  ✔ Engine: @axe-core/playwright v4.10
  ✔ Target: WCAG 2.2 Level AA / AAA Compliant
  ✔ Audit: Zero automated or semi-automated violations
  ✔ Accessibility Tree: 100% compliant landmarks & roles`
  },
  cicd: {
    title: 'google-testing-pipeline.yml',
    liveText: 'GitHub Actions #1420 · Green Gate',
    rows: [
      { name: 'Lint & Typecheck: Strict ESM & TypeScript validation', time: '11s', delay: 550 },
      { name: 'Parallel Matrix: Sharded on 4 Linux VM workers', time: '52s', delay: 1100 },
      { name: 'Cross-Browser: Chromium, Firefox & WebKit headless', time: '1m 14s', delay: 920 },
      { name: 'Quality Gate: Automatic green light for deploy', time: '2s', delay: 380 }
    ],
    ascii: `    ____ _____ ____  _____ _     ___ _   _ _____ 
   |  _ \\_   _|  _ \\| ____| |   |_ _| \\ | | ____|
   | |_) || | | |_) |  _| | |    | ||  \\| |  _|  
   |  __/ | | |  __/| |___| |___ | || |\\  | |___ 
   |_|    |_| |_|   |_____|_____|___|_| \\_|_____|
  ───────────────────────────────────────────────
  ✔ Automated PR Gating: Passed
  ✔ Parallel matrix: Sharded on 4 Linux workers
  ✔ Status: Ready for Production Push`
  },
  perf: {
    title: 'google-performance-audit.spec.ts',
    liveText: 'Lighthouse Score: 100/100 · 0.24s',
    rows: [
      { name: 'Largest Contentful Paint (LCP): 0.65s (Good < 2.5s)', time: '15ms', delay: 750 },
      { name: 'Interaction to Next Paint (INP): 24ms (Good < 200ms)', time: '10ms', delay: 420 },
      { name: 'Cumulative Layout Shift (CLS): 0.00 (Zero layout jump)', time: '8ms', delay: 310 },
      { name: 'Time to Interactive (TTI): 0.8s · Total Blocking: 0ms', time: '14ms', delay: 580 }
    ],
    ascii: `  ____  _____ ____  _____ 
 |  _ \\| ____|  _ \\|  ___|
 | |_) |  _| | |_) | |_   
 |  __/| |___|  _ <|  _|  
 |_|   |_____|_| \\_\\_|    
  ──────────────────────────────────────────────
  ✔ Lighthouse Performance: 100/100
  ✔ LCP: 0.65s (Good < 2.5s)
  ✔ INP: 24ms (Good < 200ms)
  ✔ CLS: 0.00 (Zero layout shift)`
  }
};

// Aliases for backward compatibility
scenarios.visual = scenarios.a11y;
scenarios.vitals = scenarios.perf;

const pills = document.querySelectorAll('.pill[data-scenario]');
const scenarioTitleEl = document.getElementById('active-scenario-title');
const demoLiveTextEl = document.getElementById('demo-live-text');
const consoleAsciiEl = document.getElementById('console-ascii');
const testRowsContainer = document.getElementById('test-rows-container');

let activeTestRunId = 0;

function runScenarioAnimation(key) {
  const data = scenarios[key];
  if (!data || !testRowsContainer) return;

  const runId = ++activeTestRunId;
  const rows = data.rows;
  const total = rows.length;

  if (scenarioTitleEl) {
    scenarioTitleEl.innerHTML = `<span class="badge-spec">SPEC</span><span>${data.title}</span>`;
  }

  // Update right-side Google view matching active test scenario
  const targetViewKey = (key === 'visual' ? 'a11y' : (key === 'vitals' ? 'perf' : key));
  const rightViews = document.querySelectorAll('.g-scenario-view');
  rightViews.forEach(v => {
    v.classList.toggle('active', v.getAttribute('data-view') === targetViewKey);
  });

  // Render initial queued states with first test in RUNS
  testRowsContainer.innerHTML = rows.map((r, i) => `
    <div class="test-row ${i === 0 ? 'is-running' : 'is-queued'}" id="tr-${runId}-${i}">
      <span class="test-name">
        <span class="${i === 0 ? 'badge-runs' : 'badge-queued'}" data-badge="true">${i === 0 ? 'RUNS' : 'WAIT'}</span>
        <span>${r.name}</span>
      </span>
      <span class="test-time">${i === 0 ? '...' : '--'}</span>
    </div>
  `).join('');

  if (demoLiveTextEl) {
    demoLiveTextEl.innerHTML = `<span>0/${total} Passed</span> <span style="opacity:0.6;">· Running...</span>`;
  }

  const demoLiveContainer = demoLiveTextEl ? demoLiveTextEl.closest('.demo-live') : null;
  if (demoLiveContainer) demoLiveContainer.classList.remove('has-fail');

  // Random occasional failure ("menos que pass pero de vez en cuando"):
  // ~28% probability that exactly one step fails in this suite run.
  const hasFailure = Math.random() < 0.28;
  const failedStepIndex = hasFailure ? (1 + Math.floor(Math.random() * (rows.length - 1))) : -1;

  if (consoleAsciiEl) {
    consoleAsciiEl.textContent = data.ascii;
    consoleAsciiEl.classList.remove('ascii-ready', 'ascii-failed');
    consoleAsciiEl.classList.add('ascii-pending');
  }

  let passedCount = 0;
  let failedCount = 0;
  let index = 0;

  function advanceStep() {
    if (runId !== activeTestRunId) return; // Clean cancel if user clicked another pill

    const isFailed = (index === failedStepIndex);
    const currentRow = document.getElementById(`tr-${runId}-${index}`);
    if (currentRow) {
      currentRow.classList.remove('is-running', 'is-queued');
      if (isFailed) {
        currentRow.classList.add('is-failed');
        failedCount++;
      } else {
        currentRow.classList.add('is-passed');
        passedCount++;
      }

      // Use data-badge attribute so class replacements never prevent future queries
      const badge = currentRow.querySelector('[data-badge]');
      if (badge) {
        if (isFailed) {
          badge.className = 'badge-fail';
          badge.textContent = 'FAIL';
        } else {
          badge.className = 'badge-pass';
          badge.textContent = 'PASS';
        }
      }

      const timeEl = currentRow.querySelector('.test-time');
      if (timeEl) {
        timeEl.textContent = rows[index].time;
      }
    }

    index++;

    if (index < total) {
      if (demoLiveTextEl) {
        if (failedCount > 0) {
          demoLiveTextEl.innerHTML = `<span style="color:var(--emerald);">${passedCount} Passed</span> · <span style="color:#f87171;">${failedCount} Failed</span> <span style="opacity:0.6;">· Running...</span>`;
        } else {
          demoLiveTextEl.innerHTML = `<span>${passedCount}/${total} Passed</span> <span style="opacity:0.6;">· Running...</span>`;
        }
      }

      const nextRow = document.getElementById(`tr-${runId}-${index}`);
      if (nextRow) {
        nextRow.classList.remove('is-queued');
        nextRow.classList.add('is-running');

        const nextBadge = nextRow.querySelector('[data-badge]');
        if (nextBadge) {
          nextBadge.className = 'badge-runs';
          nextBadge.textContent = 'RUNS';
        }

        const nextTime = nextRow.querySelector('.test-time');
        if (nextTime) nextTime.textContent = '...';
      }

      // Variable realistic delay for each specific test step!
      const stepDelay = rows[index].delay || 600;
      setTimeout(advanceStep, stepDelay);
    } else {
      // Completed all tests!
      if (demoLiveTextEl) {
        if (failedCount > 0) {
          demoLiveTextEl.innerHTML = `<span style="color:var(--emerald);">${passedCount}/${total} Passed</span> · <span style="color:#f87171;">${failedCount} Failed</span> <span style="opacity:0.6;">· Flaky captured</span>`;
          if (demoLiveContainer) demoLiveContainer.classList.add('has-fail');
        } else {
          demoLiveTextEl.textContent = data.liveText;
        }
      }

      if (consoleAsciiEl) {
        consoleAsciiEl.classList.remove('ascii-pending');
        if (failedCount > 0) {
          consoleAsciiEl.textContent = `  _____ _    ___ _     
 |  ___/ \\  |_ _| |    
 | |_ / _ \\  | || |    
 |  _/ ___ \\ | || |___ 
 |_|/_/   \\_\\___|_____|
  ─────────────────────────────────────────────
  ✖ Spec failed: 1 failure captured (flakiness / timeout)
  ✔ Automatic retry: 1/3 triggered in CI
  ✔ Artifacts: trace.playwright.dev, error-diff.png`;
          consoleAsciiEl.classList.remove('ascii-ready');
          consoleAsciiEl.classList.add('ascii-failed');
        } else {
          consoleAsciiEl.textContent = data.ascii;
          consoleAsciiEl.classList.remove('ascii-failed');
          consoleAsciiEl.classList.add('ascii-ready');
        }
      }
    }
  }

  // Realistic initial delay for the first step (e.g. navigation / startup)
  const initialDelay = rows[0].delay || 900;
  setTimeout(advanceStep, initialDelay);
}

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach((p) => {
      p.setAttribute('aria-selected', 'false');
      p.setAttribute('aria-pressed', 'false');
    });
    pill.setAttribute('aria-selected', 'true');
    pill.setAttribute('aria-pressed', 'true');

    const key = pill.getAttribute('data-scenario');
    runScenarioAnimation(key);
  });
});

// Always ensure pure dark theme
document.documentElement.removeAttribute('data-theme');
localStorage.removeItem('preferred-theme');


// --- 5. Swarm Cursors Integration (Official DhvanilPatel/swarm-cursors engine) ---
const replayBtn = document.getElementById('replay-swarm-btn');
if (replayBtn) {
  replayBtn.addEventListener('click', () => {
    resetTypewriter();
    if (window.__swarmRebuild) {
      window.__swarmRebuild.restart();
    }
  });
}

// When swarm agents finish typing the hero heading, start active typewriter animation
window.addEventListener('swarm:heading-done', () => {
  startTypewriter(1600);
});

// --- 6. Initial Mode Selection (Agents vs Normal View) ---
const modeOverlay = document.getElementById('mode-select-overlay');
const btnModeAgent = document.getElementById('btn-mode-agent');
const btnModeNormal = document.getElementById('btn-mode-normal');
const cardModeAgent = document.getElementById('mode-agent-card');
const cardModeNormal = document.getElementById('mode-normal-card');

let modeChosen = false;

function launchAgentsMode() {
  if (modeChosen) return;
  modeChosen = true;
  resetTypewriter();
  if (modeOverlay) {
    modeOverlay.classList.add('closing');
    modeOverlay.remove();
  }
  if (window.__swarmRebuild) {
    window.__swarmRebuild.start();
  }
  // Fallback in case swarm:heading-done isn't caught
  setTimeout(() => {
    if (!isTypingActive) startTypewriter(1500);
  }, 4500);
}

// When swarm agents finish rebuilding the site, start the QA test runner animation
window.addEventListener('swarm:done', () => {
  setTimeout(() => {
    runScenarioAnimation('e2e');
  }, 400);
});

function launchNormalMode() {
  if (modeChosen) return;
  modeChosen = true;
  if (modeOverlay) {
    modeOverlay.classList.add('closing');
    setTimeout(() => {
      if (modeOverlay.parentNode) modeOverlay.remove();
    }, 300);
  }
  // Start test runner animation ONLY when the user explicitly chooses to enter the view!
  setTimeout(() => {
    runScenarioAnimation('e2e');
  }, 450);
  // Start typewriter in normal mode
  startTypewriter(1800);
}

if (btnModeAgent) {
  btnModeAgent.addEventListener('click', (e) => {
    e.stopPropagation();
    launchAgentsMode();
  });
}
if (cardModeAgent) {
  cardModeAgent.addEventListener('click', () => {
    launchAgentsMode();
  });
}

if (btnModeNormal) {
  btnModeNormal.addEventListener('click', (e) => {
    e.stopPropagation();
    launchNormalMode();
  });
}
if (cardModeNormal) {
  cardModeNormal.addEventListener('click', () => {
    launchNormalMode();
  });
}

// Keyboard shortcuts: 1 for Agents, 2 or Escape for Normal
window.addEventListener('keydown', (e) => {
  if (modeChosen || !document.getElementById('mode-select-overlay')) return;
  if (e.key === '1') {
    launchAgentsMode();
  } else if (e.key === '2' || e.key === 'Escape') {
    launchNormalMode();
  }
});

// --- 7. Project Preview Image Slider Engine (Scalable across all cards) ---
function initProjectSliders() {
  const sliders = document.querySelectorAll('.project-preview--slider');
  sliders.forEach((slider) => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-arrow--prev');
    const nextBtn = slider.querySelector('.slider-arrow--next');
    const dots = slider.querySelectorAll('.slider-dot');
    const counter = slider.querySelector('.slider-counter');
    const soundBtn = slider.querySelector('.slider-sound-btn');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update counter / caption
      if (counter) {
        const activeSlide = slides[currentIndex];
        const caption = activeSlide ? activeSlide.getAttribute('data-caption') : '';
        counter.textContent = caption || `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
      }

      // Update dots
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Manage video playback if slides contain videos
      slides.forEach((slide, idx) => {
        const vid = slide.querySelector('video');
        if (vid) {
          if (idx === currentIndex) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        }
      });

      // Sound button visibility
      if (soundBtn) {
        const currentSlideHasVideo = !!slides[currentIndex]?.querySelector('video');
        soundBtn.classList.toggle('is-hidden', !currentSlideHasVideo);
      }
    }

    // Initialize first slide state
    goToSlide(0);

    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeVideo = slides[currentIndex]?.querySelector('video');
        if (activeVideo) {
          activeVideo.muted = !activeVideo.muted;
          const muteIcon = soundBtn.querySelector('.sound-icon-mute');
          const unmuteIcon = soundBtn.querySelector('.sound-icon-unmute');
          if (muteIcon && unmuteIcon) {
            muteIcon.style.display = activeVideo.muted ? 'block' : 'none';
            unmuteIcon.style.display = activeVideo.muted ? 'none' : 'block';
          }
          soundBtn.title = activeVideo.muted ? 'Activar sonido' : 'Silenciar sonido';
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-slide-to') || '0', 10);
        goToSlide(targetIndex);
      });
    });

    // Keyboard navigation when slider is focused
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
        e.preventDefault();
      }
    });

    // Touch swipe support on mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => {
      if (e.touches[0]) touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      }
    }, { passive: true });
  });
}

initProjectSliders();



