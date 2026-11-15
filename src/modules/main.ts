import { initCompareSlider } from './compare-slider';
import { initScenarioPills } from './scenario-runner';
import { initProjectSliders } from './psp-slider';
import { initModeModal } from './mode-modal';

export function initApp() {
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('preferred-theme');

  initCompareSlider();
  initScenarioPills();
  initProjectSliders();
  initModeModal();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
