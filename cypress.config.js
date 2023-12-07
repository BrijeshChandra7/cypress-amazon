const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'id3fq4', 
  watchForFileChanges : false,
  e2e: {
    baseUrl : "https://www.amazon.in/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
