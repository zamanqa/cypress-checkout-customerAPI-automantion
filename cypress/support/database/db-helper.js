// databaseUtils.js

Cypress.Commands.add("checkOrderExistsInDatabase", () => {
  // Read the order number from the example file
  cy.readFile("cypress/fixtures/example.json").then((data) => {
    const orderNumber = data.orderNumber;
    const queryString = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

    // Execute the query against the database
    cy.task("queryDb", queryString).then((result) => {
      // Assert that the order exists in the database
      expect(result.length).to.be.greaterThan(0);
      cy.log("Order number exists in the database");
    });
  });
});
