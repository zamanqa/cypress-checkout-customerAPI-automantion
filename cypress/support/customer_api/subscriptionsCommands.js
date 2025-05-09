import { customerApiConfig } from './config';

// Fetch all subscriptions
Cypress.Commands.add('getCustomerSubscriptions', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions`,
    auth: customerApiConfig.auth
  });
});

// Fetch a single subscription by ID
Cypress.Commands.add('getSubscriptionById', (subscriptionId) => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions/${subscriptionId}`,
    auth: customerApiConfig.auth
  });
});

// Create a subscription
Cypress.Commands.add('createSubscription', (subscriptionData) => {
  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions`,
    body: subscriptionData,
    auth: customerApiConfig.auth,
    failOnStatusCode: false // Optional, if you're testing failure cases too
  });
});

// Delete the subscription from DB using subscription_id
Cypress.Commands.add('deleteSubscriptionFromDb', (subscriptionId) => {
  const query = `
    DELETE FROM public.subscriptions 
    WHERE subscription_id = '${subscriptionId}' 
    AND company_id IN ('734f-4c766638po');
  `;
  return cy.task('queryDb', query).then((result) => {
    cy.log(`Deleted subscription ${subscriptionId} from DB.`);
  });
});

// updates a subscription’s real_end_date
Cypress.Commands.add('updateSubscription', (subscriptionId, updateBody) => {
    return cy.request({
      method: 'PUT',
      url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions/${subscriptionId}`,
      body: updateBody,
      auth: customerApiConfig.auth
    });
  });

  // Add Note
  Cypress.Commands.add('addSubscriptionNote', (subscriptionId, notePayload) => {
    return cy.request({
      method: 'POST',
      url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions/${subscriptionId}/notes`,
      auth: customerApiConfig.auth,
      body: notePayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  // Update serial number
  Cypress.Commands.add('updateSubscription', (subscriptionId, updateBody) => {
    return cy.request({
      method: 'PUT',
      url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions/${subscriptionId}`,
      body: updateBody,
      auth: customerApiConfig.auth
    });
  });

  // reactivate subscription
  Cypress.Commands.add('reactivateSubscription', (subscriptionId) => {
    return cy.request({
      method: 'POST',
      url: `${customerApiConfig.baseUrl}/api/2025-01/subscriptions/${subscriptionId}/reactivate`,
      auth: customerApiConfig.auth
    });
  });
  
  
  
  
  
  
