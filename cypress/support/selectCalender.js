// cypress/support/selectCalender.js

import CheckoutPage from "../PageObject/checkoutPageObject";

export const selectCalendarDate = () => {
  const checkoutPageObject = new CheckoutPage();
  checkoutPageObject.getFullForm().then(($fullForm) => {
    if ($fullForm.find("[data-test-id='delivery-date']").is(":visible")) {
      checkoutPageObject.getDeliveryDateField().click();
      checkoutPageObject.getSelectDeliveryDate().each(($selectDate) => {
        if ($selectDate.is(":enabled")) {
          cy.wrap($selectDate).click();
          return false; // break out of the each loop
        }
      });
      checkoutPageObject
        .getSelectDeliveryTimeSlot()
        .each(($selectSlot, index) => {
          if ($selectSlot.eq(index).is(":enabled")) {
            cy.wrap($selectSlot).click();
            return false; // break out of the each loop
          }
        });
      checkoutPageObject.getClickSelect().contains("Select").click();
    } else {
      cy.log("Date field is not present");
    }
  });
};
