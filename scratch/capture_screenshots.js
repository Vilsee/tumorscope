const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const routes = [
    { name: '01_landing_page.png', url: 'http://localhost:3000/' },
    { name: '02_3d_atlas_explorer.png', url: 'http://localhost:3000/atlas' },
    { name: '03_classification_explorer.png', url: 'http://localhost:3000/classification' },
    { name: '04_evidence_research_radar.png', url: 'http://localhost:3000/evidence' },
  ];

  for (const route of routes) {
    console.log(`Navigating to ${route.url}...`);
    await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000)); // wait for 3D/animation rendering
    const filePath = path.join(outputDir, route.name);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Saved screenshot: ${filePath}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
