const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    watchForFileChanges: false,
    pageLoadTimeout: 240000,
    testIsolation: false,
    "requestTimeout" : 30000,
    "numTestsKeptInMemory": 0,
    "responseTimeout" : 50000,
  },
});