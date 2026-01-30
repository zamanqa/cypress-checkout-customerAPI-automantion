///<reference types="Cypress" />
///<reference types="Cypress-iframe" />
import "cypress-iframe";
import { selectCalendarDate } from "../../support/selectCalender";
import { enterCompanyName } from "../../support/selectCompanyName";
import { enterVatNumber } from "../../support/getVatNumber";
import { enterPersonalDetails } from "../../support/getPersonalDetails";
import { enterFullAddress } from "../../support/getAddress";
import { molliePaymentDetails } from "../../support/molliePaymentProcess";
import { selectDateOfBirth } from "../../support/selectDateOfBirth";
import { saveOrderNumberToFixture } from "../../support/orderUtils";
import { checkOrderExistsInDatabase } from "../../support/databaseUtils";
import AdyenPayPageObject from "../../PageObject/adyenPayPageObject";
import { enterAdyenPaymentDetailsAndSubmit } from "../../support/adyenPaymentProcess";
import CheckoutPageObject from "../../PageObject/checkoutPageObject";
import MolliePayPageObject from "../../PageObject/molliePayPageObject";
import { setupFixtureAndVisitUrl } from "../../support/commonUtility";
import apiKeyCartId from "../../fixtures/apiKeyCartId.json";

describe("Place Order for shopify (shop system) adyen (Payment method)- CompanyID (7a79-30433733la)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();
  // Define your apiKey and cartId
  const apiKey = apiKeyCartId.shopifyAdyen_api_key;
  const cartId = apiKeyCartId.shopifyAdyen_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Shopify Adyen and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.shopifyAdyen_api_key)
      .and("include", apiKeyCartId.shopifyAdyen_cart_id);
    cy.contains("Address & Payment").should("be.visible");

    enterPersonalDetails(
      this.data.firstName,
      this.data.lastName,
      this.data.email,
      this.data.phoneNumber
    );
    enterCompanyName(this.data.company_name);
    selectCalendarDate();

    selectDateOfBirth(this.data.year, this.data.month, this.data.date);
    enterFullAddress(
      this.data.streetName,
      this.data.streetNo,
      this.data.postCode,
      this.data.city,
      this.data.country
    );
    cy.wait(5000);
    cy.contains("Continue").click().wait(10000);
    enterAdyenPaymentDetailsAndSubmit();
    cy.wait(10000);

    saveOrderNumberToFixture();
    cy.wait(17000);
    cy.checkOrderExistsInDatabase();
  });
});
