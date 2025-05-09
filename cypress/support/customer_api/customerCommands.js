import { customerApiConfig } from './config';

Cypress.Commands.add('getAllCustomers', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/customers`,
    auth: customerApiConfig.auth
  });
});

// Get by customer id
Cypress.Commands.add('getCustomerById', (customerId) => {
    return cy.request({
      method: 'GET',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}`,
      auth: customerApiConfig.auth
    });
  });

  // get account balance
  Cypress.Commands.add('getCustomerBalance', (customerId) => {
    return cy.request({
      method: 'GET',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}/balance`,
      auth: customerApiConfig.auth
    });
  });

  //Add account Balance
  Cypress.Commands.add('addCustomerBalance', (customerId, amount) => {
    return cy.request({
      method: 'PUT',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}/balance`,
      auth: customerApiConfig.auth,
      body: {
        add: amount
      }
    });
  });

// Update customer details:
Cypress.Commands.add('updateCustomerExternalId', (customerId, externalId) => {
    return cy.request({
      method: 'PUT',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}`,
      auth: customerApiConfig.auth,
      body: {
        external_customer_id: externalId
      }
    });
  });

  
  Cypress.Commands.add('createCustomerReferralCode', (customerId) => {
    return cy.request({
      method: 'POST',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}/referral-code`,
      auth: customerApiConfig.auth,
      failOnStatusCode: false // In case referral code already exists
    });
  });
  
  Cypress.Commands.add('getCustomerReferralCode', (customerId) => {
    return cy.request({
      method: 'GET',
      url: `${customerApiConfig.baseUrl}/api/2025-01/customers/${customerId}/referral-code`,
      auth: customerApiConfig.auth
    });
  });
  
  Cypress.Commands.add('deleteReferralCodeFromDB', (referralCode) => {
    const query = `
      DELETE FROM checkout.checkout_voucher_codes 
      WHERE voucher_code IN ('${referralCode}')
    `;
    cy.task('queryDb', query).then((result) => {
      cy.log('Deleted referral code from DB if it existed');
    });
  });

  Cypress.Commands.add('deleteReferralByEmail', (email) => {
    const query = `
      DELETE FROM checkout.checkout_voucher_codes
      WHERE referrer_email IN ('${email}')
    `;
    return cy.task('queryDb', query).then((result) => {
      cy.log(`Referral code(s) deleted for email: ${email}`);
    });
  });
  
  
  
  
  