/**
 * Base Page Object
 * Contains common methods used across all page objects
 */
class BasePage {
  /**
   * Wait for an element to be visible
   * @param {Cypress.Chainable} element - Cypress element
   * @param {number} maxWait - Maximum wait time in milliseconds
   */
  waitForElement(element, maxWait = 5000) {
    return element.should('be.visible', { timeout: maxWait });
  }

  /**
   * Wait for page to load
   * @param {number} waitTime - Wait time in milliseconds
   */
  waitForPageLoad(waitTime = 3000) {
    cy.wait(waitTime);
  }

  /**
   * Click element with wait
   * @param {Cypress.Chainable} element - Cypress element
   * @param {number} waitAfter - Wait time after click
   */
  clickElement(element, waitAfter = 2000) {
    this.waitForElement(element);
    element.click();
    cy.wait(waitAfter);
  }

  /**
   * Type text into element with wait
   * @param {Cypress.Chainable} element - Cypress element
   * @param {string} text - Text to type
   * @param {number} waitAfter - Wait time after typing
   */
  typeText(element, text, waitAfter = 1000) {
    this.waitForElement(element);
    element.clear().type(text);
    cy.wait(waitAfter);
  }

  /**
   * Verify URL contains text
   * @param {string} text - Text to verify in URL
   */
  verifyUrl(text) {
    cy.url().should('include', text);
    cy.log(`✓ Verified: URL contains "${text}"`);
  }

  /**
   * Log success message
   * @param {string} message - Success message
   */
  logSuccess(message) {
    cy.log(`✓ Verified: ${message}`);
  }

  /**
   * Log warning message
   * @param {string} message - Warning message
   */
  logWarning(message) {
    cy.log(`⚠ Warning: ${message}`);
  }
}

export default BasePage;
