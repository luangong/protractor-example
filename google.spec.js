'use strict';

const fs = require('fs');

describe('Google Search', () => {
  it('should return search results', async() => {
    await browser.get('https://www.google.com/');
    await $('#lst-ib').sendKeys('hello world');
    const googleSearchButton = $('.lsbb input[value="Google Search"]');
    await browser.wait(ExpectedConditions.elementToBeClickable(googleSearchButton));
    await googleSearchButton.click();
    const screenshot = await browser.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
  });
});
