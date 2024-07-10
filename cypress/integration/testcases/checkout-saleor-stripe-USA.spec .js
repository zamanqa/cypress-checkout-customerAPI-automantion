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
import MolliePayPageObject from "../../PageObject/molliePayPageObject";
import { setupFixtureAndVisitUrl } from "../../support/commonUtility";
import apiKeyCartId from "../../fixtures/apiKeyCartId.json";

describe("Place Order for Saleor (shop system) Stripe (Payment method)- CompanyID (3976-45763665ye)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();
  const apiKey = apiKeyCartId.saleorStripe_api_key;
  const cartId = apiKeyCartId.saleorStripe_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Saleor Stripe and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.saleorStripe_api_key)
      .and("include", apiKeyCartId.saleorStripe_cart_id);
    cy.contains("Address & Payment").should("be.visible");
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
      this.data.streetName_usa,
      this.data.streetNo_usa,
      this.data.postCode_usa,
      this.data.city_usa,
      this.data.country_usa
    );
    enterNote();
    enterPaymentDetails(this.data);
    cy.contains("Select").click();
    cy.contains("Continue").click().wait(5000);
    checkoutPageElement.getCheckBox().each(($checkbox) => {
      cy.wrap($checkbox).click({ force: true }).should("be.checked");
    });
    checkoutPageElement.getClickOnPay().click().wait(15000);
    saveOrderNumberToFixture();
    cy.wait(15000);
    cy.checkOrderExistsInDatabase();
  });
});
