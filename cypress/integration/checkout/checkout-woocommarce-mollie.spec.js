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

describe("Place Order for Woccomarce (shop system) Mollie (Payment method)- CompanyID (566d-44583264mx)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  const apiKey = apiKeyCartId.wocommerceMollie_api_key;
  const cartId = apiKeyCartId.wocommerceMollie_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Woccomarce Mollie and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.wocommerceMollie_api_key)
      .and("include", apiKeyCartId.wocommerceMollie_cart_id);
    cy.contains("Address & Payment").should("be.visible");
    enterCompanyName(this.data.company_name);
    selectCalendarDate();

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
    cy.wait(8000);

    molliePaymentDetails();
    cy.url().then((url) => {
      cy.log("Current URL:", url);
      saveOrderNumberToFixture();
      cy.wait(17000);
      cy.checkOrderExistsInDatabase();
    });
  });
});
