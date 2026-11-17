import { resetTypewriter, startTypewriter } from './typewriter';
import { runScenarioAnimation } from './scenario-runner';

let initialRunTimeout: ReturnType<typeof setTimeout> | null = null;

export function cancelPendingInitialRun() {
  if (initialRunTimeout) {
    clearTimeout(initialRunTimeout);
    initialRunTimeout = null;
  }
}

export function initModeModal() {
  const modeOverlay = document.getElementById('mode-select-overlay');
  const btnModeAgent = document.getElementById('btn-mode-agent');
  const btnModeNormal = document.getElementById('btn-mode-normal');
  const cardModeAgent = document.getElementById('mode-agent-card');
  const cardModeNormal = document.getElementById('mode-normal-card');
  const replayBtn = document.getElementById('replay-swarm-btn');

  let modeChosen = false;

  function launchAgentsMode() {
    if (modeChosen) return;
    modeChosen = true;
    resetTypewriter();
    if (modeOverlay) {
      modeOverlay.classList.add('closing');
      modeOverlay.remove();
    }
    if ((window as any).__swarmRebuild) {
      (window as any).__swarmRebuild.start();
    }
    setTimeout(() => {
      startTypewriter(1500);
    }, 4500);
  }

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
    initialRunTimeout = setTimeout(() => {
      runScenarioAnimation('e2e');
      initialRunTimeout = null;
    }, 450);
    // Start typewriter in normal mode
    startTypewriter(1800);
  }

  // If no initial mode overlay exists in DOM, launch normal mode directly by default!
  if (!modeOverlay) {
    launchNormalMode();
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

  // Keyboard accessibility: 1 for Agents, 2 for Normal, Escape for Normal
  window.addEventListener('keydown', (e) => {
    if (modeChosen) return;
    if (e.key === '1') {
      launchAgentsMode();
    } else if (e.key === '2' || e.key === 'Escape') {
      launchNormalMode();
    }
  });

  // Replay Swarm Rebuild button in the top navigation bar
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      resetTypewriter();
      if ((window as any).__swarmRebuild) {
        if ((window as any).__swarmRebuild.app) {
          (window as any).__swarmRebuild.restart();
        } else {
          (window as any).__swarmRebuild.start();
        }
      }
      setTimeout(() => {
        startTypewriter(1500);
      }, 4500);
    });
  }
}
