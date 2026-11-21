import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const LOCAL_ARTIFACTS_DIR = process.env.ARTIFACTS_DIR;

function getScreenshotPath(filename: string, testInfo?: { outputPath: (name: string) => string }): string {
  let targetPath: string;
  if (LOCAL_ARTIFACTS_DIR && fs.existsSync(LOCAL_ARTIFACTS_DIR)) {
    targetPath = path.join(LOCAL_ARTIFACTS_DIR, filename);
  } else if (testInfo) {
    targetPath = testInfo.outputPath(filename);
  } else {
    targetPath = path.join(process.cwd(), 'test-results', 'screenshots', filename);
  }
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return targetPath;
}

test.describe('Portfolio Astro Architecture & SDET Quality Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Metadata and Document Title integrity', async ({ page }) => {
    await expect(page).toHaveTitle(/Juan Carlos Gutiérrez Pesquero/);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute(
      'content',
      /QA Automation Engineer \/ SDET/
    );

    const metaNoTranslate = page.locator('meta[name="google"]');
    await expect(metaNoTranslate).toHaveAttribute('content', 'notranslate');

    const htmlEl = page.locator('html');
    await expect(htmlEl).toHaveAttribute('translate', 'no');
    await expect(htmlEl).toHaveClass(/notranslate/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.png/);
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    // Structured Data (JSON-LD) assertion
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const jsonLdContent = await jsonLd.textContent();
    expect(jsonLdContent).toBeTruthy();
    const parsed = JSON.parse(jsonLdContent!);
    expect(parsed['@type']).toBe('ProfilePage');
    expect(parsed.mainEntity.name).toContain('Juan Carlos');
  });

  test('Zero horizontal scrollbar overflow (strict CAD boundary)', async ({ page }) => {
    const isOverflowing = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > window.innerWidth;
    });
    expect(isOverflowing).toBe(false);
  });

  test('Custom Agent vector cursor is active and rotates colors on click', async ({ page }) => {
    const getBodyCursor = () =>
      page.evaluate(() => document.documentElement.style.getPropertyValue('--cursor-default') || getComputedStyle(document.body).cursor);

    const initialCursor = await getBodyCursor();
    expect(initialCursor).toContain('data:image/svg+xml');

    // Click to cycle to 2nd color
    await page.mouse.click(200, 200);
    const secondCursor = await getBodyCursor();
    expect(secondCursor).toContain('data:image/svg+xml');
    expect(secondCursor).not.toBe(initialCursor);

    // Click again to cycle to 3rd color
    await page.mouse.click(200, 200);
    const thirdCursor = await getBodyCursor();
    expect(thirdCursor).toContain('data:image/svg+xml');
    expect(thirdCursor).not.toBe(secondCursor);
    expect(thirdCursor).not.toBe(initialCursor);

    const btnCursor = await page.evaluate(() => {
      const btn = document.querySelector('.btn') || document.querySelector('button');
      return btn ? getComputedStyle(btn).cursor : '';
    });
    expect(btnCursor).toContain('data:image/svg+xml');
  });

  test('Hero section renders profile, bio, and LinkedIn link in default English', async ({ page }) => {
    const heroName = page.locator('.hero-profile-name');
    await expect(heroName).toHaveText('Juan Carlos Gutiérrez');

    const heroLede = page.locator('.hero-left .lede');
    await expect(heroLede).toContainText('automated testing architectures in any environment');

    const linkedinBtn = page.locator('.hero-cta a.btn[href*="linkedin.com"]');
    await expect(linkedinBtn).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/juancarlosgutierrezpesquero/'
    );
    await expect(linkedinBtn).toContainText("Let's connect?");
  });

  test('Language switcher toggles between English (default) and Spanish with persistence', async ({ page }) => {
    const langBtn = page.locator('#lang-toggle-btn');
    await expect(langBtn).toBeVisible();

    const htmlElem = page.locator('html');
    await expect(htmlElem).toHaveAttribute('lang', 'en');

    const enOpt = langBtn.locator('[data-lang-opt="en"]');
    const esOpt = langBtn.locator('[data-lang-opt="es"]');
    await expect(enOpt).toHaveClass(/active/);
    await expect(esOpt).not.toHaveClass(/active/);

    const heroLede = page.locator('.hero-left .lede');
    await expect(heroLede).toContainText('automated testing architectures');
    const linkedinBtn = page.locator('.hero-cta a.btn[href*="linkedin.com"]');
    await expect(linkedinBtn).toContainText("Let's connect?");

    // Toggle to Spanish
    await langBtn.click();
    await expect(htmlElem).toHaveAttribute('lang', 'es');
    await expect(esOpt).toHaveClass(/active/);
    await expect(enOpt).not.toHaveClass(/active/);
    await expect(heroLede).toContainText('arquitecturas de testing automatizadas');
    await expect(linkedinBtn).toContainText('¿Conectamos?');

    const storedLang = await page.evaluate(() => localStorage.getItem('portfolio-lang'));
    expect(storedLang).toBe('es');

    // Reload and check persistence
    await page.reload();
    const btnModeNormal = page.locator('#btn-mode-normal');
    if (await btnModeNormal.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btnModeNormal.click();
    }
    await expect(htmlElem).toHaveAttribute('lang', 'es');
    await expect(heroLede).toContainText('arquitecturas de testing automatizadas');

    // Toggle back to English
    await langBtn.click();
    await expect(htmlElem).toHaveAttribute('lang', 'en');
    await expect(enOpt).toHaveClass(/active/);
    await expect(heroLede).toContainText('automated testing architectures');
    const storedLangBack = await page.evaluate(() => localStorage.getItem('portfolio-lang'));
    expect(storedLangBack).toBe('en');
  });

  test('Initial load defaults directly to normal mode without blocking modal', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('portfolio-lang'));
    await page.reload();

    // Verify modal overlay is not present
    const modal = page.locator('#mode-select-overlay');
    await expect(modal).toHaveCount(0);

    // Verify header and interactive components are immediately available
    const heroLede = page.locator('.hero-left .lede');
    await expect(heroLede).toBeVisible();
    await expect(page.locator('#demo-stage')).toBeVisible();

    // Verify Agents button is available in header to trigger swarm on demand
    const replayBtn = page.locator('#replay-swarm-btn');
    await expect(replayBtn).toBeVisible();
  });

  test('Interactive Test Studio comparison slider keyboard accessibility', async ({ page }) => {
    const slider = page.locator('#demo-stage');
    await expect(slider).toBeVisible();

    await slider.focus();
    await page.keyboard.press('ArrowRight');
    
    const valNow = await slider.getAttribute('aria-valuenow');
    expect(Number(valNow)).toBeGreaterThanOrEqual(0);
    expect(Number(valNow)).toBeLessThanOrEqual(100);
  });

  test('Scenario pills switch mockups and runner outputs', async ({ page }) => {
    await page.waitForTimeout(600);
    const apiPill = page.locator('.pills button[data-scenario="api"]');
    await apiPill.click();

    await expect(apiPill).toHaveAttribute('aria-selected', 'true');
    const apiView = page.locator('.g-scenario-view[data-view="api"]');
    await expect(apiView).toHaveClass(/active/);
    await expect(page.locator('#active-scenario-title')).toContainText('google-api-testing.contract.ts');
  });

  test('PSP Hardware Tooling project slider cycles slides correctly', async ({ page }) => {
    const nextBtn = page.locator('#psp-slide-next');
    const counter = page.locator('#psp-slider-counter');
    const video = page.locator('#psp-demo-video');
    const playOverlay = page.locator('#psp-play-overlay');

    await expect(video).toBeAttached();
    await expect(playOverlay).toBeAttached();
    await expect(counter).toContainText('01 / 03');
    await nextBtn.click();
    await expect(counter).toContainText('02 / 03');
    await nextBtn.click();
    await expect(counter).toContainText('03 / 03');
  });

  test('Projects CAD grid renders active and mock projects correctly', async ({ page }) => {
    const cards = page.locator('#projects .cmp-card');
    await expect(cards).toHaveCount(4);
    await expect(cards.first()).toContainText('PSP Hardware Diagnostic Tool & Tear-Down Mod');
  });

  test('Gallery items and Lightbox interaction, Experience, Stack, and Contact sections exist', async ({ page }, testInfo) => {
    const items = page.locator('#gallery .gallery-item');
    await expect(items).toHaveCount(7);

    // Test Lightbox open
    await items.first().click();
    const lightbox = page.locator('#gallery-lightbox');
    await expect(lightbox).toBeVisible();
    await expect(page.locator('#lb-counter')).toContainText('01 / 07');

    if (page.viewportSize()?.width === 1440) {
      await page.screenshot({
        path: getScreenshotPath('gallery_lightbox_desktop.png', testInfo)
      });
    }

    // Test keyboard navigation in Lightbox
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#lb-counter')).toContainText('02 / 07');

    // Test Escape to close
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();

    // Verify other sections
    await expect(page.locator('#experience .pair-card')).toHaveCount(2);
    await expect(page.locator('#experience')).toContainText('IZERTIS, S.A.');
    await expect(page.locator('#experience')).toContainText('ITEGGO CONSULTING');
    await expect(page.locator('#experience .exp-compact-card')).toHaveCount(2);
    await expect(page.locator('#experience')).toContainText('Gorilast');
    await expect(page.locator('#experience .pro-card')).toBeVisible();

    // Verify itegGO photo thumbnail and dialog carousel
    const iteggoThumb = page.locator('#iteggo-gallery-trigger');
    await expect(iteggoThumb).toBeVisible();
    await iteggoThumb.click();
    const iteggoDialog = page.locator('#iteggo-dialog');
    await expect(iteggoDialog).toBeVisible();
    await expect(page.locator('#iteggo-counter')).toContainText('01 / 04');
    await page.locator('#iteggo-next-btn').click();
    await expect(page.locator('#iteggo-counter')).toContainText('02 / 04');
    await page.keyboard.press('Escape');
    await expect(iteggoDialog).toBeHidden();

    await expect(page.locator('#stack .skill-col')).toHaveCount(4);
    await expect(page.locator('#stack .skill-item')).toHaveCount(24);
    await expect(page.locator('#stack .skill-icon svg')).toHaveCount(24);
    await expect(page.locator('#contact .cta-cell')).toBeVisible();
  });

  test('Typography font toggle button alternates between default and Geist Pixel', async ({ page }) => {
    const fontBtn = page.locator('#font-toggle-btn');
    await expect(fontBtn).toBeVisible();
    await expect(fontBtn.locator('svg.icon-calligraphy')).toBeVisible();

    // Initially default font
    const htmlElem = page.locator('html');
    await expect(htmlElem).not.toHaveAttribute('data-font', 'pixel');

    // Click to activate Geist Pixel
    await fontBtn.click();
    await expect(htmlElem).toHaveAttribute('data-font', 'pixel');
    await expect(fontBtn).toHaveClass(/active/);
    const storedFont = await page.evaluate(() => localStorage.getItem('portfolio-font'));
    expect(storedFont).toBe('pixel');

    // Click to toggle back to default
    await fontBtn.click();
    await expect(htmlElem).not.toHaveAttribute('data-font', 'pixel');
    await expect(fontBtn).not.toHaveClass(/active/);
    const storedFontBack = await page.evaluate(() => localStorage.getItem('portfolio-font'));
    expect(storedFontBack).toBe('default');
  });

  test('Navigation bar stays sticky at the top when scrolling', async ({ page }) => {
    const nav = page.locator('header.nav');
    await expect(nav).toBeVisible();

    // Scroll down 600px
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);

    const navTop = await page.evaluate(() => document.querySelector('header.nav')?.getBoundingClientRect().top);
    expect(navTop).toBe(0);
  });

  test('DevTools Elements QA Easter egg is present in HTML comments and syncs with language', async ({ page }) => {
    const getComments = () =>
      page.evaluate(() => {
        const comments: string[] = [];
        for (const node of document.documentElement.childNodes) {
          if (node.nodeType === Node.COMMENT_NODE && node.textContent) {
            comments.push(node.textContent.trim());
          }
        }
        return comments;
      });

    let comments = await getComments();
    expect(comments.length).toBeGreaterThan(0);
    expect(comments.some((c) => c.includes('QA AUTOMATION ENGINEER // SDET'))).toBe(true);
    expect(comments.some((c) => c.includes('Juan-Carlos-Gutierrez-CV.pdf'))).toBe(true);
    expect(comments.some((c) => c.includes('Inspecting the DOM?'))).toBe(true);

    // Switch language to Spanish
    const langBtn = page.locator('#lang-toggle-btn');
    await langBtn.click();
    await page.waitForTimeout(100);

    comments = await getComments();
    expect(comments.some((c) => c.includes('¿Inspeccionando el DOM?'))).toBe(true);
    expect(comments.some((c) => c.includes('Juan-Carlos-Gutierrez-CV.pdf'))).toBe(true);
  });

  test('Visual capture of language toggle states', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'Desktop-1440') {
      await page.screenshot({
        path: getScreenshotPath('desktop_english.png', testInfo),
        clip: { x: 0, y: 0, width: 1440, height: 550 }
      });

      const langBtn = page.locator('#lang-toggle-btn');
      await langBtn.click();
      await page.mouse.move(0, 0);
      await langBtn.blur();
      await page.waitForTimeout(300);

      await page.screenshot({
        path: getScreenshotPath('desktop_spanish.png', testInfo),
        clip: { x: 0, y: 0, width: 1440, height: 550 }
      });

      // Hide sticky nav during section captures so titles are not overlapped
      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = 'none';
      });

      const projectsSec = page.locator('#projects');
      await projectsSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await projectsSec.screenshot({
        path: getScreenshotPath('single_project_desktop.png', testInfo)
      });

      const expSec = page.locator('#experience');
      await expSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expSec.screenshot({
        path: getScreenshotPath('experience_desktop.png', testInfo)
      });

      const clickerSec = page.locator('#visitor-mark-band');
      await clickerSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await clickerSec.screenshot({
        path: getScreenshotPath('clicker_desktop.png', testInfo)
      });

      const pipelineSec = page.locator('#pipeline-gate-band');
      await pipelineSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await pipelineSec.screenshot({
        path: getScreenshotPath('pipeline_banner_desktop.png', testInfo)
      });

      const pBox = await pipelineSec.boundingBox();
      if (pBox) {
        await page.screenshot({
          path: getScreenshotPath('projects_pipeline_transition.png', testInfo),
          clip: {
            x: 0,
            y: Math.max(0, pBox.y - 280),
            width: 1440,
            height: 480
          }
        });
      }

      const gallerySec = page.locator('#gallery');
      await gallerySec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await gallerySec.screenshot({
        path: getScreenshotPath('gallery_desktop.png', testInfo)
      });

      const contactSec = page.locator('#contact');
      await contactSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await contactSec.screenshot({
        path: getScreenshotPath('contact_form_spanish.png', testInfo)
      });

      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = '';
      });
    } else if (testInfo.project.name === 'Mobile-360') {
      const clickerSec = page.locator('#visitor-mark-band');
      await clickerSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await clickerSec.screenshot({
        path: getScreenshotPath('clicker_mobile.png', testInfo)
      });

      const pipelineSec = page.locator('#pipeline-gate-band');
      await pipelineSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await pipelineSec.screenshot({
        path: getScreenshotPath('pipeline_banner_mobile.png', testInfo)
      });

      await page.screenshot({
        path: getScreenshotPath('mobile_360_header.png', testInfo),
        clip: { x: 0, y: 0, width: 360, height: 350 }
      });

      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = 'none';
      });

      const expSec = page.locator('#experience');
      await expSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expSec.screenshot({
        path: getScreenshotPath('experience_mobile.png', testInfo)
      });

      const gallerySec = page.locator('#gallery');
      await gallerySec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await gallerySec.screenshot({
        path: getScreenshotPath('gallery_mobile.png', testInfo)
      });

      const stackSec = page.locator('#stack');
      await stackSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await stackSec.screenshot({
        path: getScreenshotPath('stack_mobile_new.png', testInfo)
      });

      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = '';
      });
    }
  });

  test('Visitor Clicker widget renders below Hero, displays counter, and increments count on click', async ({ page }) => {
    const clickerBand = page.locator('#visitor-mark-band');
    await expect(clickerBand).toBeVisible();

    const title = page.locator('.clicker-title');
    await expect(title).toBeVisible();

    const btn = page.locator('#clicker-stamp-btn');
    await expect(btn).toBeVisible();

    const userCount = page.locator('#clicker-user-count');
    await expect(userCount).toHaveText('0');

    // Click button to stamp visit
    await btn.click();
    const particle = page.locator('.clicker-particle');
    await expect(particle).toBeAttached();
    await expect(userCount).toHaveText('1');

    // Verify localStorage persistence
    const stored = await page.evaluate(() => localStorage.getItem('portfolio_visitor_marks'));
    expect(stored).toBe('1');
  });

  test('CI/CD Pipeline Gate banner renders and launches live terminal modal', async ({ page }, testInfo) => {
    const pipelineBand = page.locator('#pipeline-gate-band');
    await expect(pipelineBand).toBeVisible();
    await expect(pipelineBand).toContainText('01.5 // CI/CD QUALITY GATE');

    const triggerBtn = page.locator('#pipeline-trigger-btn');
    await expect(triggerBtn).toBeVisible();

    // Modal overlay should initially be hidden
    const overlay = page.locator('#pipeline-modal-overlay');
    await expect(overlay).toBeHidden();

    // Click to launch E2E Pipeline Runner
    await triggerBtn.click();
    await expect(overlay).toBeVisible();

    const output = page.locator('#pipeline-terminal-output');
    await expect(output).toContainText('$ astro check && astro build');

    // Skip to end to test quick completion
    const skipBtn = page.locator('#pipeline-ctrl-skip');
    await skipBtn.click();

    await expect(page.locator('#pipeline-status-badge')).toHaveClass(/is-passed/);
    await expect(output).toContainText('48 passed (100%)');

    if (page.viewportSize()?.width === 1440) {
      await page.screenshot({
        path: getScreenshotPath('pipeline_terminal_desktop.png', testInfo)
      });
    }

    // Close via Escape key
    await page.keyboard.press('Escape');
    await expect(overlay).toBeHidden();
  });

  test('Contact form renders correctly, validates required fields, and submits via AJAX', async ({ page }, testInfo) => {
    // Scroll to contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Verify form elements exist
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();

    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const subjectInput = page.locator('#contact-subject');
    const messageInput = page.locator('#contact-message');
    const submitBtn = page.locator('#contact-submit-btn');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Verify copy email button and direct link
    const copyBtn = page.locator('#contact-copy-email-btn');
    await expect(copyBtn).toBeVisible();
    const directLink = page.locator('.contact-direct-link');
    await expect(directLink).toHaveAttribute('href', 'mailto:juancarlosgp212@gmail.com');

    // Take screenshot of Contact section
    if (page.viewportSize()?.width === 1440) {
      await page.screenshot({
        path: getScreenshotPath('contact_form_desktop.png', testInfo)
      });
    } else if (page.viewportSize()?.width === 390) {
      await page.screenshot({
        path: getScreenshotPath('contact_form_mobile.png', testInfo)
      });
    }

    // Intercept form submission
    await page.route(/formsubmit\.co\/ajax\/.*/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: 'true', message: 'Form submitted successfully' })
      });
    });

    // Fill form
    await nameInput.fill('Sarah Connor');
    await emailInput.fill('sarah@cyberdyne.org');
    await subjectInput.fill('QA Architecture Audit');
    await messageInput.fill('We need your expertise with Playwright and CI/CD automation pipelines.');

    // Submit form
    await submitBtn.click();

    // Expect form to be hidden and success banner visible
    const successBanner = page.locator('#contact-success-banner');
    await expect(successBanner).toBeVisible();
    await expect(form).toBeHidden();

    if (page.viewportSize()?.width === 1440) {
      await page.screenshot({
        path: getScreenshotPath('contact_success_desktop.png', testInfo)
      });
    }

    // Click "Send another message" reset button
    const resetBtn = page.locator('#contact-reset-btn');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Form should re-appear and banner disappear
    await expect(form).toBeVisible();
    await expect(successBanner).toBeHidden();
    await expect(nameInput).toHaveValue('');
    await expect(messageInput).toHaveValue('');
  });

  test('Contact email copy button copies address to clipboard with visual feedback', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    const copyBtn = page.locator('#contact-copy-email-btn');
    await copyBtn.scrollIntoViewIfNeeded();
    await copyBtn.click();

    await expect(copyBtn).toHaveClass(/is-copied/);
    const copyText = page.locator('#contact-copy-text');
    await expect(copyText).toHaveText(/Copiado|Copied/i);
  });
});



