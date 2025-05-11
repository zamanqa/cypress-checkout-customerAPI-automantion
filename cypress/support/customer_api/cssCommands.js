import { customerApiConfig } from './config';

//Test 1
Cypress.Commands.add('getSubscriptionDeliveries', (subscriptionId) => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/deliveries`,
    auth: customerApiConfig.auth,
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response;
  });
});

//Test 2
Cypress.Commands.add('reportSubscriptionIssue', (subscriptionId, issuePayload) => {
  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/report-issue`,
    auth: customerApiConfig.auth,
    body: issuePayload,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property(
      'message',
      'Issue reported, mail sent and note saved.'
    );
    return response;
  });
});

//Test 3:Should update shipping date using deliveryId fetched from DB

Cypress.Commands.add('getLatestDeliveryIdBySubscription', (subscriptionId) => {
  const query = `
    select id from recurring_payments rp 
    where subscription_id = '${subscriptionId}'
    and (enabled = true) AND (deleted_at IS NULL)
    order by billing_date desc 
    limit 1
  `;

  return cy.task('queryDb', query).then((result) => result[0]?.id);
});

Cypress.Commands.add('updateShippingDate', (deliveryId, shippingDate, shift = true) => {
  const requestBody = {
    shift,
    shipping_date: shippingDate
  };

  return cy.request({
    method: 'PUT',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/deliveries/${deliveryId}/shipping-date`,
    auth: customerApiConfig.auth,
    body: requestBody,
    failOnStatusCode: false
  });
});

//Test:4
Cypress.Commands.add('changeSubscriptionFrequency', (subscriptionId, interval) => {
  const requestBody = {
    subscription_frequency: "monthly",
    subscription_frequency_interval: interval
  };

  return cy.request({
    method: 'PUT',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/change-frequency`,
    auth: customerApiConfig.auth,
    body: requestBody,
    failOnStatusCode: false
  });
});


// Test: 5
Cypress.Commands.add('bundleSwap', (subscriptionId, productVariantId) => {
  const requestBody = {
    product_variant_id: productVariantId
  };

  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/bundle-swap`,
    auth: customerApiConfig.auth,
    body: requestBody,
    failOnStatusCode: false
  });
});

//test 6
Cypress.Commands.add('cancelSubscription', (subscriptionId, payload) => {
  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/cancel`,
    auth: customerApiConfig.auth,
    body: payload,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property(
      'message',
      'Subscription cancelled, mail sent and note saved.'
    );
    return response;
  });
});


Cypress.Commands.add('processBuyout', (subscriptionId, buyoutPayload) => {
  return cy.request({
    method: 'POST',
    url: `${customerApiConfig.baseUrl}/api/2025-01/css/subscriptions/${subscriptionId}/process-buyout`,
    auth: customerApiConfig.auth,
    body: buyoutPayload,
    failOnStatusCode: false
  });
});



