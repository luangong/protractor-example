'use strict';

describe('Google Search', () => {
  it('should return search results', async() => {
    await browser.get('https://www.google.com/');
    await $('[name=q]').sendKeys('hello world');
    const search = $('.lsbb input[value="Google Search"]');
    await browser.wait(ExpectedConditions.elementToBeClickable(search));
    await search.click();
  });
});
