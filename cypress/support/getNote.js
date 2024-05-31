// cypress/support/enterNote.js
import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterNote = function (note) {
  const checkoutPageObject = new CheckoutPage();

  checkoutPageObject.getFullForm().then(function ($fullForm) {
    if ($fullForm.find("[data-test-id='billing_notes']").is(":visible")) {
      checkoutPageObject.getNote().click({ force: true }).type(note);
      checkoutPageObject.getNote().should("have.value", note);
    } else {
      cy.log("Note field is not present");
    }
  });
};
