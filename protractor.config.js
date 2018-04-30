'use strict';

const config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.11.0.jar',
  // seleniumPort: 4444,
  directConnect: false,

  specs: ['google.spec.js'],

  multiCapabilities: [{
    // platform: '',
    browserName: 'chrome',
    // version: '',
    chromeOptions: {
      args: [
        // 'device-scale-factor=1',
        // 'force-device-scale-factor=1',
        // 'headless',
        // 'ash-host-window-bounds=1920x1080*1',
        // 'window-size=1920,1080'
      ]
    },
    name: 'Chrome'
  }, {
    // platform: '',
    browserName: 'firefox',
    // version: '',
    // https://github.com/mozilla/geckodriver#webdriver-capabilities
    'moz:firefoxOptions': {
      args: [
        // '-headless',
      ]
    },
    name: 'Firefox'
  }],

  // Use async/await instead of the WebDriver Control Flow
  // https://www.protractortest.org/#/control-flow
  // https://www.protractortest.org/#/async-await
  // https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs
  SELENIUM_PROMISE_MANAGER: false,

  onPrepare: async() => {
    // browser.ignoreSynchronization = true;
    // https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load
    browser.waitForAngularEnabled(false);
    return browser.getProcessedConfig().then((config) => {
      // config.capabilities is the CURRENT capability being run, if you are using
      // multiCapabilities.
      /* eslint-disable no-console */
      console.log('Executing capability', config.capabilities);
    });
  }
};

// Test with Sauce Labs on Travis CI
if (process.env.CI) {
  delete config.seleniumAddress;
  delete config.seleniumJar;
  delete config.seleniumPort;

  Object.assign(config, {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
  });

  config.multiCapabilities.push(...['8.0', '9.0', '10.0', '11.0'].map((version) => ({
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: version,
    name: `Internet Explorer ${version} on Windows 7`
  })));

  config.multiCapabilities.push(...['13', '14', '15', '16'].map((version) => ({
    platform: 'Windows 10',
    browserName: 'microsoftedge',
    version: version,
    name: `Microsoft Edge ${version} on Windows 10`
  })));

  config.multiCapabilities.forEach(capabilities => {
    Object.assign(capabilities, {
      build: process.env.TRAVIS_BUILD_NUMBER,
      tags: [process.env.TRAVIS_NODE_VERSION, 'CI'],
      screenResolution: '1280x1024'
    });
  });
}

module.exports = { config };
