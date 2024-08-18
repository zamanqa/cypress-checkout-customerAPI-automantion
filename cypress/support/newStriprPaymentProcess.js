import "cypress-iframe";
import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterPaymentDetails = function (data) {
  const checkoutPageObject = new CheckoutPage();

  cy.get('iframe[title*="Secure payment input frame"]')
  .should("have.length", 1)
  .then(($iframe) => {
    const $body = $iframe.contents().find("body");
    cy.wrap($body).find('[name="number"]').click().clear().type(data.cardNumber);
    cy.wrap($body).find('input[name="expiry"]').click().clear().type(data.expireDate);
    cy.wrap($body).find('input[name="cvc"]').click().clear().type(data.cvc);
  });
  cy.contains("Select").click();
  cy.wait(5000);

};
