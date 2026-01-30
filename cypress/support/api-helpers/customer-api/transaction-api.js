import { customerApiConfig } from './config';

Cypress.Commands.add('getCustomerTransactions', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/transactions`,
    auth: customerApiConfig.auth
  });
});

Cypress.Commands.add('getTransactionById', (transactionId) => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/transactions/${transactionId}`,
    auth: customerApiConfig.auth
  });
});
