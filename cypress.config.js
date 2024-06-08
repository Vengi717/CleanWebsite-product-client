const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: {
    "experimentalSessionAndOrigin": true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    baseUrl: 'http://localhost:8001',
  },
  component: {
    setupNodeEvents(on, config) { },
    specPattern: 'src/**/*spec.{js,jsx,ts,tsx}',
  },
 
})
