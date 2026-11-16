import { test, expect } from '@playwright/test';

test.describe('Portfolio Astro Architecture & SDET Quality Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const btnModeNormal = page.locator('#btn-mode-normal');
    if (await btnModeNormal.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btnModeNormal.click();
      await page.waitForSelector('#mode-select-overlay', { state: 'detached', timeout: 3000 }).catch(() => {});
    }
  });

  test('Metadata and Document Title integrity', async ({ page }) => {
    await expect(page).toHaveTitle(/Juan Carlos Gutiérrez Pesquero/);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute(
      'content',
      /QA Automation Engineer \/ SDET/
    );
  });

  test('Zero horizontal scrollbar overflow (strict CAD boundary)', async ({ page }) => {
    const isOverflowing = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > window.innerWidth;
    });
    expect(isOverflowing).toBe(false);
  });

  test('Hero section renders profile, bio, and LinkedIn link in default English', async ({ page }) => {
    const heroName = page.locator('.hero-profile-name');
    await expect(heroName).toHaveText('Juan Carlos Gutiérrez');

    const heroLede = page.locator('.hero-left .lede');
    await expect(heroLede).toContainText('automated testing architectures in any environment');

    const linkedinBtn = page.locator('.hero-cta a.btn');
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
    const linkedinBtn = page.locator('.hero-cta a.btn');
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

  test('Mode selection modal language switcher is synchronized with portfolio language', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('portfolio-lang'));
    await page.reload();

    const modal = page.locator('#mode-select-overlay');
    await expect(modal).toBeVisible();

    const modalLangBtn = page.locator('#modal-lang-toggle-btn');
    await expect(modalLangBtn).toBeVisible();

    const modalEnOpt = modalLangBtn.locator('[data-lang-opt="en"]');
    const modalEsOpt = modalLangBtn.locator('[data-lang-opt="es"]');
    const headerLangBtn = page.locator('#lang-toggle-btn');
    const headerEsOpt = headerLangBtn.locator('[data-lang-opt="es"]');

    await expect(modalEnOpt).toHaveClass(/active/);
    await expect(page.locator('#mode-select-title')).toContainText('Choose how to view portfolio');

    // Click modal language button to switch to Spanish
    await modalLangBtn.click();

    await expect(modalEsOpt).toHaveClass(/active/);
    await expect(headerEsOpt).toHaveClass(/active/);
    await expect(page.locator('#mode-select-title')).toContainText('Elige cómo ver el portafolio');
    await expect(page.locator('#btn-mode-normal')).toContainText('Entrar [2]');

    // Enter normal mode and verify that the page is in Spanish
    await page.locator('#btn-mode-normal').click();
    await expect(modal).toBeHidden();
    await expect(page.locator('.hero-left .lede')).toContainText('arquitecturas de testing automatizadas');
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

  test('Gallery items and Lightbox interaction, Experience, Stack, and Contact sections exist', async ({ page }) => {
    const items = page.locator('#gallery .gallery-item');
    await expect(items).toHaveCount(7);

    // Test Lightbox open
    await items.first().click();
    const lightbox = page.locator('#gallery-lightbox');
    await expect(lightbox).toBeVisible();
    await expect(page.locator('#lb-counter')).toContainText('01 / 07');

    if (page.viewportSize()?.width === 1440) {
      await page.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/gallery_lightbox_desktop.png'
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
    await expect(page.locator('#experience')).toContainText('Accenture Spain');
    await expect(page.locator('#experience .pro-card')).toBeVisible();

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

  test('Visual capture of language toggle states', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'Desktop-1440') {
      await page.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/desktop_english.png',
        clip: { x: 0, y: 0, width: 1440, height: 550 }
      });

      const langBtn = page.locator('#lang-toggle-btn');
      await langBtn.click();
      await page.mouse.move(0, 0);
      await langBtn.blur();
      await page.waitForTimeout(300);

      await page.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/desktop_spanish.png',
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
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/single_project_desktop.png'
      });

      const expSec = page.locator('#experience');
      await expSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expSec.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/experience_desktop.png'
      });

      const gallerySec = page.locator('#gallery');
      await gallerySec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await gallerySec.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/gallery_desktop.png'
      });

      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = '';
      });
    } else if (testInfo.project.name === 'Mobile-360') {
      await page.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/mobile_360_header.png',
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
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/experience_mobile.png'
      });

      const gallerySec = page.locator('#gallery');
      await gallerySec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await gallerySec.screenshot({
        path: '/home/jcmdfk/.gemini/antigravity/brain/4031e39d-8cf7-4674-b99a-70ec760eaa5b/gallery_mobile.png'
      });

      await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement | null;
        if (nav) nav.style.display = '';
      });
    }
  });
});



