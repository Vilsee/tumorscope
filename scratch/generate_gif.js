const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const GIFEncoder = require('gif-encoder-2');

const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const gifPath = path.join(screenshotDir, 'neuroscope_demo.gif');

async function createGIF() {
  console.log('Capturing frames for animated feature GIF...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 960, height: 600 });

  const routes = [
    { title: '1. Global Burden Context Widget', url: 'http://localhost:3000/' },
    { title: '2. Procedural 3D Brain Atlas', url: 'http://localhost:3000/atlas' },
    { title: '3. WHO CNS5 Classification Explorer & Spectrum', url: 'http://localhost:3000/classification' },
    { title: '4. Evidence Radar & Grounded AI Summarizer', url: 'http://localhost:3000/evidence' }
  ];

  const width = 960;
  const height = 600;

  const encoder = new GIFEncoder(width, height);
  const writeStream = fs.createWriteStream(gifPath);

  encoder.createReadStream().pipe(writeStream);
  encoder.start();
  encoder.setRepeat(0);   // loop forever
  encoder.setDelay(2500); // 2.5 seconds per slide
  encoder.setQuality(10); // quality setting

  for (const item of routes) {
    console.log(`Rendering frame for: ${item.title}...`);
    await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));
    
    const buf = await page.screenshot({ type: 'png' });
    const png = PNG.sync.read(buf);
    
    encoder.addFrame(png.data);
    console.log(`Added frame: ${item.title}`);
  }

  encoder.finish();
  await browser.close();
  console.log(`Animated GIF successfully generated at: ${gifPath}`);
}

createGIF().catch(err => {
  console.error('Error generating GIF:', err);
  process.exit(1);
});
