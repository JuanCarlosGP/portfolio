import { initCompareSlider } from './compare-slider';
import { initScenarioPills } from './scenario-runner';
import { initProjectSliders } from './psp-slider';
import { initModeModal } from './mode-modal';
import { initFontToggle } from './font-toggle';
import { initLangToggle } from './lang-toggle';
import { initLogoRail } from './logo-rail';
import { initDevtoolsHello } from './devtools-hello';
import { initCursorPalette } from './cursor-palette';
import { initVisitorClicker } from './visitor-clicker';
import { initPipelineRunner } from './pipeline-runner';
import { initContactForm } from './contact-form';

export function initApp() {
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('preferred-theme');

  initLangToggle();
  initCompareSlider();
  initScenarioPills();
  initProjectSliders();
  initModeModal();
  initFontToggle();
  initLogoRail();
  initDevtoolsHello();
  initCursorPalette();
  initVisitorClicker();
  initPipelineRunner();
  initContactForm();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
