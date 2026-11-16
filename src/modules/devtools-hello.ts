const GLYPHS: Record<string, string[]> = {
  Q: ['011110', '100001', '100001', '100101', '100011', '011111'],
  A: ['011110', '100001', '100001', '111111', '100001', '100001'],
  S: ['011111', '100000', '011110', '000001', '000001', '111110'],
  D: ['111110', '100001', '100001', '100001', '100001', '111110'],
  E: ['111111', '100000', '111110', '100000', '100000', '111111'],
  T: ['111111', '001100', '001100', '001100', '001100', '001100'],
  C: ['011110', '100001', '100000', '100000', '100001', '011110'],
  V: ['100001', '100001', '100001', '100001', '010010', '001100'],
};

function banner(text: string) {
  const height = 6;
  const rows = Array.from({ length: height }, () => '');
  for (const char of text) {
    const glyph = GLYPHS[char];
    if (!glyph) continue;
    for (let row = 0; row < height; row += 1) {
      rows[row] += [...glyph[row]].map((bit) => (bit === '1' ? '██' : '  ')).join('') + '  ';
    }
  }
  return rows.flatMap((row) => [row, row]);
}

function lines(es: boolean) {
  const note = es
    ? [
        '● QA AUTOMATION ENGINEER // SDET',
        'Juan Carlos Gutiérrez Pesquero · Madrid, ES',
        '────────────────────────────────────────────────────────',
        '¿Inspeccionando el DOM? Buen ojo técnico de QA / Dev.',
        'No hace falta buscar bugs aquí: la suite está en verde (0 errors, 0 flaky).',
        '',
        '📄 CV (PDF):   https://juancarlosgp.github.io/portfolio/Juan-Carlos-Gutierrez-CV.pdf',
        '💼 LinkedIn:   https://www.linkedin.com/in/juancarlosgutierrezpesquero/',
        '🐙 GitHub:     https://github.com/JuanCarlosGP',
        '✉️ Contacto:   juancarlosgp212@gmail.com',
      ]
    : [
        '● QA AUTOMATION ENGINEER // SDET',
        'Juan Carlos Gutiérrez Pesquero · Madrid, ES',
        '────────────────────────────────────────────────────────',
        'Inspecting the DOM? Good QA / Dev eye.',
        'No need to hunt for bugs here: test suite is all green (0 errors, 0 flaky).',
        '',
        '📄 CV (PDF):   https://juancarlosgp.github.io/portfolio/Juan-Carlos-Gutierrez-CV.pdf',
        '💼 LinkedIn:   https://www.linkedin.com/in/juancarlosgutierrezpesquero/',
        '🐙 GitHub:     https://github.com/JuanCarlosGP',
        '✉️ Contact:    juancarlosgp212@gmail.com',
      ];
  return ['', ...banner('QA'), '', ...note, ''];
}

let greeted = false;
function greetConsole(es: boolean) {
  if (greeted || typeof console === 'undefined') return;
  greeted = true;
  const badge = 'background:#10b981;color:#052e16;font-weight:bold;padding:2px 8px;border-radius:4px;font-family:monospace;';
  const heading = 'color:#10b981;font-weight:bold;font-size:12px;font-family:monospace;';
  const body = 'color:#9ca3af;font-size:11px;font-family:monospace;';
  const link = 'color:#38bdf8;font-size:11px;font-family:monospace;text-decoration:underline;';

  const title = 'QA AUTOMATION & SDET | Juan Carlos Gutiérrez';
  const subtitle = es
    ? '¿Buscando fallos o inspeccionando arquitectura? Test suite en verde (0 flaky).'
    : 'Hunting for bugs or inspecting architecture? Green test suite (0 flaky).';
  const cvLabel = es ? '📄 Descargar CV (PDF):' : '📄 Download CV (PDF):';

  console.log(
    `%cQA%c ${title}\n%c${subtitle}\n${cvLabel} %chttps://juancarlosgp.github.io/portfolio/Juan-Carlos-Gutierrez-CV.pdf\n%c💼 https://www.linkedin.com/in/juancarlosgutierrezpesquero/\n🐙 https://github.com/JuanCarlosGP`,
    badge,
    heading,
    body,
    link,
    link
  );
}

function paint() {
  const html = document.documentElement;
  const head = html.querySelector('head');
  if (!head) return;
  for (const node of [...html.childNodes]) {
    if (node.nodeType === Node.COMMENT_NODE) node.remove();
  }
  for (const line of lines(html.lang === 'es')) {
    html.insertBefore(document.createComment(` ${line} `), head);
  }
}

export function initDevtoolsHello() {
  paint();
  greetConsole(document.documentElement.lang === 'es');
  window.addEventListener('portfolio-lang-change', paint);
}

