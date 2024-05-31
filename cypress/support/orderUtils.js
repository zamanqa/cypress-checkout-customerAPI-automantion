// cypress/support/selectCalender.js

import CheckoutPage from "../PageObject/checkoutPageObject";

export const saveOrderNumberToFixture = () => {
  const checkoutPageElement = new CheckoutPage();

  return checkoutPageElement
    .getOrderNumber()
    .invoke("text")
    .then((text) => {
      const orderNumber = text.match(/\d+/)[0]; // Extracts the first number in the text
      cy.log("Order Number:", orderNumber);
      // Save order number to a fixture
      cy.readFile("cypress/fixtures/example.json").then((data) => {
        // Update the order number in the existing data
        data.orderNumber = orderNumber;
        // Write the updated data back to the fixture file
        cy.writeFile("cypress/fixtures/example.json", data);
      });
    });
};
