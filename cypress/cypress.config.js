const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://frontend:80",
    supportFile: false,
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
});