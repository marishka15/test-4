const puppeteer = require("puppeteer"); // Исправлена опечатка и импорт
const { fork } = require("child_process");
const path = require("path");

jest.setTimeout(60000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(path.join(__dirname, "e2e.server.js"));

    await new Promise((resolve, reject) => {
      server.on("message", (msg) => {
        if (msg === "ok") resolve();
      });
      server.on("error", reject);
    });

    browser = await puppeteer.launch({
      headless: "new",
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });

  test("should add do something", async () => {
    await page.goto(baseUrl);
    const body = await page.waitForSelector("body");
    expect(body).not.toBeNull();
  });
});
