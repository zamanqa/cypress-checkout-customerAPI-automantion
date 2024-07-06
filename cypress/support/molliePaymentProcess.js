import "cypress-iframe";
import MolliePayPageObject from "../PageObject/molliePayPageObject";
import CheckoutPageObject from "../PageObject/checkoutPageObject";

export const molliePaymentDetails = function (data) {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  molliePayPageObject.getClickOnCraditCard().click();
  cy.contains("Continue").click().wait(15000);
  checkoutPageElement.getClickOnPay().click().wait(15000);
  cy.url().then((url) => {
    cy.log("Current URL:", url);
    cy.readFile("cypress/fixtures/example.json").then((data) => {
      data.paymentUrl = url;
      cy.writeFile("cypress/fixtures/example.json", data);
      cy.visit(url);
      cy.wait(5000);
      molliePayPageObject
        .getClickOnCardNumber()
        .should("have.length", 1)
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find("div.input-container").type(data.cardNumber);
        });
      molliePayPageObject
        .getClickOnCardHolderName()
        .should("have.length", 1)
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find("div.input-container").type(data.cardName);
        });

      molliePayPageObject
        .getClickOnCardExpiryDate()
        .should("have.length", 1)
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find("div.input-container").type(data.expireDate);
        });
      molliePayPageObject
        .getClickOnCardCvc()
        .should("have.length", 1)
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find("div.input-container").type(data.cvc);
        });

      cy.get("#submit-button").click().wait(30000);
    });
  });
};
