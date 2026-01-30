# Checkout E2E - Restructuring Plan

## Current vs Target Structure

### Current Structure (Disorganized)
```
cypress-checkout-customerAPI-automantion/
├── cypress/
│   ├── integration/              # ❌ Old Cypress folder name
│   │   ├── checkout/             # Mixed organization
│   │   └── customer_api_test/    # Mixed organization
│   ├── fixtures/
│   │   ├── apiKeyCartId.json
│   │   └── example.json
│   ├── PageObject/               # ❌ Inconsistent naming
│   │   ├── checkoutPageObject.js
│   │   ├── molliePayPageObject.js
│   │   ├── adyenPayPageObject.js
│   │   └── braintreePayPageObject.js
│   └── support/
│       ├── commands.js
│       ├── commonUtility.js
│       ├── databaseUtils.js
│       └── customer_api/
│           ├── config.js
│           ├── invoiceCommands.js
│           └── [other commands]
```

### Target Structure (Hub Pattern)
```
checkout-e2e/
├── config/                          # NEW - Configuration files
│   ├── environments/                # Environment configs
│   └── database/                    # Database configuration
│
├── cypress/
│   ├── e2e/                         # ✅ Cypress 10+ standard
│   │   ├── 01-checkout/             # Platform checkout tests
│   │   │   ├── 01-shopify/          # Shopify platform
│   │   │   │   ├── stripe-bacs.cy.js
│   │   │   │   ├── stripe-sepa.cy.js
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
│   │       │   └── orders.cy.js
│   │       ├── 02-customers/
│   │       │   └── customers.cy.js
│   │       ├── 03-invoices/
│   │       │   └── invoices.cy.js
│   │       ├── 04-payments/
│   │       │   └── payments.cy.js
│   │       ├── 05-subscriptions/
│   │       │   └── subscriptions.cy.js
│   │       ├── 06-deliveries/
│   │       │   └── deliveries.cy.js
│   │       ├── 07-draft-orders/
│   │       │   └── draft-orders.cy.js
│   │       ├── 08-transactions/
│   │       │   └── transactions.cy.js
│   │       ├── 09-recurring-payments/
│   │       │   └── recurring-payments.cy.js
│   │       ├── 10-product-tracking/
│   │       │   └── product-tracking.cy.js
│   │       ├── 11-product-variants/
│   │       │   └── product-variants.cy.js
│   │       ├── 12-retailers/
│   │       │   └── retailers.cy.js
│   │       ├── 13-vouchers/
│   │       │   └── vouchers.cy.js
│   │       └── 14-css/
│   │           └── css.cy.js
│   │
│   ├── fixtures/                    # Test data and selectors
│   │   ├── test-data/               # Static test data
│   │   │   ├── checkout-data.json
│   │   │   └── api-data.json
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
│   │   │   │   ├── CheckoutPage.js
│   │   │   │   └── PaymentPage.js
│   │   │   └── payments/            # Payment provider page objects
│   │   │       ├── MolliePayPage.js
│   │   │       ├── AdyenPayPage.js
│   │   │       ├── StripePayPage.js
│   │   │       └── BraintreePayPage.js
│   │   │
│   │   ├── database/                # Database integration
│   │   │   └── db-helper.js
│   │   │
│   │   ├── commands/                # Custom Cypress commands
│   │   │   ├── checkout-commands.js
│   │   │   └── api-commands.js
│   │   │
│   │   ├── api-helpers/             # API utilities
│   │   │   ├── customer-api/
│   │   │   │   ├── config.js
│   │   │   │   ├── invoice-api.js
│   │   │   │   ├── order-api.js
│   │   │   │   ├── customer-api.js
│   │   │   │   ├── payment-api.js
│   │   │   │   ├── subscription-api.js
│   │   │   │   └── [other api helpers]
│   │   │   └── index.js
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
│   ├── seed-test-data.js           # Database seeding
│   └── cleanup-database.js         # Cleanup scripts
│
├── docs/                           # Documentation
│   ├── project-structure.md
│   ├── test-writing-guide.md
│   ├── database-integration-guide.md
│   ├── customer-api-guide.md
│   └── claude-memory.md
│
├── .claude-memory/                 # Claude context (keep as-is)
│   ├── project-context.md
│   ├── session-history.md
│   ├── claude-instructions.md
│   └── README.md
│
├── cypress.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Migration Steps

### Phase 1: Create New Structure
1. ✅ Create `config/` directory
2. ✅ Create `cypress/e2e/` with numbered modules
3. ✅ Create `cypress/support/page-objects/` with sub-folders
4. ✅ Create `cypress/support/api-helpers/`
5. ✅ Create `cypress/support/database/`
6. ✅ Create `cypress/support/commands/`
7. ✅ Create `cypress/support/utils/`
8. ✅ Create `cypress/fixtures/test-data/`
9. ✅ Create `cypress/fixtures/selectors/`
10. ✅ Create `cypress/fixtures/api-keys/`
11. ✅ Create `scripts/`
12. ✅ Create `docs/`
13. ✅ Create `reports/`, `screenshots/`, `videos/`

### Phase 2: Move Files
1. Move test files from `integration/checkout/` → `e2e/01-checkout/[platform]/`
2. Move test files from `integration/customer_api_test/` → `e2e/02-customer-api/[module]/`
3. Move page objects from `PageObject/` → `support/page-objects/[category]/`
4. Move API commands from `support/customer_api/` → `support/api-helpers/customer-api/`
5. Move `databaseUtils.js` → `support/database/db-helper.js`
6. Move `commonUtility.js` → `support/utils/common-utils.js`
7. Move `commands.js` → `support/commands/checkout-commands.js`
8. Move `apiKeyCartId.json` → `fixtures/api-keys/`
9. Move `example.json` → `fixtures/test-data/checkout-data.json`

### Phase 3: Rename Files (Hub Naming Convention)
1. Rename `*.spec.js` → `*.cy.js`
2. Rename `checkoutPageObject.js` → `CheckoutPage.js`
3. Rename `molliePayPageObject.js` → `MolliePayPage.js`
4. Rename `adyenPayPageObject.js` → `AdyenPayPage.js`
5. Rename `braintreePayPageObject.js` → `BraintreePayPage.js`
6. Rename API command files to match pattern

### Phase 4: Update Imports
1. Update all test files to use new paths
2. Update page object imports
3. Update API helper imports
4. Update fixture paths in tests

### Phase 5: Documentation
1. Create `docs/project-structure.md`
2. Create `docs/test-writing-guide.md`
3. Create `docs/customer-api-guide.md`
4. Update `.claude-memory/project-context.md`
5. Update README.md with new structure

### Phase 6: Configuration
1. Update `cypress.config.js` for new structure
2. Create `.env.example`
3. Update `.gitignore` for new folders
4. Update package.json scripts

### Phase 7: Cleanup
1. Delete old `integration/` folder
2. Delete old `PageObject/` folder
3. Delete old `support/customer_api/` folder
4. Remove deprecated files

## File Naming Conventions

### Test Files
- **Format**: `[feature-name].cy.js`
- **Examples**:
  - `stripe-bacs.cy.js`
  - `mollie.cy.js`
  - `orders.cy.js`

### Page Objects
- **Format**: `[PageName]Page.js` (PascalCase)
- **Examples**:
  - `CheckoutPage.js`
  - `MolliePayPage.js`
  - `OrderListPage.js`

### API Helpers
- **Format**: `[module]-api.js`
- **Examples**:
  - `invoice-api.js`
  - `order-api.js`
  - `customer-api.js`

### Commands
- **Format**: `[module]-commands.js`
- **Examples**:
  - `checkout-commands.js`
  - `api-commands.js`

## Module Organization

Each checkout platform follows:
- Tests in: `/cypress/e2e/01-checkout/[platform]/`
- Page objects in: `/cypress/support/page-objects/checkout/`
- Payment page objects in: `/cypress/support/page-objects/payments/`

Each API module follows:
- Tests in: `/cypress/e2e/02-customer-api/[module]/`
- API helpers in: `/cypress/support/api-helpers/customer-api/`
- Commands in: `/cypress/support/commands/api-commands.js`

## Benefits of This Structure

1. ✅ **Clear Organization** - Easy to find tests by platform/module
2. ✅ **Scalability** - Easy to add new platforms or API modules
3. ✅ **Separation of Concerns** - Page objects, API helpers, utils separated
4. ✅ **Cypress 10+ Standard** - Uses `e2e/` instead of `integration/`
5. ✅ **Hub Pattern Consistency** - Matches hub-e2e-automation structure
6. ✅ **Better Maintainability** - Numbered modules show priority/sequence
7. ✅ **Documentation** - Dedicated docs folder with guides

## Next Steps

After restructuring:
1. Run tests to verify all imports work
2. Update documentation
3. Commit changes with clear message
4. Update .claude-memory/project-context.md
5. Create docs/test-writing-guide.md following hub pattern
