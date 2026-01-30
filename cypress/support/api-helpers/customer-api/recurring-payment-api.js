import { customerApiConfig } from './config';

Cypress.Commands.add('getRecurringPayments', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/recurring-payments`,
    auth: customerApiConfig.auth,
  });
});

Cypress.Commands.add('getRecurringPaymentById', (id) => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/recurring-payments/${id}`,
    auth: customerApiConfig.auth,
  });
});
