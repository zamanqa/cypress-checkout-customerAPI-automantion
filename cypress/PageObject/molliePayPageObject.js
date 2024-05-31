class MolliePayPageObject {
  getClickOnCraditCard() {
    return cy.get("button[data-test-id='mollie-payment-method-creditcard']");
  }
  getClickOnCardNumber() {
    return cy.get('iframe[title*="cardNumber input"]');
  }
  getClickOnCardHolderName() {
    return cy.get('iframe[title*="cardHolder input"]');
  }
  getClickOnCardExpiryDate() {
    return cy.get('iframe[title*="expiryDate input"]');
  }
  getClickOnCardCvc() {
    return cy.get('iframe[title*="verificationCode input"]');
  }
}
export default MolliePayPageObject;
