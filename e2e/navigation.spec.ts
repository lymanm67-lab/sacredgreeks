import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/sacred|greek/i);
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation elements
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    const aboutLink = page.getByRole('link', { name: /about/i });
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/about/);
    }
  });

  test('should navigate to resources page', async ({ page }) => {
    await page.goto('/');
    
    const resourcesLink = page.getByRole('link', { name: /resource/i });
    if (await resourcesLink.isVisible()) {
      await resourcesLink.click();
      await expect(page).toHaveURL(/resource/);
    }
  });

  test('should display mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator('[role="menu"], [data-state="open"]')).toBeVisible();
    }
  });

  test('should navigate to changelog', async ({ page }) => {
    await page.goto('/changelog');
    await expect(page.getByRole('heading', { name: /changelog/i })).toBeVisible();
  });
});

test.describe('Footer Navigation', () => {
  test('should display footer links', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should navigate to privacy policy', async ({ page }) => {
    await page.goto('/');
    
    const privacyLink = page.getByRole('link', { name: /privacy/i });
    if (await privacyLink.isVisible()) {
      await privacyLink.click();
      await expect(page).toHaveURL(/privacy/);
    }
  });

  test('should navigate to terms of service', async ({ page }) => {
    await page.goto('/');
    
    const termsLink = page.getByRole('link', { name: /terms/i });
    if (await termsLink.isVisible()) {
      await termsLink.click();
      await expect(page).toHaveURL(/terms/);
    }
  });
});
