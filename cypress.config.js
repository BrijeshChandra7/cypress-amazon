const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  projectId: "id3fq4",
  watchForFileChanges: false,
  pageLoadTimeout: 120000,
  viewportHeight: 600,
  viewportWidth: 1000,
  e2e: {
    baseUrl: "https://www.amazon.in/",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
    },
  },
});
