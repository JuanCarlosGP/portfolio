import { cancelPendingInitialRun } from './mode-modal';

export interface TestRow {
  name: string;
  time: string;
  delay: number;
}

export interface ScenarioDefinition {
  title: string;
  liveText: string;
  rows: TestRow[];
  ascii: string;
}

export const scenarios: Record<string, ScenarioDefinition> = {
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
    ascii: `  ____   _    ____ ____  _____ ____  
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
    ascii: `     _    ____ ___ 
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
      { name: "ARIA & Landmarks: Combobox, listbox role & live regions valid", time: '480ms', delay: 480 },
      { name: "Keyboard Focus: Tab order navigable & focus visible ring", time: '24ms', delay: 650 },
      { name: "Screen Reader Audit: Explicit labels on search & mic buttons", time: '16ms', delay: 380 }
    ],
    ascii: `     _    _ ___   __
    / \\  / / \\ \\ / /
   / _ \\ | | |\\ V / 
  / ___ \\| | | | |  
 /_/   \\_\\_|_| |_|  
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
    ascii: `  ____ ___ ____  _____ _     ___ _   _ _____ 
 |  _ \\_ _|  _ \\| ____| |   |_ _| \\ | | ____|
 | |_) | || |_) |  _| | |    | ||  \\| |  _|  
 |  __/| ||  __/| |___| |___ | || |\\  | |___ 
 |_|  |___|_|   |_____|_____|___|_| \\_|_____|
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
      { name: 'Cumulative Layout Shift (CLS): 0.00 (Zero layout shift)', time: '8ms', delay: 310 },
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

let activeTestRunId = 0;

export function runScenarioAnimation(key: string) {
  if (key !== 'e2e') {
    cancelPendingInitialRun();
  }
  const data = scenarios[key];
  const testRowsContainer = document.getElementById('test-rows-container');
  if (!data || !testRowsContainer) return;

  const runId = ++activeTestRunId;
  const rows = data.rows;
  const total = rows.length;

  const scenarioTitleEl = document.getElementById('active-scenario-title');
  if (scenarioTitleEl) {
    scenarioTitleEl.innerHTML = `<span class="badge-spec">SPEC</span><span>${data.title}</span>`;
  }

  // Update right-side Google view matching active test scenario
  const targetViewKey = key === 'visual' ? 'a11y' : key === 'vitals' ? 'perf' : key;
  const rightViews = document.querySelectorAll('.g-scenario-view');
  rightViews.forEach((v) => {
    v.classList.toggle('active', v.getAttribute('data-view') === targetViewKey);
  });

  // Render initial queued states with first test in RUNS
  testRowsContainer.innerHTML = rows
    .map(
      (r, i) => `
    <div class="test-row ${i === 0 ? 'is-running' : 'is-queued'}" id="tr-${runId}-${i}">
      <span class="test-name">
        <span class="${i === 0 ? 'badge-runs' : 'badge-queued'}" data-badge="true">${i === 0 ? 'RUNS' : 'WAIT'}</span>
        <span>${r.name}</span>
      </span>
      <span class="test-time">${i === 0 ? '...' : '--'}</span>
    </div>
  `
    )
    .join('');

  const demoLiveTextEl = document.getElementById('demo-live-text');
  if (demoLiveTextEl) {
    demoLiveTextEl.innerHTML = `<span>0/${total} Passed</span> <span style="opacity:0.6;">· Running...</span>`;
  }

  const demoLiveContainer = demoLiveTextEl ? demoLiveTextEl.closest('.demo-live') : null;
  if (demoLiveContainer) demoLiveContainer.classList.remove('has-fail');

  const hasFailure = Math.random() < 0.28;
  const failedStepIndex = hasFailure ? 1 + Math.floor(Math.random() * (rows.length - 1)) : -1;

  const consoleAsciiEl = document.getElementById('console-ascii');
  if (consoleAsciiEl) {
    consoleAsciiEl.textContent = data.ascii;
    consoleAsciiEl.classList.remove('ascii-ready', 'ascii-failed');
    consoleAsciiEl.classList.add('ascii-pending');
  }

  let passedCount = 0;
  let failedCount = 0;
  let index = 0;

  function advanceStep() {
    if (runId !== activeTestRunId) return;

    const isFailed = index === failedStepIndex;
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

      const stepDelay = rows[index].delay || 600;
      setTimeout(advanceStep, stepDelay);
    } else {
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

  const initialDelay = rows[0].delay || 900;
  setTimeout(advanceStep, initialDelay);
}

export function initScenarioPills() {
  const pills = document.querySelectorAll('.pill[data-scenario]');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => {
        p.setAttribute('aria-selected', 'false');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.setAttribute('aria-selected', 'true');
      pill.setAttribute('aria-pressed', 'true');

      const key = pill.getAttribute('data-scenario');
      if (key) {
        runScenarioAnimation(key);
      }
    });
  });
}
