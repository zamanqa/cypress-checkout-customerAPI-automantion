///<reference types="Cypress" />
import "cypress-iframe";
import { selectCalendarDate } from "../../support/selectCalender";
import { enterCompanyName } from "../../support/selectCompanyName";
import { enterVatNumber } from "../../support/getVatNumber";
import { enterPersonalDetails } from "../../support/getPersonalDetails";
import { enterFullAddress } from "../../support/getAddress";
import { enterNote } from "../../support/getNote";
import { selectDateOfBirth } from "../../support/selectDateOfBirth";
import { enterPaymentDetails } from "../../support/newStriprPaymentProcess";
import { saveOrderNumberToFixture } from "../../support/orderUtils";
import { checkOrderExistsInDatabase } from "../../support/databaseUtils";
import CheckoutPageObject from "../../PageObject/checkoutPageObject";
import MolliePayPageObject from "../../PageObject/molliePayPageObject";
import { setupFixtureAndVisitUrl } from "../../support/commonUtility";
import apiKeyCartId from "../../fixtures/apiKeyCartId.json";

describe("Place Order for Shopify (shop system) Stripe (Payment method)- CompanyID (734f-4c766638po)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  const apiKey = apiKeyCartId.PO_api_key;
  const cartId = apiKeyCartId.PO_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Shopify Stripe and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.PO_api_key)
      .and("include", apiKeyCartId.PO_cart_id);
    cy.contains("Address & Payment").should("be.visible");
    selectCalendarDate();
    enterCompanyName(this.data.company_name);
    enterVatNumber(this.data.vatNumber);
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
    cy.wait(5000);
    enterNote(this.data.note);
    cy.wait(5000);
    cy.contains("Continue").click();
    cy.wait(5000);
    enterPaymentDetails(this.data);
    /* cy.get('iframe[title*="Secure payment input frame"]')
    .should("have.length", 1)
    .then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find('[name="number"]').click().clear().type("4242 4242 4242 4242");
      cy.wrap($body).find('input[name="expiry"]').click().clear().type("0330");
      cy.wrap($body).find('input[name="cvc"]').click().clear().type("737");
    });
    cy.contains("Select").click();
    cy.wait(5000);
    checkoutPageElement.getCheckBox().each(($checkbox) => {
    cy.wrap($checkbox).click({ force: true }).should("be.checked");
    });
    cy.wait(5000);
    checkoutPageElement.getClickOnPay().click().wait(17000);
    */
    checkoutPageElement.getCheckBox().each(($checkbox) => {
      cy.wrap($checkbox).click({ force: true }).should("be.checked");
      });
      cy.wait(5000);
      checkoutPageElement.getClickOnPay().click().wait(17000);
    saveOrderNumberToFixture();
    cy.wait(15000);
    cy.checkOrderExistsInDatabase();
  });
});
