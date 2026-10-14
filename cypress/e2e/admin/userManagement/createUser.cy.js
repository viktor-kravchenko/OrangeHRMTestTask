import { faker } from '@faker-js/faker';
import LoginPage from '../../../pages/LoginPage';
import NavigationPanel from '../../../pages/components/NavigationPanel';
import AllUsersWidget from '../../../pages/admin/UserManagement/AllUsersWidget';
import AddUserPage from '../../../pages/admin/UserManagement/AddUserPage';
import EditUserPage from '../../../pages/admin/UserManagement/EditUserPage';
import DeleteRecordPopup from '../../../pages/popups/DeleteRecordPopup';

describe('Create useser tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
  });

  it('createUser', () => {
    const username = faker.internet.username();
    const password = faker.internet.password();

    //employee with this name might not be found due to site data updates.
    //If employee name cannot be found - change it to new valid employee name
    const employeeName = 'Rahul Das';
    const employeeNameInTable = 'Rahul Das';
    const status = 'Enabled'

    LoginPage.loginWithCorrectCredentials()
    NavigationPanel.clickTab("Admin");
    AllUsersWidget.clickAddUserButton();
    AddUserPage.waitForformToLoad();
    AddUserPage.fillEmployeeName(employeeName);
    AddUserPage.selectUserRole("Admin");
    AddUserPage.selectUserStatus(status);
    AddUserPage.fillUserName(username);
    AddUserPage.fillPassword(password);
    AddUserPage.fillConfirmPassword(password);
    AddUserPage.clickSaveButton();
    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserInTable(username, "Admin", employeeNameInTable, status);

    AllUsersWidget.clickEditUser(username)
    AddUserPage.waitForformToLoad();
    EditUserPage.selectUserRole("ESS")
    EditUserPage.clickSaveButton()

    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserInTable(username, "ESS", employeeNameInTable, status);
    AllUsersWidget.clickDeleteUser(username);
    DeleteRecordPopup.confirmDelete();
    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserDoesntExistInTable(username)
  })
})