import '../../support/customer_api/deliveriesCommands';
import { customerApiConfig } from '../../support/customer_api/config';

describe('Deliveries API', () => {
  it.only('should get all deliveries and save the first shipping date', () => {
    cy.getAllDeliveries().then((shippingDate) => {
      cy.log(`Saved shipping date: ${shippingDate}`);
    });
  });

  it.only('should fetch delivery using saved shipping date', () => {
    const shippingDate = Cypress.env('shipping_date');
    expect(shippingDate).to.exist;

    cy.getDeliveryByDate(shippingDate).then((delivery) => {
      expect(delivery).to.have.property('shipping_date', shippingDate);
      cy.log(`Fetched delivery for: ${shippingDate}`);
    });
  });
});
