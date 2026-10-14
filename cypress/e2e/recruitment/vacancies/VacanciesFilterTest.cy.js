import LoginPage from '../../../pages/LoginPage';
import NavigationPanel from '../../../pages/components/NavigationPanel';
import VacanciesPage from '../../../pages/Recruitment/Vacancies/VacanciesPage';
import Wait from '../../../utils/wait';

describe('Vacancies filter tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  it('filter by vacancy - Payroll Administrator', () => {
    NavigationPanel.clickTab('Recruitment');
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.selectVacancy('Payroll Administrator');
    VacanciesPage.clickSearchButton();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ vacancyName: 'Payroll Administrator' });
  })

  it('filter by job title - Account Assistant', () => {
    NavigationPanel.clickTab('Recruitment');
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectJobTitle('Account Assistant');
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ jobTitle: 'Account Assistant' });
  })

  it('filter by hiring manager - Rahul Patil', () => {
    NavigationPanel.clickTab('Recruitment');
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectHiringManager('Rahul Patil');
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ managerName: 'Rahul Patil' });
  })

  it.skip('filter by status - Active', () => {
    LoginPage.login(Cypress.env('username'), Cypress.env('password'));
    NavigationPanel.clickTab('Recruitment');
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectStatus('Active');
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ status: 'Active' });
  })
})