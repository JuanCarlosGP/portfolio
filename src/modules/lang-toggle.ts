import { translations, type Lang } from '../data/translations';
import { updateTypewriterPhrases } from './typewriter';

export const LANG_STORAGE_KEY = 'portfolio-lang';
export const DEFAULT_LANG: Lang = 'en';

function getNestedValue(obj: any, path: string): string | undefined {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export function getCurrentLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  } catch (_) {}
  return DEFAULT_LANG;
}

export function setLanguage(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (_) {}

  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  const t = translations[lang] || translations.en;

  // Update text content
  const i18nElements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  i18nElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const val = getNestedValue(t, key);
      if (val !== undefined) {
        el.textContent = val;
      }
    }
  });

  // Update HTML content
  const i18nHtmlElements = document.querySelectorAll<HTMLElement>('[data-i18n-html]');
  i18nHtmlElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key) {
      const val = getNestedValue(t, key);
      if (val !== undefined) {
        el.innerHTML = val;
      }
    }
  });

  // Update attributes (e.g. data-i18n-attr="title:nav.fontToggleTitle,aria-label:nav.fontToggleAria")
  const i18nAttrElements = document.querySelectorAll<HTMLElement>('[data-i18n-attr]');
  i18nAttrElements.forEach((el) => {
    const attrPairs = el.getAttribute('data-i18n-attr')?.split(',') || [];
    attrPairs.forEach((pair) => {
      const [attrName, key] = pair.split(':').map((s) => s.trim());
      if (attrName && key) {
        const val = getNestedValue(t, key);
        if (val !== undefined) {
          el.setAttribute(attrName, val);
        }
      }
    });
  });

  // Update typewriter phrases
  updateTypewriterPhrases(lang);

  // Update all Lang toggle buttons UI
  const btns = document.querySelectorAll<HTMLElement>('.lang-toggle-btn, #lang-toggle-btn');
  btns.forEach((btn) => {
    btn.setAttribute('title', t.nav.langToggleTitle);
    btn.setAttribute('aria-label', t.nav.langToggleAria);
    const enOpt = btn.querySelector('[data-lang-opt="en"]');
    const esOpt = btn.querySelector('[data-lang-opt="es"]');
    if (enOpt && esOpt) {
      if (lang === 'en') {
        enOpt.classList.add('active');
        esOpt.classList.remove('active');
      } else {
        esOpt.classList.add('active');
        enOpt.classList.remove('active');
      }
    }
  });

  // Dispatch custom event for any listening components
  window.dispatchEvent(new CustomEvent('portfolio-lang-change', { detail: { lang } }));
}

export function initLangToggle() {
  // Initial language: read from storage, default to 'en'
  const initialLang = getCurrentLang();
  setLanguage(initialLang);

  const btns = document.querySelectorAll<HTMLElement>('.lang-toggle-btn, #lang-toggle-btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = getCurrentLang();
      const nextLang: Lang = current === 'en' ? 'es' : 'en';
      setLanguage(nextLang);
    });
  });
}
