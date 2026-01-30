// ***********************************************
import '../support/customer_api/draftOrdersCommands';
import "cypress-iframe";
Cypress.Commands.add(
  "typeInStripeIframe",
  (
    iframeSelector,
    selectCardNumber,
    cardNumber,
    selectExpiredate,
    expiredate,
    selectCvc,
    cvc,
    selectZip,
    zipCode
  ) => {
    cy.get(iframeSelector)
      .iframe(iframeSelector)
      .then(($iframe) => {
        cy.wrap($iframe).find(selectCardNumber).type(cardNumber);
        cy.wrap($iframe).find(selectExpiredate).type(expiredate);
        cy.wrap($iframe).find(selectCvc).type(cvc);
        cy.wrap($iframe).find(selectZip).type(zipCode);
      });
  }
);

Cypress.Commands.add("customBeforeEach", function () {
  cy.fixture("example").then(function (data) {
    this.data = data;
  });
});

// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
