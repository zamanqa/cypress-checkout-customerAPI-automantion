import CheckoutPageObject from "../../PageObject/checkoutPageObject";
const checkout_pageObject = new CheckoutPageObject();

const checkoutFunctions = {
  urlValidationTest: function () {
    cy.visit(
      Cypress.env("url") +
        Cypress.env("stripe_api_key") +
        Cypress.env("stripe_cart_id")
    ).wait(10000);
    cy.url()
      .should("include", Cypress.env("stripe_api_key"))
      .and("include", Cypress.env("stripe_cart_id"));
  },

  checkoutPageLoadedTest: function () {
    cy.contains("Address & Payment").should("be.visible");
  },

  selectCalendarDateTest: function () {
    checkout_pageObject.getFullForm().then(($fullForm) => {
      if ($fullForm.find("[data-test-id='delivery-date']").is(":visible")) {
        checkout_pageObject.getDeliveryDateField().click();

        checkout_pageObject
          .getSelectDeliveryDate()
          .each(($selectDate, index, $list) => {
            if ($selectDate.is(":enabled")) {
              cy.get($selectDate).click();
              return false;
            }
          });

        checkout_pageObject
          .getSelectDeliveryTimeSlot()
          .each(($selectSlot, index, $list) => {
            if ($selectSlot.eq(index).is(":enabled")) {
              cy.get($selectSlot.eq(index)).click();
              return false;
            }
          });

        checkout_pageObject.getClickSelect().click();
      } else {
        cy.log("Date field is not present");
      }
    });
  },

  firstNameLastNameEntryTest: function (firstName, lastName) {
    checkout_pageObject.getFirstName().clear().click().type(firstName);
    checkout_pageObject.getFirstName().should("have.value", firstName);
    checkout_pageObject.getLastName().clear().click().type(lastName);
    checkout_pageObject.getLastName().should("have.value", lastName);
  },

  emailFieldValidationTest: function (email) {
    checkout_pageObject.getEmailAddress().clear().click().type(email);
    checkout_pageObject.getEmailAddress().should("have.value", email);
  },

  enterPhoneNumberTest: function (phoneNumber) {
    checkout_pageObject.getPhoneNumber().type(phoneNumber);
    checkout_pageObject
      .getPhoneNumber()
      .should("have.value", "+49" + phoneNumber);
  },
};

export default checkoutFunctions;
