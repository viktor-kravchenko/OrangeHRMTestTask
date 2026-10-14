# OrangeHRM E2E Test Automation

End-to-end UI test suite for the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com/)
built with **Cypress + JavaScript**, using the **Page Object Model**.

## Project overview

Covered scenarios:

| # | Module | Spec |
|---|---|---|
| 1.1 | Login (positive, wrong credentials, empty form validation) | `e2e/login/login.cy.js` |
| 1.2 | Admin → User Management (create, edit, delete user) | `e2e/admin/userManagement/UserCRUDtests.cy.js` |
| 1.3 | My Info → Attachments (add with comment, download & compare, delete) | `e2e/my-info/MyInfo.cy.js` |
| 1.4 | Dashboard chart widgets with positive and negative assertions (CSV-driven) | `e2e/dashboard/DashboardWidgetTests.cy.js` |
| 1.5 | Recruitment → Vacancies search by filters | `e2e/recruitment/vacancies/VacanciesFilterTest.cy.js` |

## Prerequisites

- Node.js 18+ and npm
- Google Chrome (or any browser supported by Cypress)

## Setup

```bash
git clone <repo-url>
cd OrangeHRM
npm install
```

## Configuration

The project reads all environment-specific values (base URL and credentials) from environment variables. Nothing is hardcoded in the test code.

| Variable | Description |
|---|---|
| `BASE_URL` | Base URL of the application under test |
| `TEST_USERNAME` | Login username |
| `TEST_PASSWORD` | Login password |

### Local run

1. Create `.env` in the project root and fill in the values (demo credentials are displayed on the login page of the application).
2. The file is loaded automatically by `cypress.config.js` via `dotenv`.

### Security notes

- Values are read in the Node process (`cypress.config.js`) and forwarded to the browser-side Cypress env only under the keys `TEST_USERNAME`/`TEST_PASSWORD`.
- `BASE_URL` is used as the `baseUrl` and is never printed in test logs.

## Running the tests

| Command | Description |
|---|---|
| `npm test` | Whole suite, headless |
| `npx cypress open` | Interactive Test Runner |
| `npx cypress run --spec "cypress/e2e/login/login.cy.js"` | A single spec or folder |
| `npx cypress run --spec "cypress/e2e/admin/**"` | All specs inside a folder |

## Project structure

```
cypress/
├── e2e/                 # Test scenarios only, grouped by feature (login, dashboard, admin, my-info, recruitment)
├── pages/               # Page Object Model: one class per page; selectors live inside the class
│   └── components/      # Reusable widgets: NavigationPanel, RecruitmentHeader
│   └── popups/          # Reusable popups: DeleteRecordPopup
├── consts/              # Constant values for tests
├── utils/               # Shared helpers: Element (locator), validate, wait, logger, FileUtil
├── fixtures/            # Static test data (CSV dashboard widgets lists, test.txt attachment, JSON)
└── support/             # e2e.js and custom commands
```

## Approach

- **Page Object Model.** Tests contain only scenario steps and assertions; selectors and UI interactions live in page objects.
- **Reusable components and popups.** Repeated widgets (sidebar navigation, headers, delete confirmation popup) are shared classes.
- **Data-driven testing.** Cases for dashboard widgets come from CSV fixtures that define which widgets should be present and which must be absent.
- **CSV-driven checks.** Present and absent widget lists are stored as CSV files next to the fixtures.
- **Custom utilities.** `Element.js` provides a DOM element locator for complex selectors, `validate.js` holds assertion helpers, `wait.js` custom wait methods, `logger.js` logging helpers, and `FileUtil.js` methods to work with files.
- **Synchronisation.** Tests rely on custom wait methods instead of ad-hoc sleeps.

## Design decisions

- **UI-only.** The task describes UI-level E2E testing, so setup and cleanup also go through the UI. This is slower than API setup but stays within scope.
- **Locators.** OrangeHRM has no `data-testid`, so locators rely on stable `oxd-*` classes and other stable attributes.
- **File attach flows.** The My Info spec uploads a sample `test.txt` from fixtures, downloads it back and compares contents, then deletes the attachment.
- **Attachment cleanup.** The `cleanDownloads` task empties the Cypress downloads folder before a run.

## Known constraints of the test environment

- The demo is a **shared public environment**: data is reset periodically and other users can change global settings.
- Chart widgets are drawn on `<canvas>`: the suite validates presence/absence of widgets per the CSV lists, but tooltip text cannot be asserted through the DOM.
- Demo records referencing deleted entities are shown as "(Deleted)" and are skipped in filters.
- Locators were written against OrangeHRM 5.x and may need adjustment after UI updates.
- The public demo may be slow, so the default command timeout is raised to 15s in `cypress.config.js`.

## Roadmap

- Run against a self-hosted OrangeHRM instance (Docker) through `BASE_URL` for a stable, isolated environment.
- Move test data setup and cleanup to API calls to speed up runs, keeping the UI for the scenarios under test.
- Add Chromatic-style session reuse (`cy.session`) so only the login spec goes through the login form.
- Add Allure reporting and cross-browser runs in CI.