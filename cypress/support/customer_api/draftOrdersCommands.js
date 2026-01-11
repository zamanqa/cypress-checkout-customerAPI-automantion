import { customerApiConfig } from './config';

Cypress.Commands.add('createDraftOrder', (payload) => {
  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/draft-orders`,
    auth: customerApiConfig.auth,
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 20000,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('order_checkout_link');

    // Save values to Cypress.env if needed
    Cypress.env('draftOrderId', response.body.id);
    Cypress.env('checkoutLink', response.body.order_checkout_link);

    return response.body;
  });
});

Cypress.Commands.add('getAllDraftOrders', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/draft-orders`,
    auth: customerApiConfig.auth,
    headers: { 'Content-Type': 'application/json' },
    timeout: 20000
  }).then((response) => {
    expect(response.status).to.eq(200);

    // Check if 'data' exists and it's an array
    const orders = response.body.data;
    if (Array.isArray(orders) && orders.length > 0) {
      // Return the first order object
      return orders[0];
    } else {
      throw new Error('No draft orders found.');
    }
  });
});

// In cypress/support/customer_api/draftOrdersCommands.js

Cypress.Commands.add('deleteDraftOrderById', (orderId) => {
  return cy.request({
    method: 'DELETE',
    url: `${customerApiConfig.baseUrl}/api/2025-01/draft-orders/${orderId}`,  // Construct the URL dynamically with orderId
    auth: customerApiConfig.auth,
    headers: { 'Content-Type': 'application/json' },
    timeout: 20000,  // Set the timeout to 20 seconds
    failOnStatusCode: false  // Allow the test to continue even if the response is a failure (e.g., 404, 401)
  }).then((response) => {
    // Assert the response status is 200 (OK)
    expect(response.status).to.eq(200);  // Ensure successful deletion
    cy.log(`Successfully deleted draft order with ID: ${orderId}`);
    // Do not return any synchronous value from here
    // Just perform the necessary Cypress assertions inside this block.
  });
});






