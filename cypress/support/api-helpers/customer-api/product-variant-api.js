// cypress/support/customer_api/productCommands.js
import { customerApiConfig } from './config';

Cypress.Commands.add('getCustomerProducts', () => {
  return cy.request({
    method: 'GET',
    url: `${customerApiConfig.baseUrl}/api/2025-01/products`,
    auth: customerApiConfig.auth,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getCustomerVariants', () => {
    return cy.request({
      method: 'GET',
      url: `${customerApiConfig.baseUrl}/api/2025-01/variants`,
      auth: customerApiConfig.auth,
      failOnStatusCode: false
    });
  });

  Cypress.Commands.add('getCustomerProductVariantsByVariantId', (variantId) => {
    return cy.request({
      method: 'GET',
      url: `${customerApiConfig.baseUrl}/api/2025-01/products/${variantId}/variants`,
      auth: customerApiConfig.auth,
      failOnStatusCode: false
    });
  });
  