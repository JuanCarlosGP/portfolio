export const AGENT_COLORS = [
  '#10b981', // 0. Emerald (Default brand)
  '#0d99ff', // 1. Electric Blue
  '#a259ff', // 2. Purple
  '#f24e1e', // 3. Coral / Orange-Red
  '#ffc700', // 4. Amber / Yellow
  '#0acf83', // 5. Mint
  '#e8467c', // 6. Pink / Magenta
  '#ff8a00', // 7. Warm Orange
  '#00b5ce', // 8. Cyan
  '#9747ff', // 9. Deep Violet
  '#1abcfe', // 10. Sky Blue
  '#ff7262', // 11. Salmon
];

const ARROW_D =
  'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z';

export function buildCursorSvg(color: string, scale = 1): string {
  const transform =
    scale !== 1
      ? ` transform="translate(5 3.5) scale(${scale}) translate(-5 -3.5)"`
      : '';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">` +
    `<path d="${ARROW_D}" transform="translate(0.5 1.5)" fill="rgba(0,0,0,0.35)"/>` +
    `<path d="${ARROW_D}" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"${transform}/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 5 4`;
}

let currentIndex = 0;

export function getCursorColorIndex(): number {
  return currentIndex;
}

export function applyCursorColor(index: number) {
  currentIndex = ((index % AGENT_COLORS.length) + AGENT_COLORS.length) % AGENT_COLORS.length;
  const color = AGENT_COLORS[currentIndex];

  const defCursor = `${buildCursorSvg(color, 1)}, auto`;
  const ptrCursor = `${buildCursorSvg(color, 1)}, pointer`;
  const actCursor = `${buildCursorSvg(color, 0.88)}, pointer`;

  const root = document.documentElement;
  root.style.setProperty('--cursor-default', defCursor);
  root.style.setProperty('--cursor-pointer', ptrCursor);
  root.style.setProperty('--cursor-active', actCursor);

  try {
    sessionStorage.setItem('portfolio-cursor-idx', String(currentIndex));
  } catch (_) {}
}

export function nextCursorColor() {
  applyCursorColor(currentIndex + 1);
}

export function initCursorPalette() {
  let initial = 0;
  try {
    const saved = sessionStorage.getItem('portfolio-cursor-idx');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!Number.isNaN(parsed)) initial = parsed;
    }
  } catch (_) {}

  applyCursorColor(initial);

  window.addEventListener(
    'pointerdown',
    (e: PointerEvent) => {
      // Only change on primary left click
      if (e.button === 0) {
        nextCursorColor();
      }
    },
    { passive: true }
  );
}
