# OrangeHRM — Cypress E2E Test Suite

E2E test suite for [OrangeHRM](https://opensource-demo.orangehrmlive.com) using Cypress 16 with the Page Object Model pattern.

## Prerequisites

- Node.js >= 18
- npm

## Installation
```bash
npm install
```
## Usage

### Run all tests (headless)

```bash
npm test
```

### Open Cypress runner (interactive)

```bash
npx cypress open
```

### Run a single test file (example)

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```
## Project structure

```
cypress/
├── e2e/                          # Test files
│   ├── login/                    # Login flow tests
│   │   └── login.cy.js           
│   ├── dashboard/                # Dashboard tests
│   │   └── DashboardWidgetTests.cy.js  
│   ├── admin/                    # Admin panel tests
│   │   └── userManagement/createUser.cy.js      
│   ├── my-info/                  # Personal information tests
│   │   └── MyInfo.cy.js          
│   └── recruitment/vacancies/    # Vacancy filter tests
│       └── VacanciesFilterTest.cy.js  
│
├── pages/                        # Page Object Model
│   ├── LoginPage.js
│   ├── components/               
│   │   ├── NavigationPanel.js    # Sidebar navigation
│   │   └── RecruitmentHeader.js  # Header for Recruitment page
│   ├── dashboard/
│   │   └── DashboardPage.js
│   ├── MyInfo/
│   │   └── MyInfoPage.js
│   ├── admin/UserManagement/
│   │   ├── AddUserPage.js
│   │   ├── EditUserPage.js
│   │   └── AllUsersWidget.js
│   ├── Recruitment/Vacancies/
│   │   └── VacanciesPage.js
│   └── popups/                  # site popups (confirmation, deletion, etc.)   
│       └── DeleteRecordPopup.js
│
├── utils/                        # Shared utilities
│   ├── Element.js                 # DOM element locator for complex
│   ├── validate.js                # Assertion helpers
│   ├── wait.js                    # Custom wait methods
│   ├── logger.js                  # Cypress-log-based logger
│   └── FileUtil.js                # Methods to work with files
│
├── fixtures/                     # Test data files
│   ├── test.txt                  # Sample attachment file
│   ├── presentDashboardWidgets.csv #CSV file with all dashboard widgets that should be visible
│   ├── absentDashboardWidgets.csv  #CSV file with all dashboard widgets that should be present on page
│   └── example.json
│
└── support/
    ├── e2e.js
    └── commands.js
```

## Configuration

Create `.env` in the project root:

```env
BASE_URL=
TEST_USERNAME=
TEST_PASSWORD=
```

The file is loaded automatically by `cypress.config.js` via dotenv


### Run a single test file (spec name)

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

## Tests

| File | Tests | What it covers |
|---|---|---|
| `login/login.cy.js` | 3 | Correct login, wrong credentials, empty form validation |
| `dashboard/DashboardWidgetTests.cy.js` | 3 | Widget count, present widgets from CSV, absent widgets from CSV |
| `admin/userManagement/createUser.cy.js` | 1 | Full CRUD: create → validate → edit → validate → delete → validate |
| `my-info/MyInfo.cy.js` | 1 | File attachment: add with comment → validate → download & compare → delete → validate |
| `recruitment/vacancies/VacanciesFilterTest.cy.js` | 4 | Filter by vacancy name, job title, hiring manager, status |
