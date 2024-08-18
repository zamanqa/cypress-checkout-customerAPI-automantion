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
import CheckoutPageObject from "../../PageObject/checkoutPageObject";
import MolliePayPageObject from "../../PageObject/molliePayPageObject";
import { setupFixtureAndVisitUrl } from "../../support/commonUtility";
import apiKeyCartId from "../../fixtures/apiKeyCartId.json";

describe("Place Order for Saleor (shop system) Mollie (Payment method)- CompanyID (6134-61473234o4)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();
  // Define your apiKey and cartId
  const apiKey = apiKeyCartId.saleorMollie_api_key;
  const cartId = apiKeyCartId.saleorMollie_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Saleor Mollie and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.saleorMollie_api_key)
      .and("include", apiKeyCartId.saleorMollie_cart_id);
    cy.contains("Address & Payment").should("be.visible");

    enterCompanyName();
    selectCalendarDate();
    enterCompanyName();
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
    molliePaymentDetails();
    cy.wait(5000);
    cy.url().then((url) => {
      cy.log("Current URL:", url);
      saveOrderNumberToFixture();
      cy.wait(15000);
      cy.checkOrderExistsInDatabase();
    });
  });
});
