Cypress.Commands.add("checkCustomerOrderExistsInDatabase", () => {
    const orderId = Cypress.env('orderId'); // read from env
  
    const queryString = `SELECT * FROM orders WHERE order_id = '${orderId}'`;
  
    cy.task("queryDb", queryString).then((result) => {
      expect(result.length).to.be.greaterThan(0);
      cy.log(`Order ID ${orderId} exists in the Orders table`);
    });
  });

  Cypress.Commands.add("checkCustomerOrderItemExistsInDatabase", () => {
    const orderId = Cypress.env('orderId'); // read from env
  
    const queryString = `SELECT * FROM order_items WHERE order_id = '${orderId}'`;
  
    cy.task("queryDb", queryString).then((result) => {
      expect(result.length).to.be.greaterThan(0);
      cy.log(`Order ID ${orderId} exists in the Order_items table`);
    });
  });
  