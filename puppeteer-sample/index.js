const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  await page.goto('https://google.com');
  await page.screenshot({ path: 'screenshots/1.png', fullPage: true });

  await page.type('input[name="q"]', 'puppeteer');
  await page.screenshot({ path: 'screenshots/2.png', fullPage: true });

  await Promise.all([
    page.click('input[name="btnK"]'),
    page.waitForNavigation(),
  ]);
  await page.screenshot({ path: 'screenshots/3.png', fullPage: true });

  await Promise.all([
    page.click('a[href="https://github.com/puppeteer/puppeteer"]'),
    page.waitForNavigation(),
  ]);
  await page.screenshot({ path: 'screenshots/4.png', fullPage: true });

  await browser.close();
})();