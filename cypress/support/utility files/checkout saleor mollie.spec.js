///<reference types="Cypress" />
///<reference types="Cypress-iframe" />
import "cypress-iframe";
import { selectCalendarDate } from "../../support/selectCalender";
import { enterCompanyName } from "../../support/selectCompanyName";
import { enterVatNumber } from "../../support/getVatNumber";
import { enterPersonalDetails } from "../../support/getPersonalDetails";
import { enterFullAddress } from "../../support/getAddress";
import { molliePaymentDetails } from "../../support/mollieProcessPayment";
import { selectDateOfBirth } from "../../support/selectDateOfBirth";
import { saveOrderNumberToFixture } from "../../support/orderUtils";
import { checkOrderExistsInDatabase } from "../../support/databaseUtils";
import CheckoutPageObject from "../../PageObject/checkoutPageObject";
import MolliePayPageObject from "../../PageObject/molliePayPageObject";
import "cypress-iframe";

describe("Place Order for Saleor (shop system) Mollie (Payment method)- CompanyID (6134-61473234o4)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  beforeEach(function () {
    // Load fixture data and visit the URL
    cy.fixture("example").then((data) => {
      this.data = data;
      const url = `${Cypress.env("url")}${data.saleorMollie_api_key}${data.saleorMollie_cart_id}`;
      cy.visit(url).wait(10000);
    });
  });

  it("Checkout URL Load and validation", function () {
    cy.url()
      .should("include", this.data.saleorMollie_api_key)
      .and("include", this.data.saleorMollie_cart_id);
    cy.contains("Address & Payment").should("be.visible");

    enterVatNumber(this.data.vatNumber);
    enterCompanyName(this.data.company_name);
    selectCalendarDate();
    enterCompanyName(this.data.company_name);

    enterPersonalDetails(
      this.data.firstName,
      this.data.lastName,
      this.data.email,
      this.data.phoneNumber
    );
    selectDateOfBirth(this.data.year, this.data.month, this.data.date);
    enterFullAddress(
      this.data.streetName,
      this.data.streetNo,
      this.data.postCode,
      this.data.city,
      this.data.country
    );
    molliePayPageObject.getClickOnCraditCard().click();
    cy.contains("Continue").click().wait(5000);
    checkoutPageElement.getClickOnPay().click().wait(10000);
    cy.url().then((url) => {
      cy.log("Current URL:", url);
      cy.readFile("cypress/fixtures/example.json").then((data) => {
        data.paymentUrl = url;
        cy.writeFile("cypress/fixtures/example.json", data);
        cy.visit(url);
        cy.wait(5000);
        molliePayPageObject
          .getClickOnCardNumber()
          .should("have.length", 1)
          .then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find("div.input-container").type(data.cardNumber);
          });
        molliePayPageObject
          .getClickOnCardHolderName()
          .should("have.length", 1)
          .then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find("div.input-container").type(data.cardName);
          });

        molliePayPageObject
          .getClickOnCardExpiryDate()
          .should("have.length", 1)
          .then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find("div.input-container").type(data.expireDate);
          });
        molliePayPageObject
          .getClickOnCardCvc()
          .should("have.length", 1)
          .then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find("div.input-container").type(data.cvc);
          });

        cy.get("#submit-button").click().wait(25000);
      });
    });
    cy.url().then((url) => {
      cy.log("Current URL:", url);
      saveOrderNumberToFixture();
      cy.checkOrderExistsInDatabase();
    });
  });
});
