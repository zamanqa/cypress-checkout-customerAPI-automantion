class AdyenPayPageObject {
  getClickOnCraditCard() {
    return cy.get("button[data-test-id='selection-btn-scheme']");
  }
  getClickOnCardNumber() {
    return cy.get('iframe[title*="Iframe for card number"]');
  }
  getClickOnCardHolderName() {
    return cy.get('input[name="holderName"]');
  }
  getClickOnCardExpiryDate() {
    return cy.get('iframe[title*="Iframe for expiry date"]');
  }
  getClickOnCardCvc() {
    return cy.get('iframe[title*="Iframe for security code"]');
  }
  getClickPassword() {
    return cy.get('iframe[title*="components iframe"]');
  }
}
export default AdyenPayPageObject;
