// cypress/support/selectCalender.js

import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterCompanyName = function (data) {
  const checkoutPageObject = new CheckoutPage();

  checkoutPageObject.getFullForm().then(function ($fullForm) {
    if ($fullForm.find("[data-test-id='billing_company']").is(":visible")) {
      checkoutPageObject
        .getCompanyName()
        .click({ force: true })
        .type(this.data.company_name);
      checkoutPageObject
        .getCompanyName()
        .should("have.value", this.data.company_name);
    } else {
      cy.log("Company Name field is not present");
    }
  });
};
