import { faker } from '@faker-js/faker';
import LoginPage from '../../../pages/LoginPage';
import NavigationPanel from '../../../pages/components/NavigationPanel';
import AllUsersWidget from '../../../pages/admin/UserManagement/AllUsersWidget';
import AddUserPage from '../../../pages/admin/UserManagement/AddUserPage';
import EditUserPage from '../../../pages/admin/UserManagement/EditUserPage';
import DeleteRecordPopup from '../../../pages/popups/DeleteRecordPopup';

describe('Create useser tests', () => {

  let username;
  let password;

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  it('create user', () => {
    username = faker.internet.username();
    password = faker.internet.password();

    const employeeName = 'Rahul Das';
    const employeeNameInTable = 'Rahul Das';
    const status = 'Enabled'

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
  });


  it('update user', () => {
    username = faker.internet.username();
    password = faker.internet.password();

    const employeeName = 'Rahul Das';
    const employeeNameInTable = 'Rahul Das';
    const status = 'Enabled'

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

  it('delete user', () => {
    username = faker.internet.username();
    password = faker.internet.password();

    const employeeName = 'Rahul Das';
    const employeeNameInTable = 'Rahul Das';
    const status = 'Enabled'

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

    AllUsersWidget.clickDeleteUser(username);
    DeleteRecordPopup.confirmDelete();
    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserDoesntExistInTable(username)
  })

  afterEach(() => {
    NavigationPanel.clickTab("Admin");
    AllUsersWidget.deleteUserIfExist(username);
  });
})