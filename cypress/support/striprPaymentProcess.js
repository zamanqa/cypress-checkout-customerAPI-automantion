import "cypress-iframe";
import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterPaymentDetails = function (data) {
  const checkoutPageObject = new CheckoutPage();

  cy.contains("Pay with Card").click();
  checkoutPageObject.getCardHolderName().click().type("Zaman");

  cy.get('iframe[title*="Secure card payment input frame"]')
    .should("have.length", 1)
    .then(($iframe) => {
      const $body = $iframe.contents().find("body");

      cy.wrap($body).find('[name="cardnumber"]').type(data.cardNumber);
      cy.wrap($body).find('input[name="exp-date"]').type(data.expireDate);
      cy.wrap($body).find('input[name="cvc"]').type(data.cvc);
      cy.wrap($body).find('input[name="postal"]').type(data.postalCode);
    });
};
