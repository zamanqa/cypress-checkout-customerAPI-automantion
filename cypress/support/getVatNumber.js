import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterVatNumber = function (data) {
  const checkoutPageObject = new CheckoutPage();

  checkoutPageObject.getFullForm().then(function ($fullForm) {
    if ($fullForm.find("[data-test-id='vat_number']").is(":visible")) {
      checkoutPageObject
        .getVatNumber()
        .click({ force: true })
        .type(this.data.vatNumber);
      checkoutPageObject
        .getVatNumber()
        .should("have.value", this.data.vatNumber); // Use data.vatNumber instead of this.data.vatNumber
    } else {
      cy.log("VAT Number field is not present");
    }
  });
};
