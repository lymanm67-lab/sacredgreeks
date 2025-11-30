// Build-time sitemap generator script
// Run this script to regenerate the sitemap when routes change

import { generateSitemapXML, getTotalRoutes } from '../src/lib/sitemap-generator';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

function main() {
  console.log('Generating sitemap...');
  
  const sitemap = generateSitemapXML();
  const routeCount = getTotalRoutes();
  
  fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   Total routes: ${routeCount}`);
  console.log(`   Output: ${OUTPUT_PATH}`);
}

main();
