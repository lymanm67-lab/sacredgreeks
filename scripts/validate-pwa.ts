/**
 * PWA Validation Script
 * Run this before deployment to catch PWA issues early
 * Usage: npx ts-node scripts/validate-pwa.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

const results: ValidationResult[] = [];

function log(result: ValidationResult) {
  const icon = result.passed ? '✅' : result.severity === 'error' ? '❌' : '⚠️';
  console.log(`${icon} ${result.message}`);
  results.push(result);
}

// Check manifest.json exists and is valid
function validateManifest() {
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    log({ passed: false, message: 'manifest.json not found in public/', severity: 'error' });
    return;
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    // Required fields
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
    for (const field of requiredFields) {
      if (!manifest[field]) {
        log({ passed: false, message: `manifest.json missing required field: ${field}`, severity: 'error' });
      } else {
        log({ passed: true, message: `manifest.json has ${field}`, severity: 'info' });
      }
    }
    
    // Validate icons
    if (manifest.icons && Array.isArray(manifest.icons)) {
      const sizes = manifest.icons.map((i: any) => i.sizes);
      if (!sizes.includes('192x192')) {
        log({ passed: false, message: 'manifest.json missing 192x192 icon', severity: 'error' });
      }
      if (!sizes.includes('512x512')) {
        log({ passed: false, message: 'manifest.json missing 512x512 icon', severity: 'error' });
      }
      
      // Check icons exist
      for (const icon of manifest.icons) {
        const iconPath = path.join(process.cwd(), 'public', icon.src.replace(/^\//, ''));
        if (!fs.existsSync(iconPath)) {
          log({ passed: false, message: `Icon file not found: ${icon.src}`, severity: 'error' });
        } else {
          log({ passed: true, message: `Icon exists: ${icon.src}`, severity: 'info' });
        }
      }
    }
    
    // Check display mode
    if (manifest.display !== 'standalone' && manifest.display !== 'fullscreen') {
      log({ passed: false, message: `manifest.json display should be 'standalone' or 'fullscreen', got: ${manifest.display}`, severity: 'warning' });
    }
    
  } catch (e) {
    log({ passed: false, message: `manifest.json is not valid JSON: ${e}`, severity: 'error' });
  }
}

// Check service worker exists and doesn't cache SPA routes
function validateServiceWorker() {
  const swPath = path.join(process.cwd(), 'public', 'sw.js');
  
  if (!fs.existsSync(swPath)) {
    log({ passed: false, message: 'sw.js not found in public/', severity: 'error' });
    return;
  }
  
  const swContent = fs.readFileSync(swPath, 'utf-8');
  
  // Check for essential event listeners
  if (!swContent.includes("addEventListener('install'")) {
    log({ passed: false, message: 'sw.js missing install event listener', severity: 'error' });
  } else {
    log({ passed: true, message: 'sw.js has install event listener', severity: 'info' });
  }
  
  if (!swContent.includes("addEventListener('activate'")) {
    log({ passed: false, message: 'sw.js missing activate event listener', severity: 'error' });
  } else {
    log({ passed: true, message: 'sw.js has activate event listener', severity: 'info' });
  }
  
  if (!swContent.includes("addEventListener('fetch'")) {
    log({ passed: false, message: 'sw.js missing fetch event listener', severity: 'error' });
  } else {
    log({ passed: true, message: 'sw.js has fetch event listener', severity: 'info' });
  }
  
  // Check it's NOT caching SPA routes (common mistake)
  const spaRoutes = ['/dashboard', '/auth', '/profile', '/devotional', '/journey', '/prayer'];
  const urlsToCacheMatch = swContent.match(/urlsToCache\s*=\s*\[([\s\S]*?)\]/);
  
  if (urlsToCacheMatch) {
    const cacheList = urlsToCacheMatch[1];
    for (const route of spaRoutes) {
      if (cacheList.includes(`'${route}'`) || cacheList.includes(`"${route}"`)) {
        log({ 
          passed: false, 
          message: `sw.js caches SPA route "${route}" - this will cause iOS Safari errors!`, 
          severity: 'error' 
        });
      }
    }
    log({ passed: true, message: 'sw.js does not cache SPA routes in urlsToCache', severity: 'info' });
  }
  
  // Check for Promise.allSettled (better error handling)
  if (!swContent.includes('Promise.allSettled')) {
    log({ 
      passed: false, 
      message: 'sw.js should use Promise.allSettled for caching to handle failures gracefully', 
      severity: 'warning' 
    });
  } else {
    log({ passed: true, message: 'sw.js uses Promise.allSettled for error-tolerant caching', severity: 'info' });
  }
}

// Check offline.html exists
function validateOfflinePage() {
  const offlinePath = path.join(process.cwd(), 'public', 'offline.html');
  
  if (!fs.existsSync(offlinePath)) {
    log({ passed: false, message: 'offline.html not found in public/', severity: 'warning' });
  } else {
    log({ passed: true, message: 'offline.html exists', severity: 'info' });
  }
}

// Check index.html has PWA meta tags
function validateIndexHtml() {
  const indexPath = path.join(process.cwd(), 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    log({ passed: false, message: 'index.html not found', severity: 'error' });
    return;
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  if (!indexContent.includes('rel="manifest"')) {
    log({ passed: false, message: 'index.html missing manifest link', severity: 'error' });
  } else {
    log({ passed: true, message: 'index.html has manifest link', severity: 'info' });
  }
  
  if (!indexContent.includes('name="theme-color"')) {
    log({ passed: false, message: 'index.html missing theme-color meta tag', severity: 'warning' });
  } else {
    log({ passed: true, message: 'index.html has theme-color meta tag', severity: 'info' });
  }
  
  if (!indexContent.includes('apple-touch-icon')) {
    log({ passed: false, message: 'index.html missing apple-touch-icon', severity: 'warning' });
  } else {
    log({ passed: true, message: 'index.html has apple-touch-icon', severity: 'info' });
  }
  
  if (!indexContent.includes('apple-mobile-web-app-capable')) {
    log({ passed: false, message: 'index.html missing apple-mobile-web-app-capable meta tag', severity: 'warning' });
  } else {
    log({ passed: true, message: 'index.html has apple-mobile-web-app-capable meta tag', severity: 'info' });
  }
}

// Run all validations
console.log('\n🔍 PWA Validation Report\n');
console.log('=' .repeat(50));

validateManifest();
console.log('');
validateServiceWorker();
console.log('');
validateOfflinePage();
console.log('');
validateIndexHtml();

console.log('\n' + '='.repeat(50));

// Summary
const errors = results.filter(r => !r.passed && r.severity === 'error');
const warnings = results.filter(r => !r.passed && r.severity === 'warning');
const passed = results.filter(r => r.passed);

console.log(`\n📊 Summary:`);
console.log(`   ✅ Passed: ${passed.length}`);
console.log(`   ❌ Errors: ${errors.length}`);
console.log(`   ⚠️  Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\n❌ PWA validation failed with errors. Fix before deploying!');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\n⚠️  PWA validation passed with warnings.');
  process.exit(0);
} else {
  console.log('\n✅ PWA validation passed!');
  process.exit(0);
}
