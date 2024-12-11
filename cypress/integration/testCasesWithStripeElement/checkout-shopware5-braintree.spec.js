///<reference types="Cypress" />
import "cypress-iframe";
import { selectCalendarDate } from "../../support/selectCalender";
import { enterCompanyName } from "../../support/selectCompanyName";
import { enterVatNumber } from "../../support/getVatNumber";
import { enterPersonalDetails } from "../../support/getPersonalDetails";
import { enterFullAddress } from "../../support/getAddress";
import { enterNote } from "../../support/getNote";
import { selectDateOfBirth } from "../../support/selectDateOfBirth";
import { enterPaymentDetails } from "../../support/striprPaymentProcess";
import { saveOrderNumberToFixture } from "../../support/orderUtils";
import { checkOrderExistsInDatabase } from "../../support/databaseUtils";
import CheckoutPageObject from "../../PageObject/checkoutPageObject";
import BraintreePayPageObject from "../../PageObject/braintreePayPageObject";
import { enterBraintreePaymentDetailsAndSubmit } from "../../support/braintreePaymentProcess";
import { setupFixtureAndVisitUrl } from "../../support/commonUtility";
import apiKeyCartId from "../../fixtures/apiKeyCartId.json";

describe("Place Order for Shopware5 (shop system) Braintree (Payment method)- CompanyID (Key0)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const braintreePayPageObject = new BraintreePayPageObject();

  const apiKey = apiKeyCartId.shopware5Braintree_api_key;
  const cartId = apiKeyCartId.shopware5Braintree_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Woocommerce Stripe and Validate in CMS Database", function () {
    cy.url().should("include", apiKey).and("include", cartId);
    cy.contains("Address & Payment").should("be.visible");
    enterCompanyName(this.data.company_name);
    enterPersonalDetails(
      this.data.firstName,
      this.data.lastName,
      this.data.email,
      this.data.phoneNumber
    );
    selectDateOfBirth(this.data.DobYear, this.data.DobMonth, this.data.DobDate);
    enterFullAddress(
      this.data.streetName,
      this.data.streetNo,
      this.data.postCode,
      this.data.city,
      this.data.country
    );
    cy.wait(5000);
    enterNote(this.data.note);
    cy.contains("Continue").click().wait(15000)
    enterBraintreePaymentDetailsAndSubmit();
    cy.wait(5000);
    cy.contains("Select").click().wait(5000);
    braintreePayPageObject.getClickOnPay().click().wait(30000);

    saveOrderNumberToFixture();
    cy.wait(15000);
    cy.checkOrderExistsInDatabase();
  });
});
