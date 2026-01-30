# Checkout E2E - Project Structure

**Last Updated:** 2026-01-27

## Directory Structure

```
checkout-e2e/
│
├── config/                          # Configuration files
│   ├── environments/                # Environment-specific configs
│   └── database/                    # Database configuration
│
├── cypress/
│   ├── e2e/                         # Test specifications
│   │   ├── 01-checkout/             # Platform checkout tests
│   │   │   ├── 01-shopify/          # Shopify platform
│   │   │   │   ├── stripe-bacs.cy.js
│   │   │   │   ├── stripe-sepa.cy.js
│   │   │   │   ├── stripe-op.cy.js
│   │   │   │   ├── mollie.cy.js
│   │   │   │   └── adyen.cy.js
│   │   │   ├── 02-saleor/           # Saleor platform
│   │   │   │   ├── stripe.cy.js
│   │   │   │   └── mollie.cy.js
│   │   │   ├── 03-woocommerce/      # WooCommerce platform
│   │   │   │   ├── stripe.cy.js
│   │   │   │   └── mollie.cy.js
│   │   │   └── 04-shopware5/        # Shopware5 platform
│   │   │       └── braintree.cy.js
│   │   │
│   │   └── 02-customer-api/         # Customer API tests
│   │       ├── 01-orders/
│   │       ├── 02-customers/
│   │       ├── 03-invoices/
│   │       ├── 04-payments/
│   │       ├── 05-subscriptions/
│   │       ├── 06-deliveries/
│   │       ├── 07-draft-orders/
│   │       ├── 08-transactions/
│   │       ├── 09-recurring-payments/
│   │       ├── 10-product-tracking/
│   │       ├── 11-product-variants/
│   │       ├── 12-retailers/
│   │       ├── 13-vouchers/
│   │       └── 14-css/
│   │
│   ├── fixtures/                    # Test data and selectors
│   │   ├── test-data/               # Static test data
│   │   │   └── checkout-data.json
│   │   ├── selectors/               # Platform-specific selectors
│   │   │   ├── shopify/
│   │   │   ├── saleor/
│   │   │   ├── woocommerce/
│   │   │   └── shopware5/
│   │   └── api-keys/                # API keys per platform
│   │       └── apiKeyCartId.json
│   │
│   ├── support/                     # Support files
│   │   ├── page-objects/            # Page Object Models
│   │   │   ├── base/                # Base page classes
│   │   │   │   └── BasePage.js
│   │   │   ├── checkout/            # Checkout page objects
│   │   │   │   └── CheckoutPage.js
│   │   │   └── payments/            # Payment provider page objects
│   │   │       ├── MolliePayPage.js
│   │   │       ├── AdyenPayPage.js
│   │   │       └── BraintreePayPage.js
│   │   │
│   │   ├── database/                # Database integration
│   │   │   └── db-helper.js
│   │   │
│   │   ├── commands/                # Custom Cypress commands
│   │   │   └── checkout-commands.js
│   │   │
│   │   ├── api-helpers/             # API utilities
│   │   │   └── customer-api/
│   │   │       ├── config.js
│   │   │       ├── invoice-api.js
│   │   │       ├── order-api.js
│   │   │       └── [other api helpers]
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   └── common-utils.js
│   │   │
│   │   └── e2e.js                   # Global support file
│   │
│   └── downloads/                   # Test downloads folder
│
├── reports/                         # Test execution reports
├── screenshots/                     # Test failure screenshots
├── videos/                          # Test execution videos
│
├── scripts/                         # Utility scripts
│
├── docs/                            # Documentation
│   ├── project-structure.md         # This file
│   └── test-writing-guide.md
│
├── .claude-memory/                  # Claude context files
│   ├── project-context.md
│   ├── session-history.md
│   ├── claude-instructions.md
│   └── README.md
│
├── cypress.config.js                # Cypress configuration
├── package.json                     # NPM dependencies
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

## Module Organization

### Checkout Tests (01-checkout)
Each platform has its own folder with tests organized by payment provider:
- **Location:** `/cypress/e2e/01-checkout/[platform]/`
- **Page Objects:** `/cypress/support/page-objects/checkout/`
- **Payment Objects:** `/cypress/support/page-objects/payments/`
- **Commands:** `/cypress/support/commands/checkout-commands.js`

### Customer API Tests (02-customer-api)
Each API module follows the pattern:
- **Location:** `/cypress/e2e/02-customer-api/[module]/`
- **API Helpers:** `/cypress/support/api-helpers/customer-api/`
- **Config:** `/cypress/support/api-helpers/customer-api/config.js`

## File Naming Conventions

### Test Files
- **Format:** `[feature-name].cy.js`
- **Examples:**
  - `stripe-bacs.cy.js`
  - `mollie.cy.js`
  - `orders.cy.js`

### Page Objects
- **Format:** `[PageName]Page.js` (PascalCase)
- **Examples:**
  - `CheckoutPage.js`
  - `MolliePayPage.js`
  - `BasePage.js`

### API Helpers
- **Format:** `[module]-api.js`
- **Examples:**
  - `invoice-api.js`
  - `order-api.js`
  - `customer-api.js`

### Commands
- **Format:** `[module]-commands.js`
- **Examples:**
  - `checkout-commands.js`

## NPM Scripts

### General
```bash
npm test                 # Run all tests headless
npm run test:headed      # Run all tests headed
npm run open             # Open Cypress UI
```

### Checkout Tests
```bash
npm run checkout:all         # All checkout tests
npm run checkout:shopify     # Shopify only
npm run checkout:saleor      # Saleor only
npm run checkout:woocommerce # WooCommerce only
npm run checkout:shopware5   # Shopware5 only
```

### API Tests
```bash
npm run api:all          # All API tests
npm run api:orders       # Orders API only
npm run api:customers    # Customers API only
npm run api:invoices     # Invoices API only
```

## Benefits of This Structure

1. ✅ **Clear Organization** - Easy to find tests by platform/module
2. ✅ **Scalability** - Easy to add new platforms or API modules
3. ✅ **Separation of Concerns** - Page objects, API helpers, utils separated
4. ✅ **Cypress 10+ Standard** - Uses `e2e/` instead of `integration/`
5. ✅ **Numbered Modules** - Shows priority and sequence
6. ✅ **Maintainability** - Consistent naming and structure
7. ✅ **Hub Pattern** - Matches hub-e2e-automation structure

## Next Steps

1. Read `test-writing-guide.md` for test patterns
2. Check `.claude-memory/` for project context
3. Use page objects for all UI interactions
4. Follow naming conventions strictly
