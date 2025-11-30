# E2E Testing Guide

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Setup

1. Install Playwright:
```bash
npm install -D @playwright/test
npx playwright install
```

2. Create auth state for authenticated tests:
```bash
mkdir -p e2e/.auth
# Create user.json with authenticated session state
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test e2e/prayer-wall.spec.ts

# Run tests with UI
npx playwright test --ui

# Generate test report
npx playwright show-report
```

## Test Structure

- `e2e/auth.spec.ts` - Authentication flow tests
- `e2e/dashboard.spec.ts` - Dashboard functionality tests
- `e2e/prayer-wall.spec.ts` - Prayer wall feature tests
- `e2e/navigation.spec.ts` - Navigation and routing tests

## Writing Tests

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
```

## Authentication

For tests requiring authentication, use the storage state pattern:

```typescript
test.use({
  storageState: 'e2e/.auth/user.json'
});
```

Create the auth state by running:
```bash
npx playwright codegen --save-storage=e2e/.auth/user.json
```

## CI Integration

Tests run automatically on pull requests. See `.github/workflows/e2e.yml` for configuration.
