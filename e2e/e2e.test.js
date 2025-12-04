// e2e/e2e.test.js
const puppeteer = require('puppeteer');
const { fork } = require('child_process');
const path = require('path');
const os = require('os');

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.cjs`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.kill();
  });

  test('shows Visa logo and valid status for valid Visa card', async () => {
    await page.goto(baseUrl);
    await page.type('#card-number', '4532342856781237');
    await page.click('#validate-btn');

    const visaLogo = await page.$('img[data-system="visa"]');
    const className = await page.evaluate(el => el.className, visaLogo);
    expect(className).toContain('active');

    const resultText = await page.$eval('#validation-result', el => el.textContent);
    expect(resultText).toBe('Valid');
  });
});