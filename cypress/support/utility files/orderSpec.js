describe("Database Query Test", () => {
  it("Should execute a query against the database", () => {
    // Read the order number from the example file
    cy.readFile("cypress/fixtures/example.json").then((data) => {
      const orderNumber = data.orderNumber;
      const queryString = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

      // Execute the query against the database
      cy.task("queryDb", queryString).then((result) => {
        if (result.length > 0) {
          // Order exists in the database
          cy.log("Order number exists in the database");
        } else {
          // Order does not exist in the database
          cy.log("Order number does not exist in the database");
        }
      });
    });
  });
});
