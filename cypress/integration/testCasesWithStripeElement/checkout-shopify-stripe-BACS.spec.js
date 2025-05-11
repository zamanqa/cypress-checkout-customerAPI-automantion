///<reference types="cypress" />
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

describe("Place Order for Shopify (shop system) Stripe (Payment method)- CompanyID (686f-475531631g)", function () {
  const checkoutPageElement = new CheckoutPageObject();
  const molliePayPageObject = new MolliePayPageObject();
  const apiKey = apiKeyCartId.shopifyStripe_api_key_bacs;
  const cartId = apiKeyCartId.shopifyStripe_cart_id_bacs;

  setupFixtureAndVisitUrl(apiKey, cartId);

  it("Complete an Order for Shopify Stripe and Validate in CMS Database", function () {
    cy.url()
      .should("include", apiKeyCartId.shopifyStripe_api_key_bacs)
      .and("include", apiKeyCartId.shopifyStripe_cart_id_bacs);
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
      this.data.postCode_uk,
      this.data.city_uk,
      this.data.country_uk
    );
    cy.wait(5000);
    enterNote(this.data.note);
    cy.wait(10000);
    cy.contains("Continue").click();
    cy.wait(10000);
    
  cy.get('iframe[title*="Secure payment input frame"]')
    .should("have.length", 1)
    .then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find('[data-testid="bacs_debit"]').click();
      cy.wrap($body).find('input[name="sortCode"]').click().type("108800");
      cy.wrap($body).find('input[name="accountNumber"]').click().type("00012345");
      cy.wrap($body).find('[id="Field-termsConfirmationCheckbox"]').click();
    });
    cy.wait(5000);
    cy.contains("Select").click();
    cy.wait(5000);

    cy.get('iframe[allow="payment *"]')
    .then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wait(5000);
      cy.wrap($body).find('div.SubmitButton-IconContainer').click({ multiple: true, force: true });
      cy.wait(5000);
    });

    checkoutPageElement.getClickOnPay().click().wait(17000);

    saveOrderNumberToFixture();
    cy.wait(15000);
    cy.checkOrderExistsInDatabase();
  });
});
