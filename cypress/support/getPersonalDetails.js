// cypress/support/selectCalender.js

// cypress/support/enterNames.js

import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterPersonalDetails = function (
  firstName,
  lastName,
  email,
  phoneNumber
) {
  const checkoutPageObject = new CheckoutPage();
  checkoutPageObject.getFirstName().clear().click().type(firstName);
  checkoutPageObject.getFirstName().should("have.value", firstName);
  checkoutPageObject.getLastName().clear().click().type(lastName);
  checkoutPageObject.getLastName().should("have.value", lastName);
  checkoutPageObject.getEmailAddress().clear().click().type(email);
  checkoutPageObject.getEmailAddress().should("have.value", email);
  checkoutPageObject.getPhoneNumber().clear().type(phoneNumber);
  checkoutPageObject.getPhoneNumber().should("have.value", phoneNumber);
};
