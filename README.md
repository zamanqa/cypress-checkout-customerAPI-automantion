# Checkout E2E Automation

End-to-end testing framework for e-commerce checkout flows and Customer API validation.

## Project Overview

This project contains automated tests for:
- **Checkout Flows**: Multiple e-commerce platforms (Shopify, Saleor, WooCommerce, Shopware5) with various payment providers
- **Customer API**: Comprehensive API testing for customer management operations

### Technology Stack
- **Framework**: Cypress v13.17.0
- **Database**: PostgreSQL
- **Reporting**: Mochawesome
- **Language**: JavaScript

## Quick Start

### Installation
```bash
npm install
```

### Run Tests
```bash
# Open Cypress UI
npm run open

# Run all tests (headless)
npm test

# Run all tests (headed)
npm run test:headed
```

### Run Specific Test Suites

#### Checkout Tests
```bash
npm run checkout:all         # All platforms
npm run checkout:shopify     # Shopify only
npm run checkout:saleor      # Saleor only
npm run checkout:woocommerce # WooCommerce only
npm run checkout:shopware5   # Shopware5 only
```

#### Customer API Tests
```bash
npm run api:all          # All API tests
npm run api:orders       # Orders module
npm run api:customers    # Customers module
npm run api:invoices     # Invoices module
```

## Project Structure

```
checkout-e2e/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── 01-checkout/        # Platform checkout tests
│   │   └── 02-customer-api/    # API tests
│   ├── support/
│   │   ├── page-objects/       # Page Object Models
│   │   ├── api-helpers/        # API utilities
│   │   ├── commands/           # Custom commands
│   │   ├── database/           # DB integration
│   │   └── utils/              # Utilities
│   └── fixtures/               # Test data
├── docs/                       # Documentation
└── .claude-memory/             # AI context files
```

For detailed structure, see [docs/project-structure.md](docs/project-structure.md)

## Supported Platforms

### E-Commerce Platforms
- **Shopify** - Stripe (BACS, SEPA, OP), Mollie, Adyen
- **Saleor** - Stripe, Mollie
- **WooCommerce** - Stripe, Mollie
- **Shopware5** - Braintree

### Customer API Modules
1. Orders
2. Customers
3. Invoices
4. Payments
5. Subscriptions
6. Deliveries
7. Draft Orders
8. Transactions
9. Recurring Payments
10. Product Tracking
11. Product Variants
12. Retailers
13. Vouchers
14. CSS

## Configuration

### Environment Variables
Create `.env` file (see `.env.example`):
```env
CYPRESS_BASE_URL=https://your-checkout-url.com
DB_HOST=your-database-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
```

### Database
PostgreSQL connection configured in `cypress.config.js`

### API Keys
Update `cypress/fixtures/api-keys/apiKeyCartId.json` with platform credentials

## Documentation

- **[Project Structure](docs/project-structure.md)** - Detailed directory structure
- **[Claude Memory](.claude-memory/README.md)** - AI assistant context system

## Features

- ✅ Multi-platform checkout testing
- ✅ Payment provider integration testing
- ✅ Database validation
- ✅ API endpoint testing
- ✅ Page Object Model pattern
- ✅ Mochawesome reporting
- ✅ Screenshot/video capture on failure
- ✅ Retry logic for flaky tests

## Test Data

- **Checkout Data**: `cypress/fixtures/test-data/checkout-data.json`
- **API Keys**: `cypress/fixtures/api-keys/apiKeyCartId.json`
- **Selectors**: `cypress/fixtures/selectors/[platform]/`

## Reporting

Test reports are generated in:
- **HTML Reports**: `cypress/reports/`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

## Development

### Adding New Tests
1. Create test file in appropriate module folder
2. Follow naming convention: `[feature].cy.js`
3. Use page objects for UI interactions
4. Use API helpers for API calls

### Adding New Platforms
1. Create folder: `cypress/e2e/01-checkout/[platform]/`
2. Create page objects: `cypress/support/page-objects/[platform]/`
3. Update selectors: `cypress/fixtures/selectors/[platform]/`

## CI/CD

Tests can be run in CI with:
```bash
npm run test:headless
```

Recording key configured for Cypress Dashboard: `abe5b4e9-5926-48a0-9f89-2757dfda7a22`

## Support

For questions or issues:
1. Check [docs/project-structure.md](docs/project-structure.md)
2. Review [.claude-memory/project-context.md](.claude-memory/project-context.md)
3. Open an issue in the repository

## License

ISC

---

**Last Updated:** 2026-01-27
