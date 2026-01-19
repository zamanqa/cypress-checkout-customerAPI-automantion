# CLAUDE.MD - Project Context

## Project Overview
This is a Cypress-based automated testing project for checkout automation, specifically focused on Shopify checkout flows with Stripe payment integration.

**Project Name:** checkoutautomation
**Testing Framework:** Cypress v10.11.0
**Primary Focus:** E2E testing of checkout processes with Stripe Elements (BACS and other payment methods)

## Repository Structure

```
checkout/
├── cypress/
│   └── integration/
│       ├── checkout/    # Shopify-Stripe checkout tests
│       │   └── checkout-shopify-stripe-BACS.spec.js
│       └── customer_api_test/             # Customer API integration tests
│           └── *.cy.js
├── mochawesome-report/                    # Test reports directory
├── cypress.config.js                      # Cypress configuration
├── package.json                          # Dependencies and scripts
└── README                                # Project documentation
```

## Key Technologies

- **Cypress** (v10.11.0) - E2E testing framework
- **cypress-iframe** - Handling iframe interactions (Stripe Elements)
- **Mochawesome** - Test reporting
- **PostgreSQL** (pg library) - Database interactions
- **Day.js** - Date/time manipulation
- **Prettier** - Code formatting

## Available NPM Scripts

```bash
# Run single spec file (headed mode)
npm run runOneSpecfile

# Run all checkout tests (headless)
npm run allCheckoutTestHeadless

# Run all checkout tests (headed)
npm run allCheckoutTestHead

# Run customer API tests (headed)
npm run customerApiTestHeaded

# Run customer API tests (headless)
npm run customerApiTestHeadedless

# Basic test commands
npm test              # Default headless run
npm run headTest      # Headed mode
npm run chromeTest    # Chrome browser
```

## Git Information

**Current Branch:** angry-lumiere
**Main Branch:** main
**Worktree:** This is a git worktree for isolated development

### Recent Commits
- 7ee3c35 - Update Invoice Details
- 1dc2405 - update query to have correct invoice number
- e6bf02a - updated customer api file
- a1745b4 - added customerApiAllSpecFileHeadedNew

## Test Categories

### 1. Stripe Checkout Tests (`checkout/`)
Tests for Shopify checkout integration with Stripe payment elements:
- BACS Direct Debit payment method
- Other Stripe payment methods
- Iframe handling for secure payment forms

### 2. Customer API Tests (`customer_api_test/`)
API integration tests for customer-related operations:
- Customer data validation
- Invoice operations
- Database queries and verification

## Development Guidelines

### Working with Cypress Tests
- Use `--headed` flag during development for visual debugging
- Use `--headless` for CI/CD pipelines
- All tests are recorded to Cypress Dashboard (key configured in scripts)

### Database Testing
- PostgreSQL integration available via `pg` package
- Invoice number queries and validation
- Customer data verification

### Payment Testing Considerations
- Stripe Elements run in iframes (use `cypress-iframe` plugin)
- BACS Direct Debit requires specific test data
- Payment form interactions need iframe context switching

### Code Style
- Prettier configured for consistent formatting
- Run Prettier before committing changes

## Test Reporting
- Reports generated using Mochawesome
- HTML reports stored in `mochawesome-report/` directory
- Merging and generation handled by mochawesome toolchain

## Common Commands

```bash
# Open Cypress Test Runner
npx cypress open

# Run specific test file
npx cypress run --spec "cypress/integration/path/to/spec.js"

# Run with specific browser
npx cypress run --browser chrome --headed

# Generate test report
# (automatically generated after test runs)
```

## Environment Setup Requirements

1. Node.js and npm installed
2. Chrome browser for testing
3. PostgreSQL database access (for API tests)
4. Cypress Dashboard account (for recording, optional)
5. Stripe test account credentials (for payment tests)

## Worktree Information

This directory is a git worktree, allowing isolated work on the `angry-lumiere` branch without affecting the main repository at `D:\Cypress Tests\checkout`.

## Notes for AI Assistants

- Tests involve sensitive payment processing - handle test data carefully
- Database queries reference invoice numbers and customer data
- Stripe iframe interactions require special handling
- Test recordings send data to Cypress Dashboard
- Both headed and headless modes available for different use cases
