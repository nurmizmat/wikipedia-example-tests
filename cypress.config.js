const { defineConfig } = require("cypress");
const dotenv = require('dotenv');
dotenv.config();

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  env: {
    apiKey: process.env.CYPRESS_API_KEY,
  },
  e2e: {
    baseUrl: "https://wikipedia.org",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
