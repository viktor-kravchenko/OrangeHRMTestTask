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
    LoginPage.loginWithCorrectCredentials()
    NavigationPanel.clickTab("Admin");
    AllUsersWidget.clickAddUserButton();
    AddUserPage.waitForformToLoad();
    AddUserPage.fillEmployeeName("Rahul Kumar Patel");
    AddUserPage.selectUserRole("Admin");
    AddUserPage.selectUserStatus("Enabled");
    AddUserPage.fillUserName("Testeee");
    AddUserPage.fillPassword("123456q");
    AddUserPage.fillConfirmPassword("123456q");
    AddUserPage.clickSaveButton();
    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserInTable("Testeee", "Admin", "Rahul Patel", "Enabled");

    AllUsersWidget.clickEditUser("Testeee")
    AddUserPage.waitForformToLoad();
    EditUserPage.selectUserRole("ESS")
    EditUserPage.clickSaveButton()

    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserInTable("Testeee", "ESS", "Rahul Patel", "Enabled");
    AllUsersWidget.clickDeleteUser("Testeee");
    DeleteRecordPopup.confirmDelete();
    AllUsersWidget.waitForAnyTableRowToLoad();
    AllUsersWidget.validateUserDoesntExistInTable("Testeee")
  })
})