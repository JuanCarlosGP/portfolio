const FONT_STORAGE_KEY = 'portfolio-font';

export function initFontToggle() {
  const btn = document.getElementById('font-toggle-btn');
  const label = document.getElementById('font-toggle-label');
  if (!btn) return;

  function setFont(font: 'pixel' | 'default') {
    const isEs = document.documentElement.lang === 'es';
    if (font === 'pixel') {
      document.documentElement.setAttribute('data-font', 'pixel');
      btn?.classList.add('active');
      if (label) label.textContent = 'Geist';
      btn?.setAttribute('title', isEs ? 'Cambiar a tipografía estándar (Geist)' : 'Switch to standard typography (Geist)');
      btn?.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-font');
      btn?.classList.remove('active');
      if (label) label.textContent = 'Pixel';
      btn?.setAttribute('title', isEs ? 'Cambiar a tipografía Geist Pixel' : 'Switch to Geist Pixel typography');
      btn?.setAttribute('aria-pressed', 'false');
    }
  }

  // Sync state on init
  const savedFont = (localStorage.getItem(FONT_STORAGE_KEY) as 'pixel' | 'default') || 'default';
  setFont(savedFont);

  btn.addEventListener('click', () => {
    const isPixel = document.documentElement.getAttribute('data-font') === 'pixel';
    const nextFont = isPixel ? 'default' : 'pixel';
    try {
      localStorage.setItem(FONT_STORAGE_KEY, nextFont);
    } catch (_) {}
    setFont(nextFont);
  });
}
