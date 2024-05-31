///<reference types="Cypress" />

import "cypress-iframe";
import CheckoutPageObject from "../../PageObject/checkoutPageObject";

describe("My Second Test Suite", function () {
  const checkout_pageObject = new CheckoutPageObject();

  beforeEach(function () {
    // runs once before all tests in the block
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });

  it("url validation", function () {
    cy.visit(
      Cypress.env("url" ) +
    ).wait(10000);
    cy.url()
      .should("include", Cypress.env("stripe_api_key"))
      .and("include", Cypress.env("stripe_cart_id"));
  });

  it("Checkout Page loaded", function () {
    cy.contains("Address & Payment").should("be.visible");
  });
  // *************Select delivery date**********************
  it("Select Calender date", function () {
    checkout_pageObject.getFullForm().then(function ($fullForm) {
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
        cy.log("Date field filed is not present");
      }
    });
  });

  // *************Enter First Name and Last name**********************
  it("First Name and Last Name Entry", function () {
    checkout_pageObject
      .getFirstName()
      .clear()
      .click()
      .type(this.data.firstName);
    checkout_pageObject
      .getFirstName()
      .should("have.value", this.data.firstName);
    checkout_pageObject.getLastName().clear().click().type(this.data.lastName);
    checkout_pageObject.getLastName().should("have.value", this.data.lastName);
  });

  // *************Enter Email Address**********************
  it("Email Filed validation", function () {
    checkout_pageObject.getEmailAddress().clear().click().type(this.data.email);
    checkout_pageObject.getEmailAddress().should("have.value", this.data.email);
  });

  // *************Enter Phone Number**********************
  it("Enter Phone Number", function () {
    checkout_pageObject.getPhoneNumber().type(this.data.phoneNumber);
    checkout_pageObject
      .getPhoneNumber()
      .should("have.value", "+49" + this.data.phoneNumber);
  });

  // *************Enter Vat Number**********************
  it("Enter Vat Number", function () {
    checkout_pageObject.getFullForm().then(function ($fullForm) {
      if ($fullForm.find("[data-test-id='vat_number']").is(":visible")) {
        checkout_pageObject.getVatNumber().click().type(this.data.VatNumber);
        checkout_pageObject
          .getVatNumber()
          .should("have.value", this.data.VatNumber);
      } else {
        cy.log("Vat Number filed is not present");
      }
    });
  });

  //*************Enter Company Name Filed**********************
  it("Enter Company Name", function () {
    checkout_pageObject.getFullForm().then(function ($fullForm) {
      if ($fullForm.find("[data-test-id='billing_company']").is(":visible")) {
        checkout_pageObject
          .getCompanyName()
          .click({ force: true })
          .type(this.data.company_name);
        checkout_pageObject
          .getCompanyName()
          .should("have.value", this.data.company_name);
      } else {
        cy.log("Company Name filed is not present");
      }
    });
  });
  // *************Select Date of Birth**********************
  it("Select Date of Birth", function () {
    checkout_pageObject.getFullForm().then(function ($fullForm) {
      if ($fullForm.find("[data-test-id='date_of_birth']").is(":visible")) {
        checkout_pageObject.getSelectDateOfBirth().click();
        checkout_pageObject.getDoB_year().contains("2012").click();
        checkout_pageObject.getDoB_Month().contains("May").click();
        checkout_pageObject.getDoB_date().click();
        checkout_pageObject.getSelectDateOfBirth().click();
      } else {
        cy.log("Date of Birth is not present");
      }
    });
  });

  // *************Enter Full address**********************
  it("Enter Full address", function () {
    checkout_pageObject.getBillingAddress().click().type(this.data.streetName);

    checkout_pageObject.getPostCode().click().type(this.data.postCode);
    checkout_pageObject.getBilling_Street().click().type(this.data.streetNo);
    checkout_pageObject.getCity().click().type(this.data.city);
    cy.get("div[class='v-select__selections'] input").then(($btn) => {
      if ($btn.is(":enabled")) {
        cy.get($btn).click().wait(1000);
        cy.get("div[class='v-list-item__title']").then(
          function (selectCountry) {
            cy.get(selectCountry).each(($el, index, $list) => {
              const country = $el.text();
              if (country.includes(this.data.country)) {
                cy.wrap($el).click();
                cy.log("The selected country is " + $el.text());
              }
            });
          }
        );
      } else {
        cy.log("Country Filed is Disabled");
      }
    });
  });
  //*************Enter Note**********************
  it("Enter Note", function () {
    checkout_pageObject.getFullForm().then(function ($fullForm) {
      if ($fullForm.find("[data-test-id='billing_notes']").is(":visible")) {
        checkout_pageObject.getNote().click().type(this.data.note);
        checkout_pageObject.getNote().should("have.value", this.data.note);
      } else {
        cy.log("Note filed is not present");
      }
    });
  });

  it("Payment", function () {
    cy.contains("Pay with Card").click();
    checkout_pageObject.getCardHolderName().click().type("test");
    cy.typeInStripeIframe(
      'iframe[title*="Secure card payment input frame"]',
      '[name="cardnumber"]',
      "4242424242424242",
      'input[name="exp-date"]',
      "0330",
      'input[name="cvc"]',
      "333",
      'input[name="postal"]',
      "60320"
    );
    cy.contains(" Select").click();
    cy.contains("Continue").click().wait(5000);
  });

  it("Validation order confirmation", function () {
    cy.contains("I do not use the bike as a delivery driver")
      .click()
      .wait(1000);
    cy.contains("Marketing Consent").click().wait(1000);
    cy.get("button[data-test-id='btn-pay']").click().wait(30000);
    cy.url().should("include", "confirmation");
    // cy.get('.headline.text--secondary.text-capitalize').then(function ($orderNumber) {
    //     cy.log($orderNumber.text())
    // })
  });
});
