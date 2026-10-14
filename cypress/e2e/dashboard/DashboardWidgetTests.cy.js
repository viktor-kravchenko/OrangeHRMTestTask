import LoginPage from '../../pages/LoginPage';
import NavigationPanel from '../../pages/components/NavigationPanel';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import Validate from '../../utils/validate';
import FileUtil from '../../utils/FileUtil';

describe('Dashboard widget tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  it('validate there are at least 2 widgets on the page', () => {
    NavigationPanel.clickTab('Dashboard');
    Validate.elementCountIsAtLeast({selector: DashboardPage.locators.dashboardWidget}, 2);
  })

  it('validate each widget from presentDashboardWidgets.csv are visible on the page', () => {
    NavigationPanel.clickTab('Dashboard');
    FileUtil.readCsv('cypress/fixtures/presentDashboardWidgets.csv').then((widgets) => {
      widgets.forEach((widget) => {
        DashboardPage.validateWidgetIsVisible(widget);
      });
    });
  })

  it('validate each widget from absentDashboardWidgets.csv are absent on the page', () => {
    NavigationPanel.clickTab('Dashboard');
    FileUtil.readCsv('cypress/fixtures/absentDashboardWidgets.csv').then((widgets) => {
      widgets.forEach((widget) => {
        DashboardPage.validateWidgetIsNotVisible(widget);
      });
    });
  })
})