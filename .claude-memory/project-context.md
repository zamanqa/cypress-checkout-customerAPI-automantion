# Project Context Memory

**Last Updated:** 2026-01-27

## Project Information

### Project Name
- **Current Name:** checkout-e2e
- **Old Name:** cypress-checkout-customerAPI-automantion (deprecated)
- **Location:** `C:\Users\shahi\Circuly Project\checkoutCutomerApi e2e\cypress-checkout-customerAPI-automantion`

### Repository
- **GitHub URL:** https://github.com/zamanqa/cypress-checkout-customerAPI-automantion.git
- **Main Branch:** main
- **Development Branch:** development
- **Both branches are synced and up to date**

## Technology Stack

### Testing Framework
- **Cypress:** v13.17.0 (upgraded from v10.11.0)
- **cypress-iframe:** v1.0.1
- **cypress-mochawesome-reporter:** v3.8.2

### Dependencies
- **Node.js packages:** dayjs, pg (PostgreSQL client)
- **Dev Dependencies:** mochawesome, prettier

### Database
- **Type:** PostgreSQL
- **Host:** circuly-development-v12.csmudpdd3zlm.eu-central-1.rds.amazonaws.com
- **Database:** postgres
- **Purpose:** Order validation and database testing

## Project Structure

```
checkout-e2e/
├── cypress/
│   ├── fixtures/
│   │   ├── apiKeyCartId.json          # API keys and cart IDs for different platforms
│   │   └── example.json               # Test data (git ignored locally)
│   ├── integration/
│   │   ├── checkout/                  # E2E checkout tests
│   │   │   ├── checkout-shopify-stripe-BACS.spec.js
│   │   │   ├── checkout-shopify-stripe-SEPA.spec.js
│   │   │   ├── checkout-shopify-mollie.spec.js
│   │   │   ├── checkout-shopify-adyen.spec.js
│   │   │   ├── checkout-saleor-stripe.spec.js
│   │   │   ├── checkout-saleor-mollie.spec.js
│   │   │   ├── checkout-woocommerce-stripe.spec.js
│   │   │   ├── checkout-woocommerce-mollie.spec.js
│   │   │   └── checkout-shopware5-braintree.spec.js
│   │   └── customer_api_test/         # Customer API tests
│   │       ├── CSS-customer-api.cy.js
│   │       ├── customers-customer-api.cy.js
│   │       ├── deliveries-customer-api.cy.js
│   │       ├── draft-orders-customer-api.cy.js
│   │       ├── invoices-customer-api.cy.js
│   │       ├── order-customer-api.cy.js
│   │       ├── payments-customer-api.cy.js
│   │       ├── product-tracking-customer-api.cy.js
│   │       ├── product-varients-customer-api.cy.js
│   │       ├── recurring-payments-customer-api.cy.js
│   │       ├── retailers-customer-api.cy.js
│   │       ├── subscriptions-customer-api.cy.js
│   │       ├── transactions-customer-api.cy.js
│   │       └── voucherTests.cy.js
│   ├── PageObject/
│   │   ├── checkoutPageObject.js
│   │   ├── molliePayPageObject.js
│   │   ├── adyenPayPageObject.js
│   │   └── braintreePayPageObject.js
│   └── support/
│       ├── commands.js
│       ├── commonUtility.js
│       ├── databaseUtils.js
│       └── customer_api/
│           ├── config.js              # Customer API base URL and auth
│           ├── invoiceCommands.js
│           ├── orderCommands.js
│           ├── customerCommands.js
│           └── [other API command files]
├── cypress.config.js
├── package.json
└── package-lock.json
```

## Test Types

### 1. Checkout Tests (E2E)
Tests various e-commerce platforms with different payment providers:
- **Platforms:** Shopify, Saleor, WooCommerce, Shopware5
- **Payment Providers:** Stripe (BACS, SEPA, Card), Mollie, Adyen, Braintree
- **Features Tested:** Product selection, checkout flow, payment processing, order creation

### 2. Customer API Tests
API integration tests for:
- Invoices (settle, refund)
- Orders
- Payments
- Deliveries
- Product tracking
- Subscriptions
- Customers
- Draft orders
- Transactions
- Vouchers
- Retailers

## NPM Scripts

```bash
# Run single spec file (headed)
npm run runOneSpecfile

# Run all checkout tests (headless)
npm run allCheckoutTestHeadless

# Run all checkout tests (headed)
npm run allCheckoutTestHead

# Run customer API tests (headed)
npm run customerApiTestHeaded

# Run customer API tests (headless)
npm run customerApiTestHeadedless

# Basic commands
npm test              # Default headless run
npm run headTest      # Headed mode
npm run chromeTest    # Chrome browser
npm run open          # Open Cypress UI
```

## Important Configuration Notes

### Git Ignore Configuration
- **File:** `cypress/fixtures/example.json`
- **Status:** Configured with `git update-index --assume-unchanged`
- **Purpose:** Test data changes locally without being tracked by git
- **Note:** Flag may reset on branch switches or certain git operations
- **Re-apply if needed:** `git update-index --assume-unchanged cypress/fixtures/example.json`

### Customer API Configuration
- **Base URL:** https://customers-api-development-680576524870.europe-west3.run.app
- **Auth:** Basic authentication (credentials in config.js)
- **API Version:** 2025-01

### Cypress Dashboard
- **Recording Key:** abe5b4e9-5926-48a0-9f89-2757dfda7a22
- **Project ID:** b68ot7

## Known Issues & Security

### Security Vulnerabilities
- **Total:** 8 vulnerabilities (2 low, 4 moderate, 2 high)
- **Action:** Run `npm audit fix` to address
- **Dependabot URL:** https://github.com/zamanqa/cypress-checkout-customerAPI-automantion/security/dependabot

### File Issues
- **Resolved:** `nul` file accidentally created (now removed)

## Recent Changes

### 2026-01-27
1. ✅ Upgraded Cypress from v10.11.0 to v13.17.0
2. ✅ Updated project name to "checkout-e2e"
3. ✅ Added 'open' script for Cypress UI
4. ✅ Configured git to ignore example.json changes
5. ✅ Removed example.json from git history
6. ✅ Synced both main and development branches
7. ✅ Removed accidental `nul` file

## Development Workflow

### Branch Strategy
- **main:** Production-ready code
- **development:** Active development
- **Both branches:** Should be kept in sync

### Before Making Changes
```bash
git status
git pull origin <branch-name>
```

### After Making Changes
```bash
git add <files>
git commit -m "Descriptive message"
git push origin <branch-name>
```

### Running Tests
```bash
# Local development (with UI)
npm run open

# Headless (CI-like)
npm run allCheckoutTestHeadless
npm run customerApiTestHeadedless
```

## Environment

- **Platform:** Windows (win32-x64)
- **OS Version:** 10.0.26100
- **Node.js:** Installed (version not tracked)
- **Cypress Cache:** C:\Users\shahi\AppData\Local\Cypress\Cache\13.17.0\Cypress

## Future Considerations

### Pending Renaming
If you want to rename the directory and GitHub repo:
1. Close all applications accessing the folder
2. Rename folder to `checkout-e2e`
3. Optionally rename GitHub repo (Settings → Repository name)
4. Update git remote: `git remote set-url origin https://github.com/zamanqa/checkout-e2e.git`

---

## Instructions for Claude

**When starting a new conversation:**
1. Read this file first: `.claude-memory/project-context.md`
2. Use this context instead of searching through chat history
3. Update this file when significant changes occur
4. Keep this file concise and relevant

**When to update this file:**
- Major version upgrades
- Project structure changes
- New test suites added
- Configuration changes
- Important decisions or issues resolved
- Git repository changes

**Update format:**
- Add date to "Recent Changes" section
- Update relevant sections (don't duplicate)
- Keep "Last Updated" date current
- Remove outdated information
