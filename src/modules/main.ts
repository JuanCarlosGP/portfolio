import { initCompareSlider } from './compare-slider';
import { initScenarioPills } from './scenario-runner';
import { initProjectSliders } from './psp-slider';
import { initModeModal } from './mode-modal';
import { initFontToggle } from './font-toggle';
import { initLangToggle } from './lang-toggle';

export function initApp() {
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('preferred-theme');

  initLangToggle();
  initCompareSlider();
  initScenarioPills();
  initProjectSliders();
  initModeModal();
  initFontToggle();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
