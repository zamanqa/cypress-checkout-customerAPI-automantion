// cypress/support/enterFullAddress.js
import CheckoutPage from "../PageObject/checkoutPageObject";

export const enterFullAddress = function (
  streetName,
  streetNo,
  postCode,
  city,
  country
) {
  const checkoutPageObject = new CheckoutPage();
  checkoutPageObject.getBillingAddress().click().type(streetName);
  checkoutPageObject.getBilling_Street().click().type(streetNo);
  checkoutPageObject.getPostCode().click().type(postCode);
  checkoutPageObject.getCity().click().type(city);

  cy.get("div[class='v-select__selections'] input").then(($btn) => {
    if ($btn.is(":enabled")) {
      cy.get($btn).click().wait(1000);
      cy.get("div[class='v-list-item__title']").then((selectCountry) => {
        cy.get(selectCountry).each(($el, index, $list) => {
          const selectedCountry = $el.text();
          if (selectedCountry.includes(country)) {
            cy.wrap($el).click();
            cy.log("The selected country is " + $el.text());
          }
        });
      });
    } else {
      cy.log("Country Field is Disabled");
    }
  });
};
