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

  it('filter by vacancy', () => {
    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();

    cy.get(VacanciesPage.locators.vacancyNameColumn).then(($cells) => {
      const valid = $cells.filter(':not(:contains("Deleted"))');
      if (valid.length === 0) throw new Error('No vacancy names found for validation');
      const value = valid.first().text().trim();

      VacanciesPage.selectVacancy(value);
      VacanciesPage.clickSearchButton();
      VacanciesPage.waitForFiltersFormToLoad();
      Wait.forTableLoaderToDisappear();
      VacanciesPage.validateSearchResults({ vacancyName: value });
    });
  })

  it('filter by job title', () => {
    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();

    cy.get(VacanciesPage.locators.jobTitleColumn).then(($cells) => {
      const valid = $cells.filter(':not(:contains("Deleted"))');
      if (valid.length === 0) throw new Error('No job titles found for validation');
      const value = valid.first().text().trim();

      VacanciesPage.selectJobTitle(value);
      VacanciesPage.clickSearchButton();
      Wait.forTableLoaderToDisappear();
      VacanciesPage.validateSearchResults({ jobTitle: value });
    });
  })

  it('filter by hiring manager', () => {
    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();

    cy.get(VacanciesPage.locators.HiringManagerNameColumn).then(($cells) => {
      const valid = $cells.filter(':not(:contains("Deleted"))');
      if (valid.length === 0) throw new Error('No hiring managers found for validation');
      const value = valid.first().text().trim();

      VacanciesPage.selectHiringManager(value);
      VacanciesPage.clickSearchButton();
      Wait.forTableLoaderToDisappear();
      VacanciesPage.validateSearchResults({ managerName: value });
    });
  })

  it('filter by status', () => {
    NavigationPanel.clickTab(tabNames.RECRUITMENT);
    VacanciesPage.clickVacanciesTab();
    VacanciesPage.waitForFiltersFormToLoad();
    Wait.forTableLoaderToDisappear();

    cy.get(VacanciesPage.locators.statusColumn).then(($cells) => {
      const valid = $cells.filter(':not(:contains("Deleted"))');
      if (valid.length === 0) throw new Error('No status values found for validation');
      const value = valid.first().text().trim();

      VacanciesPage.selectStatus(value);
      VacanciesPage.clickSearchButton();
      Wait.forTableLoaderToDisappear();
      VacanciesPage.validateSearchResults({ status: value });
    });
  })
})