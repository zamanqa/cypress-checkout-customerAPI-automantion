import "cypress-iframe";
import MolliePayPageObject from "../PageObject/molliePayPageObject";
import CheckoutPageObject from "../PageObject/checkoutPageObject";
import AdyenPayPageObject from "../PageObject/adyenPayPageObject";

export const enterAdyenPaymentDetailsAndSubmit = function (data) {
  const checkoutPageElement = new CheckoutPageObject();
  const adyenPayPageObject = new AdyenPayPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  cy.readFile("cypress/fixtures/example.json").then((data) => {
    adyenPayPageObject.getClickOnCraditCard().click();
    adyenPayPageObject
      .getClickOnCardNumber()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedCardNumber']")
          .click()
          .type(data.adyenCardNumber);
      });

    cy.wait(1000);

    adyenPayPageObject
      .getClickOnCardExpiryDate()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedExpiryDate']")
          .click()
          .type(data.expireDate);
      });

    cy.wait(1000);

    adyenPayPageObject
      .getClickOnCardCvc()
      .should("have.length", 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find("body");
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedSecurityCode']")
          .click()
          .type(data.cvc);
      });

    cy.wait(1000);

    adyenPayPageObject.getClickOnCardHolderName().click().type(data.cardName);

    cy.contains("Select").click().wait(5000);

    cy.get("button[data-test-id='btn-pay']").click().wait(15000);

    cy.url().then((url) => {
      adyenPayPageObject
        .getClickPassword()
        .should("have.length", 1)
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find("input.input-field")
            .click()
            .type("password")
            .wait(1000);
          cy.wrap($body).find("#buttonSubmit").click().wait(30000);
        });
    });
  });
};
