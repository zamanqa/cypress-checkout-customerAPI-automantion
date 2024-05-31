class CheckoutPageObject {
  getFullForm() {
    return cy.get(".v-stepper__items");
  }

  getFirstName() {
    return cy.get("[data-test-id='billing_firstname']");
  }

  getLastName() {
    return cy.get("[data-test-id='billing_lastname']");
  }

  getEmailAddress() {
    return cy.get("[data-test-id='email']");
  }

  getPhoneNumber() {
    return cy.get("[data-test-id='phone']");
  }

  getVatNumber() {
    return cy.get("[data-test-id='vat_number']");
  }

  getDeliveryDateField() {
    return cy.get("[data-test-id='delivery-date']");
  }

  getSelectDeliveryDate() {
    return cy.get(
      "tbody tr td button.v-btn.v-btn--text.v-btn--rounded.theme--light"
    );
  }

  getSelectDeliveryTimeSlot() {
    return cy.get(
      ".timeslot.v-btn.v-btn--outlined.theme--light.v-size--default"
    );
  }

  getClickSelect() {
    return cy.get(".v-card__actions button:nth-of-type(2)");
  }

  getSelectDateOfBirth() {
    return cy.get("[data-test-id='date_of_birth']");
  }

  getCompanyName() {
    return cy.get("[data-test-id='billing_company']");
  }

  getDoB_year() {
    return cy.get(".v-date-picker-years");
  }

  getDoB_Month() {
    return cy.get("tbody tr td button");
  }

  getDoB_date() {
    return cy.get("table tbody tr:nth-child(2) button");
  }

  getDoBSubmit() {
    return cy.get("div[class='v-card__actions'] span[class='v-btn__content']");
  }

  getBillingAddress() {
    return cy.get("[data-test-id='billing_street']");
  }
  getBilling_Street() {
    return cy.get("[data-test-id='billing_street_number']");
  }
  getPostCode() {
    return cy.get("[data-test-id='billing_postal_code']");
  }
  getCity() {
    return cy.get("[data-test-id='billing_city']");
  }
  getNote() {
    return cy.get("[data-test-id='billing_notes']");
  }
  getCardHolderName() {
    return cy.get("[data-test-id='input-stripe-name']");
  }
  getClickOnPay() {
    return cy.get("button[data-test-id='btn-pay']");
  }
  getOrderNumber() {
    return cy.get(".text--secondary.subtitle-1");
  }
  getCheckBox() {
    return cy.get("input[type='checkbox'][data-test-id='checkbox']");
  }
}
export default CheckoutPageObject;
