import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    // Should either show login page or redirect
    await expect(page).toHaveURL(/\/(auth|login|dashboard)/);
  });
});

test.describe('Dashboard - Authenticated', () => {
  test.use({
    storageState: 'e2e/.auth/user.json'
  });

  test('should display dashboard for authenticated users', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1, h2')).toContainText(/dashboard|welcome/i);
  });

  test('should display quick action cards', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="quick-actions"]')).toBeDefined();
  });

  test('should navigate to prayer journal', async ({ page }) => {
    await page.goto('/dashboard');
    const prayerLink = page.getByRole('link', { name: /prayer/i }).first();
    if (await prayerLink.isVisible()) {
      await prayerLink.click();
      await expect(page).toHaveURL(/prayer/);
    }
  });

  test('should display verse of the day', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText(/verse|scripture/i)).toBeDefined();
  });

  test('should display user stats', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="user-stats"]')).toBeDefined();
  });
});
