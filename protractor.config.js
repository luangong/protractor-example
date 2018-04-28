module.exports = {
  config: {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    specs: ['google.spec.js'],
    capabilities: {
      browserName: 'chrome',
      // screenResolution: '1024x768',
      chromeOptions: {
        args: [
          // 'device-scale-factor=1',
          'force-device-scale-factor=1',
          // 'ash-host-window-bounds=1920x1080*1',
          // 'window-size=1920,1080'
        ]
      }
    },
    onPrepare: async() => {
      // browser.ignoreSynchronization = true;
      // https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load
      browser.waitForAngularEnabled(false);
      const window = browser.driver.manage().window();
      console.log(await window.getSize());
      // window.setSize(1920, 1080);
      browser.getCapabilities().then(capabilities => {
        console.log(capabilities);
      });
    }
  }
};
