const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  chromeWebSecurity: false,
  projectId: "b68ot7",
  reporter: "cypress-mochawesome-reporter",
  retries: {
    runMode: 1, // Number of retries for `cypress run`
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {
        async queryDb(queryString) {
          const { Client } = require("pg");
          const pgConfig = {
            user: "ZdFFUsWiIuILvub",
            password: "rxoz32pYOeqYEAMVG263",
            host: "circuly-development-v12.csmudpdd3zlm.eu-central-1.rds.amazonaws.com",
            database: "postgres",
            ssl: false,
            port: 5432,
          };
          const client = new Client(pgConfig);
          await client.connect();
          const res = await client.query(queryString);
          await client.end();
          return res.rows;
        },
      });
    },
    retries: {
      runMode: 1,
    },
    env: {
      url: "https://circuly-checkout-development.herokuapp.com/en/",
    },

    experimentalSessionAndOrigin: true,
    //specPattern: "cypress/integration/customer_api_test/*.js",
    specPattern: "cypress/integration/testCasesWithStripeElement/*.js",
  },
});