// cypress/support/selectDateOfBirth.js
import CheckoutPage from "../PageObject/checkoutPageObject";

export const selectDateOfBirth = function (year, month, date) {
  const checkoutPageObject = new CheckoutPage();

  checkoutPageObject.getFullForm().then(function ($fullForm) {
    if ($fullForm.find("[data-test-id='date_of_birth']").is(":visible")) {
      checkoutPageObject.getSelectDateOfBirth().click({ force: true });
      checkoutPageObject.getDoB_year().contains(year).click({ force: true });
      checkoutPageObject.getDoB_Month().contains(month).click({ force: true });
      checkoutPageObject.getDoB_date().contains(date).click({ force: true });
      checkoutPageObject.getDoBSubmit().click({ multiple: true, force: true });
    } else {
      cy.log("Date of Birth field is not present");
    }
  });
};
//span[normalize-space()='Submit']
