const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,

  ini: async base_url => {
    self.browser = await puppeteer.launch({
      headless: true
    });

    self.page = await self.browser.newPage();

    await self.page.goto(base_url, {
      waitUntil: "networkidle0"
    });

    const result = await self.page.evaluate(() => {
      const urls = [];
      const nodelist = document.querySelectorAll(
        'div[class="product-inner"] a[class="thumb-link"]'
      );
      nodelist.forEach(element => {
        urls.push(element.href);
      });
      return urls;
    });
    return result;
  }
};

module.exports = self;
