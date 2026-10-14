import LoginPage from '../../../pages/LoginPage';
import NavigationPanel from '../../../pages/components/NavigationPanel';
import VacanciesPage from '../../../pages/Recruitment/Vacancies/VacanciesPage';
import Wait from '../../../utils/wait';
import tabNames from '../../../consts/tabNames';

describe('Vacancies filter tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  it('filter by vacancy - Payroll Administrator', () => {
    const vacancy = 'Payroll Administrator';

    NavigationPanel.clickTab(tabNames.RECRUITMENT);  
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.selectVacancy(vacancy);
    VacanciesPage.clickSearchButton();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ vacancyName: vacancy });
  })

  it('filter by job title - Account Assistant', () => {
    const jobTitle = 'Account Assistant';

    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectJobTitle('Account Assistant');
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ jobTitle: jobTitle });
  })

  it('filter by hiring manager - Rahul Patil', () => {
    const hiringManager = 'Rahul Patil'
    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectHiringManager(hiringManager);
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ managerName: hiringManager });
  })

  it('filter by status - Active', () => {
    const status = 'Active'

    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.selectStatus(status);
    VacanciesPage.clickSearchButton();
    Wait.forTableLoaderToDisappear();
    VacanciesPage.validateSearchResults({ status: status });
  })
})