'use strict';

const config = {
  directConnect: true,
  specs: ['google.spec.js'],

  multiCapabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // 'force-device-scale-factor=1',
        // 'headless',
        // 'ash-host-window-bounds=1920x1080*1',
        // 'window-size=1920,1080'
        'disable-infobars',
      ]
    }
  }, {
    browserName: 'firefox',
    // https://github.com/mozilla/geckodriver#webdriver-capabilities
    'moz:firefoxOptions': {
      args: [
        // '-headless',
      ]
    }
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
    return browser.getProcessedConfig().then((/* config */) => {
      // config.capabilities is the CURRENT capability being run, if you are using
      // multiCapabilities.
      /* eslint-disable no-console */
      // DO NOT log `config.capabilities` since it contains the Sauce Labs Access Key.
      // console.log('Executing capability', config.capabilities);
    });
  }
};

// Test with Sauce Labs on Travis CI
if (process.env.CI) {
  delete config.directConnect;

  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.sauceBuild = `protractor-example#${process.env.TRAVIS_BUILD_NUMBER}`;
  config.maxSessions = 5;     // our Sauce Labs account has a concurrency limit of 5 VMs.

  config.multiCapabilities = [
    ...['8', '9', '10', '11'].map(version => ({
      platform: 'Windows 7',
      browserName: 'internet explorer',
      version,
      name: `Internet Explorer ${version} on Windows 7`
    })),

    ...['13', '14', '15', '16'].map(version => ({
      platform: 'Windows 10',
      browserName: 'microsoftedge',
      version,
      name: `Microsoft Edge ${version} on Windows 10`
    })),

    ...[
      [ 'OS X 10.9',   '7' ],
      [ 'OS X 10.10',  '8' ],
      [ 'OS X 10.11',  '9' ],
      [ 'OS X 10.11',  '10' ],
      [ 'macOS 10.12', '10' ],
      [ 'macOS 10.12', '11' ],
      [ 'macOS 10.13', '11' ]
    ].map(([platform, version]) => ({
      platform,
      browserName: 'safari',
      version,
      name: `Safari ${version} on ${platform}`
    }))
  ];

  for (let offset = 0; offset < 4; offset++) {
    config.multiCapabilities.push({
      platform: 'Windows 7',
      browserName: 'chrome',
      version: `latest-${offset}`,
      name: `Chrome latest-${offset} on Windows 7`
    });
  }

  for (let offset = 0; offset < 4; offset++) {
    config.multiCapabilities.push({
      platform: 'OS X 10.9',
      browserName: 'firefox',
      version: `latest-${offset}`,
      name: `Firefox latest-${offset} on OS X Mavericks 10.9`
    });
  }

  config.multiCapabilities.forEach(capabilities => {
    capabilities.screenResolution = '1280x960';
    capabilities.tags = [`Node ${process.env.TRAVIS_NODE_VERSION}`, 'CI'];
  });
}

module.exports = { config };
