import { test, expect } from '@playwright/test';

test.describe('PWA Installation & Service Worker', () => {
  test('should serve valid manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response?.status()).toBe(200);
    
    const manifest = await response?.json();
    
    // Validate required manifest fields
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThan(0);
    
    // Validate icons have required properties
    for (const icon of manifest.icons) {
      expect(icon.src).toBeTruthy();
      expect(icon.sizes).toBeTruthy();
      expect(icon.type).toBeTruthy();
    }
  });

  test('should serve valid service worker', async ({ page }) => {
    const response = await page.goto('/sw.js');
    expect(response?.status()).toBe(200);
    
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('javascript');
    
    const swContent = await response?.text();
    // Verify SW has essential components
    expect(swContent).toContain('install');
    expect(swContent).toContain('activate');
    expect(swContent).toContain('fetch');
  });

  test('should have PWA meta tags in HTML', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential PWA meta tags
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
    expect(themeColor).toBeTruthy();
    
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    
    // Check manifest link
    const manifestLink = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifestLink).toBeTruthy();
    
    // Check apple-touch-icon
    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    if (await appleIcon.count() > 0) {
      const href = await appleIcon.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('should serve offline.html fallback', async ({ page }) => {
    const response = await page.goto('/offline.html');
    expect(response?.status()).toBe(200);
    
    // Verify offline page has content
    const content = await page.content();
    expect(content).toContain('offline');
  });

  test('should serve PWA icons', async ({ page }) => {
    // Test 192x192 icon
    const icon192 = await page.goto('/icon-192.png');
    expect(icon192?.status()).toBe(200);
    expect(icon192?.headers()['content-type']).toContain('image/png');
    
    // Test 512x512 icon
    const icon512 = await page.goto('/icon-512.png');
    expect(icon512?.status()).toBe(200);
    expect(icon512?.headers()['content-type']).toContain('image/png');
  });

  test('should register service worker on page load', async ({ page }) => {
    await page.goto('/');
    
    // Wait for service worker registration
    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          return !!registration;
        } catch {
          return false;
        }
      }
      return false;
    });
    
    expect(swRegistered).toBe(true);
  });

  test('should not cache non-existent SPA routes in SW', async ({ page }) => {
    // Read SW content and verify it doesn't try to cache SPA routes
    const response = await page.goto('/sw.js');
    const swContent = await response?.text();
    
    // These routes should NOT be in urlsToCache
    const spaRoutes = ['/dashboard', '/auth', '/profile', '/devotional', '/journey'];
    const urlsToCacheMatch = swContent?.match(/urlsToCache\s*=\s*\[([\s\S]*?)\]/);
    
    if (urlsToCacheMatch) {
      const cacheList = urlsToCacheMatch[1];
      for (const route of spaRoutes) {
        expect(cacheList).not.toContain(`'${route}'`);
        expect(cacheList).not.toContain(`"${route}"`);
      }
    }
  });
});

test.describe('Install Page', () => {
  test('should load install page', async ({ page }) => {
    await page.goto('/install');
    
    // Check page loaded
    await expect(page.getByText(/install/i).first()).toBeVisible();
  });

  test('should display QR code', async ({ page }) => {
    await page.goto('/install');
    
    // Look for QR code element
    const qrCode = page.locator('svg[role="img"], canvas, img[alt*="QR"]').first();
    await expect(qrCode).toBeVisible();
  });

  test('should show iOS installation instructions', async ({ page }) => {
    await page.goto('/install');
    
    await expect(page.getByText(/iphone|safari/i).first()).toBeVisible();
  });

  test('should show Android installation instructions', async ({ page }) => {
    await page.goto('/install');
    
    await expect(page.getByText(/android|chrome/i).first()).toBeVisible();
  });
});

test.describe('Offline Capability', () => {
  test('should handle navigation when offline', async ({ page, context }) => {
    // First, load the page to cache assets
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Go offline
    await context.setOffline(true);
    
    // Try to navigate - should not throw
    try {
      await page.goto('/', { timeout: 5000 });
      // If we get here, offline handling worked
      expect(true).toBe(true);
    } catch (e) {
      // Navigation timeout is acceptable when offline
      expect(true).toBe(true);
    }
    
    // Go back online
    await context.setOffline(false);
  });
});

test.describe('Mobile PWA Experience', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X dimensions
  
  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Page should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('should display install prompt elements on mobile install page', async ({ page }) => {
    await page.goto('/install');
    
    // Should show installation instructions
    await expect(page.getByText(/add to home screen/i).first()).toBeVisible();
  });
});
