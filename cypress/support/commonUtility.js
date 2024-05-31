export function setupFixtureAndVisitUrl(apiKey, cartId) {
  beforeEach(function () {
    // Handle uncaught exceptions
    Cypress.on("uncaught:exception", (err, runnable) => {
      // Prevent the test from failing
      return false;
    });

    // Load fixture data and visit the URL
    cy.fixture("example").then((data) => {
      this.data = data; // make sure data is available within the test context
      const url = `${Cypress.env("url")}${apiKey}${cartId}`;
      cy.visit(url).wait(10000);
    });
  });
}
