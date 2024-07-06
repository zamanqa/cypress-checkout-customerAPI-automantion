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

describe("Place Order for Woocommerce (shop system) Stripe (Payment method)- CompanyID (7172-31333938hq)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();

  const apiKey = apiKeyCartId.wocommerceStripe_api_key;
  const cartId = apiKeyCartId.wocommerceStripe_cart_id;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Woocommerce Stripe and Validate in CMS Database", function () {
    cy.url().should("include", apiKey).and("include", cartId);
    cy.contains("Address & Payment").should("be.visible");
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
    enterNote(this.data.note);
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
