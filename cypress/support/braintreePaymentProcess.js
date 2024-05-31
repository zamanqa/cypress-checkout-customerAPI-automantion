import "cypress-iframe";
import MolliePayPageObject from "../PageObject/molliePayPageObject";
import CheckoutPageObject from "../PageObject/checkoutPageObject";
import BraintreePayPageObject from "../PageObject/braintreePayPageObject";

export const enterBraintreePaymentDetailsAndSubmit = function (data) {
  const checkoutPageElement = new CheckoutPageObject();
  const braintreePayPageObject = new BraintreePayPageObject();

  cy.readFile("cypress/fixtures/example.json").then((data) => {
    braintreePayPageObject.getClickOnCard().click();
    braintreePayPageObject
      .getClickOnCardNumber()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find("input[name='credit-card-number']")
          .click()
          .type(data.braintreeCardNumber);
      });

    cy.wait(1000);

    braintreePayPageObject
      .getClickOnCardExpiryDate()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find("input[name='expiration']")
          .click()
          .type(data.expireDate);
      });

    cy.wait(1000);

    braintreePayPageObject
      .getClickOnCardCvc()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body).find("input[name='cvv']").click().type(data.cvc);
      });

    cy.wait(1000);
  });
};
