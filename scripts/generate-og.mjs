import { chromium } from 'playwright';
import fs from 'fs';

const avatarBase64 = fs.readFileSync('/home/jcmdfk/dev/port/public/avatar.png').toString('base64');

const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #07070a;
      color: #f4f4f6;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* CAD Grid lines */
    .cad-grid {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 48px 48px,
        linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 48px 48px;
      pointer-events: none;
    }

    /* Blueprint border frame */
    .outer-frame {
      position: absolute;
      inset: 20px;
      border: 1px solid rgba(255,255,255,0.14);
      display: flex;
      flex-direction: column;
      background: rgba(7, 7, 10, 0.94);
      border-radius: 4px;
    }

    /* Crosshairs */
    .outer-frame::before {
      content: "+";
      position: absolute;
      top: -8px;
      left: -6px;
      font-family: "Geist Mono", monospace;
      font-size: 15px;
      color: rgba(255,255,255,0.45);
      line-height: 1;
    }
    .outer-frame::after {
      content: "+";
      position: absolute;
      bottom: -8px;
      right: -6px;
      font-family: "Geist Mono", monospace;
      font-size: 15px;
      color: rgba(255,255,255,0.45);
      line-height: 1;
    }

    /* Top header bar */
    .card-top {
      height: 48px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      color: #888894;
      letter-spacing: 0.06em;
      background: rgba(255,255,255,0.02);
    }

    .top-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-pill {
      background: #d0bcf7;
      color: #07070a;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 10.5px;
      font-family: "Geist Mono", monospace;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      display: inline-block;
    }

    .card-main {
      flex: 1;
      display: grid;
      grid-template-columns: 1.18fr 1fr;
      overflow: hidden;
    }

    /* Left column */
    .left-col {
      padding: 34px 38px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 1px solid rgba(255,255,255,0.1);
    }

    .profile-row {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .avatar-ring {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      padding: 2.5px;
      background: linear-gradient(135deg, rgba(208, 188, 247, 0.8), rgba(16, 185, 129, 0.6));
      box-shadow: 0 0 28px rgba(208, 188, 247, 0.3);
      flex-shrink: 0;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }

    .profile-meta h1 {
      font-size: 25px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .profile-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: "Geist Mono", monospace;
      font-size: 10.5px;
      color: #10b981;
      font-weight: 600;
      margin-top: 5px;
      letter-spacing: 0.05em;
    }

    .hero-title {
      font-size: 35px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 20px 0 12px;
      color: #ffffff;
    }

    .hero-title .highlight {
      color: #d0bcf7;
    }

    .hero-sub {
      font-size: 14.5px;
      line-height: 1.55;
      color: #9ba0aa;
      max-width: 530px;
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 20px;
    }

    .tag-chip {
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      font-weight: 600;
      padding: 5px 11px;
      border-radius: 4px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.12);
      color: #e2e4e9;
    }

    .tag-chip.accent {
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.35);
      color: #10b981;
    }

    /* Right column: Interactive Test Studio Mockup */
    .right-col {
      background: #09090d;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .studio-chrome {
      height: 40px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.025);
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Geist Mono", monospace;
      font-size: 10.5px;
      color: #888894;
    }

    .dots {
      display: flex;
      gap: 6px;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }

    .terminal-body {
      flex: 1;
      padding: 24px;
      font-family: "Geist Mono", monospace;
      font-size: 11.5px;
      line-height: 1.65;
      color: #c9cdd4;
      background: #08080c;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .term-line {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .badge-runs {
      background: #0d99ff;
      color: #fff;
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 3px;
    }

    .badge-pass {
      background: #10b981;
      color: #07070a;
      font-size: 9.5px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 3px;
    }

    .passed-banner {
      border: 1px solid rgba(16, 185, 129, 0.35);
      background: rgba(16, 185, 129, 0.06);
      border-radius: 6px;
      padding: 16px 20px;
      margin-top: 16px;
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.1);
    }

    .passed-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #10b981;
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .passed-items {
      margin-top: 10px;
      font-size: 11.5px;
      color: #a1a6b2;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .passed-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Bottom watermark bar */
    .card-bottom {
      height: 40px;
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      color: #6c707a;
      background: rgba(255,255,255,0.015);
    }

    .card-url {
      color: #d0bcf7;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="cad-grid"></div>
  <div class="outer-frame">
    <div class="card-top">
      <div class="top-left">
        <span class="brand-pill">JC</span>
        <span>JUAN CARLOS GUTIÉRREZ / QA</span>
        <span style="color: rgba(255,255,255,0.2)">|</span>
        <span style="display:flex; align-items:center; gap:6px;">
          <span class="status-dot"></span>
          <span style="color:#10b981; font-weight:600;">E2E TEST ARCHITECTURES &amp; CI/CD GATES</span>
        </span>
      </div>
      <div>MADRID, SPAIN · CET</div>
    </div>

    <div class="card-main">
      <div class="left-col">
        <div>
          <div class="profile-row">
            <div class="avatar-ring">
              <img class="avatar-img" src="data:image/png;base64,${avatarBase64}" alt="Juan Carlos Gutiérrez">
            </div>
            <div class="profile-meta">
              <h1>Juan Carlos Gutiérrez</h1>
              <div class="profile-badge">
                <span class="status-dot"></span>
                <span>QA AUTOMATION ENGINEER &amp; SDET</span>
              </div>
            </div>
          </div>

          <div class="hero-title">
            Engineering for<br>
            <span class="highlight">robust test suites.</span>
          </div>

          <p class="hero-sub">
            Specialist in Playwright, Maestro &amp; deterministic testing architectures that eliminate flakiness and accelerate production deployments.
          </p>
        </div>

        <div class="tags-row">
          <span class="tag-chip accent">Playwright E2E</span>
          <span class="tag-chip accent">Maestro Mobile</span>
          <span class="tag-chip">TypeScript</span>
          <span class="tag-chip">CI/CD Quality Gates</span>
          <span class="tag-chip">API Contract Tests</span>
          <span class="tag-chip">Hardware Tooling</span>
        </div>
      </div>

      <div class="right-col">
        <div class="studio-chrome">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div>INTERACTIVE TEST STUDIO · CHROMIUM</div>
          <div>SPEC #01</div>
        </div>

        <div class="terminal-body">
          <div>
            <div class="term-line" style="color: #6c707a; margin-bottom: 8px;">
              <span>$ npx playwright test --project=chromium</span>
            </div>
            <div class="term-line" style="margin-bottom: 8px;">
              <span class="badge-runs">RUNS</span>
              <span style="color: #fff;">tests/google-website-e2e.spec.ts</span>
            </div>
            <div class="term-line" style="color: #7b808a; font-size: 11px;">
              <span>› page.goto('https://www.google.com') [200 OK]</span>
            </div>
            <div class="term-line" style="color: #7b808a; font-size: 11px;">
              <span>› locator('textarea[name="q"]').fill('SDET Engineer')</span>
            </div>
            <div class="term-line" style="color: #7b808a; font-size: 11px;">
              <span>› expect(page).toHaveTitle(/Google/)</span>
            </div>
          </div>

          <div class="passed-banner">
            <div class="passed-title">
              <span class="badge-pass">PASS</span>
              <span>ALL 6/6 SPECS PASSED (1.4s)</span>
            </div>
            <div class="passed-items">
              <div class="passed-item">
                <span>✔ 0 flaky tests · 0 timeout leaks</span>
              </div>
              <div class="passed-item">
                <span>✔ Network mocks &amp; trace artifacts captured</span>
              </div>
              <div class="passed-item">
                <span>✔ CI/CD Quality Gate Status: <strong style="color:#10b981;">APPROVED</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-bottom">
      <div>AUTOMATED QUALITY ASSURANCE · ZERO-FLAKINESS TEST SUITES</div>
      <div><span class="card-url">https://juancarlosgp.github.io/portfolio/</span></div>
    </div>
  </div>
</body>
</html>
`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/jcmdfk/dev/port/public/og-image.png' });
  await page.screenshot({ path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/og_preview_card.png' });
  await browser.close();
  console.log('OG image successfully written to public/og-image.png');
})();
