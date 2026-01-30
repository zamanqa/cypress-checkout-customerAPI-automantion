class BraintreePayPageObject {
  getClickOnCard() {
    return cy.get(".braintree-option.braintree-option__card");
  }
  getClickOnCardNumber() {
    return cy.get(
      'iframe[title*="Secure Credit Card Frame - Credit Card Number"]'
    );
  }
  getClickOnCardExpiryDate() {
    return cy.get(
      'iframe[title*="Secure Credit Card Frame - Expiration Date"]'
    );
  }
  getClickOnCardCvc() {
    return cy.get('iframe[title*="Secure Credit Card Frame - CVV"]');
  }
  getClickOnPay() {
    return cy.get("button[data-test-id='btn-pay']");
  }
}
export default BraintreePayPageObject;
