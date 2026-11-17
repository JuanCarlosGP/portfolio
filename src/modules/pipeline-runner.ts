// src/modules/pipeline-runner.ts

interface TestItem {
  engine: 'chromium' | 'firefox' | 'webkit';
  name: string;
  duration: string;
}

const TEST_NAMES: string[] = [
  'Zero horizontal scrollbar overflow (strict CAD boundary)',
  'Metadata and Document Title integrity',
  'Custom Agent vector cursor is active and rotates colors on click',
  'Hero section renders profile, bio, and LinkedIn link in default English',
  'Language switcher toggles between English (default) and Spanish with persistence',
  'Mode selection modal language switcher is synchronized with portfolio language',
  'Interactive Test Studio comparison slider keyboard accessibility',
  'Scenario pills switch mockups and runner outputs',
  'PSP Hardware Tooling project slider cycles slides correctly',
  'Projects CAD grid renders active and mock projects correctly',
  'Gallery items and Lightbox interaction, Experience, Stack, and Contact sections exist',
  'Typography font toggle button alternates between default and Geist Pixel',
  'Navigation bar stays sticky at the top when scrolling',
  'DevTools Elements QA Easter egg is present in HTML comments and syncs with language',
  'Visual capture of language toggle states',
  'Visitor Clicker widget renders below Hero, displays counter, and increments count on click'
];

function generateTestMatrix(): TestItem[] {
  const engines: ('chromium' | 'firefox' | 'webkit')[] = ['chromium', 'firefox', 'webkit'];
  const matrix: TestItem[] = [];

  engines.forEach((engine) => {
    TEST_NAMES.forEach((name) => {
      const dur = (1.5 + Math.random() * 1.4).toFixed(1) + 's';
      matrix.push({ engine, name, duration: dur });
    });
  });

  // Shuffle slightly to mimic concurrent 6-worker distribution
  for (let i = matrix.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
  }

  return matrix;
}

export function initPipelineRunner() {
  const triggerBtn = document.getElementById('pipeline-trigger-btn');
  const overlay = document.getElementById('pipeline-modal-overlay');
  const closeBtn = document.getElementById('pipeline-modal-close');
  const dotClose = document.getElementById('pipeline-dot-close');
  const backdrop = document.getElementById('pipeline-modal-backdrop');
  const output = document.getElementById('pipeline-terminal-output');

  if (!triggerBtn || !overlay || !output) return;
  const modalOverlay = overlay;

  const progressBar = document.getElementById('pipeline-progress-bar');
  const progressText = document.getElementById('pipeline-progress-text');
  const elapsedDisplay = document.getElementById('pipeline-elapsed-time');
  const statusBadge = document.getElementById('pipeline-status-badge');
  const statusText = document.getElementById('pipeline-status-text');

  const pauseBtn = document.getElementById('pipeline-ctrl-pause');
  const pauseBtnText = document.getElementById('pipeline-ctrl-pause-text');
  const speedBtn = document.getElementById('pipeline-ctrl-speed');
  const speedBtnText = document.getElementById('pipeline-ctrl-speed-text');
  const skipBtn = document.getElementById('pipeline-ctrl-skip');
  const rerunBtn = document.getElementById('pipeline-ctrl-rerun');

  const stage1 = document.getElementById('pipeline-stage-1');
  const stage2 = document.getElementById('pipeline-stage-2');
  const stage3 = document.getElementById('pipeline-stage-3');
  const stageIcon1 = document.getElementById('pipeline-stage-icon-1');
  const stageIcon2 = document.getElementById('pipeline-stage-icon-2');
  const stageIcon3 = document.getElementById('pipeline-stage-icon-3');

  if (!triggerBtn || !overlay || !output) return;

  let isRunning = false;
  let isPaused = false;
  let speedMultiplier = 1; // 1x or 2.5x
  let currentStepIndex = 0;
  let testsList: TestItem[] = [];
  let streamTimer: number | null = null;
  let elapsedTimer: number | null = null;
  let startTime = 0;
  let pausedElapsed = 0;

  // 1. Fetch live GitHub Actions telemetry
  async function fetchGitHubStatus() {
    const ghStatus = document.getElementById('pipeline-gh-status');
    const ghCommit = document.getElementById('pipeline-gh-commit');
    const ghActionLink = document.getElementById('pipeline-gh-action-link') as HTMLAnchorElement | null;

    try {
      const res = await fetch('https://api.github.com/repos/JuanCarlosGP/portfolio/actions/runs?per_page=1');
      if (!res.ok) return;
      const data = await res.json();
      const latestRun = data.workflow_runs?.[0];
      if (!latestRun) return;

      const shaShort = latestRun.head_sha ? `#${latestRun.head_sha.slice(0, 7)}` : '#main';
      const isSuccess = latestRun.conclusion === 'success' || latestRun.status === 'in_progress';

      if (ghCommit) ghCommit.textContent = shaShort;
      if (ghStatus) {
        ghStatus.textContent = isSuccess ? 'GitHub Actions: Passing' : 'GitHub Actions: Ready';
      }
      if (ghActionLink && latestRun.html_url) {
        ghActionLink.href = latestRun.html_url;
      }
    } catch (_) {
      // Offline or rate-limited fallback
    }
  }

  fetchGitHubStatus();

  function updateElapsed() {
    if (!isRunning || isPaused) return;
    const now = Date.now();
    const totalMs = pausedElapsed + (now - startTime) * speedMultiplier;
    const sec = (totalMs / 1000).toFixed(1);
    if (elapsedDisplay) {
      elapsedDisplay.textContent = `00:${sec.padStart(4, '0')}s`;
    }
  }

  function appendLog(lineHtml: string) {
    if (!output) return;
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = lineHtml;
    output.appendChild(div);

    const screen = document.getElementById('pipeline-terminal-screen');
    if (screen) {
      screen.scrollTop = screen.scrollHeight;
    }
  }

  function resetState() {
    if (streamTimer) clearTimeout(streamTimer);
    if (elapsedTimer) clearInterval(elapsedTimer);
    isRunning = false;
    isPaused = false;
    currentStepIndex = 0;
    pausedElapsed = 0;
    if (output) output.innerHTML = '';
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = '0 / 48 passed';
    if (elapsedDisplay) elapsedDisplay.textContent = '00:00.0s';
    if (rerunBtn) rerunBtn.classList.add('is-hidden');
    if (pauseBtnText) pauseBtnText.textContent = 'Pause';

    if (stage1) stage1.className = 'pipeline-stage-item is-active';
    if (stage2) stage2.className = 'pipeline-stage-item';
    if (stage3) stage3.className = 'pipeline-stage-item';
    if (stageIcon1) stageIcon1.textContent = '✓';
    if (stageIcon2) stageIcon2.textContent = '⏳';
    if (stageIcon3) stageIcon3.textContent = '○';

    if (statusBadge) {
      statusBadge.className = 'pipeline-status-badge is-running';
      if (statusText) statusText.textContent = 'RUNNING...';
    }
  }

  function openModal() {
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    resetState();
    startPipeline();
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    if (streamTimer) clearTimeout(streamTimer);
    if (elapsedTimer) clearInterval(elapsedTimer);
    isRunning = false;
  }

  function startPipeline() {
    isRunning = true;
    isPaused = false;
    startTime = Date.now();
    testsList = generateTestMatrix();
    elapsedTimer = window.setInterval(updateElapsed, 100);

    // Initial CLI preamble
    appendLog('<span class="log-cyan">$ astro check &amp;&amp; astro build</span>');
    appendLog('<span class="log-dim">02:50:12 [types] Generated in 42ms</span>');
    appendLog('<span class="log-green">Result (46 files): 0 errors, 0 warnings, 0 hints</span>');
    appendLog('<span class="log-dim">02:50:14 [build] 1 page(s) built in 620ms ✓ Complete!</span>');
    appendLog('<span class="log-sep">------------------------------------------------------------</span>');
    appendLog('<span class="log-cyan">$ playwright test --reporter=list</span>');
    appendLog('<span class="log-white">Running 48 tests using 6 workers</span>\n');

    // Advance to Stage 02
    if (stage1) stage1.className = 'pipeline-stage-item is-done';
    if (stage2) stage2.className = 'pipeline-stage-item is-active';

    scheduleNextTest();
  }

  function scheduleNextTest() {
    if (!isRunning || isPaused) return;

    if (currentStepIndex >= testsList.length) {
      finishPipeline();
      return;
    }

    const item = testsList[currentStepIndex];
    const testNum = String(currentStepIndex + 1).padStart(2, ' ');
    const totalNum = testsList.length;

    // Engine badge formatting
    const engineColor = item.engine === 'chromium' ? 'log-engine-cr' : item.engine === 'firefox' ? 'log-engine-ff' : 'log-engine-wk';

    appendLog(
      `<span class="log-pass">✓</span> <span class="log-dim">${testNum}/${totalNum}</span> <span class="${engineColor}">[${item.engine}]</span> <span class="log-suite">SDET Quality Suite ›</span> <span class="log-test-name">${item.name}</span> <span class="log-dur">(${item.duration})</span>`
    );

    currentStepIndex++;

    // Update progress bar
    const pct = Math.round((currentStepIndex / totalNum) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${currentStepIndex} / ${totalNum} passed`;

    const baseDelay = 160 + Math.random() * 120;
    const delay = baseDelay / speedMultiplier;

    streamTimer = window.setTimeout(scheduleNextTest, delay);
  }

  function finishPipeline() {
    if (streamTimer) clearTimeout(streamTimer);
    if (elapsedTimer) clearInterval(elapsedTimer);
    isRunning = false;

    if (stage2) stage2.className = 'pipeline-stage-item is-done';
    if (stage3) stage3.className = 'pipeline-stage-item is-active is-done';
    if (stageIcon2) stageIcon2.textContent = '✓';
    if (stageIcon3) stageIcon3.textContent = '✓';

    if (progressBar) progressBar.style.width = '100%';
    if (progressText) progressText.textContent = '48 / 48 passed (100%)';

    appendLog('\n<span class="log-sep">============================================================</span>');
    appendLog('<span class="log-big-pass">  ✓ 48 passed (100%) · Zero Flaky · All Quality Gates Green</span>');
    appendLog('<span class="log-dim">  Artifacts generated: Playwright HTML Report &amp; GitHub Pages Bundle</span>');
    appendLog('<span class="log-green">  Exit Code: 0 (Success)</span>');

    if (statusBadge) {
      statusBadge.className = 'pipeline-status-badge is-passed';
      if (statusText) statusText.textContent = 'PASSED (Exit 0)';
    }

    if (rerunBtn) rerunBtn.classList.remove('is-hidden');
  }

  function skipToEnd() {
    if (!isRunning) return;
    if (streamTimer) clearTimeout(streamTimer);

    while (currentStepIndex < testsList.length) {
      const item = testsList[currentStepIndex];
      const testNum = String(currentStepIndex + 1).padStart(2, ' ');
      const engineColor = item.engine === 'chromium' ? 'log-engine-cr' : item.engine === 'firefox' ? 'log-engine-ff' : 'log-engine-wk';
      appendLog(
        `<span class="log-pass">✓</span> <span class="log-dim">${testNum}/48</span> <span class="${engineColor}">[${item.engine}]</span> <span class="log-suite">SDET Quality Suite ›</span> <span class="log-test-name">${item.name}</span> <span class="log-dur">(${item.duration})</span>`
      );
      currentStepIndex++;
    }

    finishPipeline();
  }

  // Event Listeners
  triggerBtn.addEventListener('click', openModal);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dotClose) dotClose.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (modalOverlay.style.display !== 'none' && e.key === 'Escape') {
      closeModal();
    }
  });

  // Pause / Resume
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (!isRunning) return;
      isPaused = !isPaused;
      if (isPaused) {
        if (pauseBtnText) pauseBtnText.textContent = 'Resume';
        if (streamTimer) clearTimeout(streamTimer);
        pausedElapsed += (Date.now() - startTime) * speedMultiplier;
      } else {
        if (pauseBtnText) pauseBtnText.textContent = 'Pause';
        startTime = Date.now();
        scheduleNextTest();
      }
    });
  }

  // Speed Toggle (1x <-> 2.5x)
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      speedMultiplier = speedMultiplier === 1 ? 2.8 : 1;
      if (speedBtnText) {
        speedBtnText.textContent = speedMultiplier === 1 ? '2x Speed' : '1x Speed';
      }
    });
  }

  // Skip
  if (skipBtn) {
    skipBtn.addEventListener('click', skipToEnd);
  }

  // Rerun
  if (rerunBtn) {
    rerunBtn.addEventListener('click', () => {
      resetState();
      startPipeline();
    });
  }
}
