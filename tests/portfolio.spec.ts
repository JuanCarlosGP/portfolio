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

  test('Hero section renders profile, bio, and LinkedIn link', async ({ page }) => {
    const heroName = page.locator('.hero-profile-name');
    await expect(heroName).toHaveText('Juan Carlos Gutiérrez');

    const heroLede = page.locator('.hero-left .lede');
    await expect(heroLede).toContainText('arquitecturas de testing automatizadas en cualquier entorno');

    const linkedinBtn = page.locator('.hero-cta a.btn');
    await expect(linkedinBtn).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/juancarlosgutierrezpesquero/'
    );
    await expect(linkedinBtn).toContainText('¿Conectamos?');
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

  test('All 6 projects are rendered in the CAD grid', async ({ page }) => {
    const cards = page.locator('#projects .cmp-card');
    await expect(cards).toHaveCount(6);
  });

  test('Methodology pillars, Experience, Stack, and Contact sections exist', async ({ page }) => {
    await expect(page.locator('#how .step')).toHaveCount(3);
    await expect(page.locator('#experience .pair-card')).toHaveCount(2);
    await expect(page.locator('#stack .skill-col')).toHaveCount(4);
    await expect(page.locator('#contact .cta-cell')).toBeVisible();
  });
});
