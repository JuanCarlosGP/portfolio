export const phrasesByLang: Record<'en' | 'es', string[]> = {
  en: [
    'robust test suites.',
    'fast E2E runs.',
    'clean QA architectures.',
    'deterministic fixtures.',
    'reliable CI/CD gates.'
  ],
  es: [
    'suites de test robustas.',
    'ejecuciones E2E.',
    'arquitecturas de QA limpias.',
    'fixtures deterministas.',
    'compuertas de CI/CD fiables.'
  ]
};

export let phrases = phrasesByLang.en;

let phraseIndex = 0;
let charIndex = phrases[0].length;
let isDeleting = true;
const typingSpeed = 70;
let isTypingActive = false;
let typeTimer: ReturnType<typeof setTimeout> | null = null;

function setTypedContent(text: string) {
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    typedEl.textContent = text;
  }
  if ((window as any).__swarmRoot) {
    const swarmEls = (window as any).__swarmRoot.querySelectorAll('#typed');
    swarmEls.forEach((el: HTMLElement) => {
      el.textContent = text;
    });
  }
}

export function updateTypewriterPhrases(lang: 'en' | 'es') {
  phrases = phrasesByLang[lang] || phrasesByLang.en;
  phraseIndex = 0;
  charIndex = phrases[0].length;
  isDeleting = true;
  setTypedContent(phrases[0]);
}

export function resetTypewriter() {
  if (typeTimer) clearTimeout(typeTimer);
  isTypingActive = false;
  phraseIndex = 0;
  charIndex = phrases[0].length;
  isDeleting = true;
  setTypedContent(phrases[0]);
}

export function startTypewriter(delay = 0) {
  if (typeTimer) clearTimeout(typeTimer);
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

  const speed = isDeleting ? 35 : typingSpeed + (Math.random() * 20 - 10);
  typeTimer = setTimeout(typeLoop, speed);
}
