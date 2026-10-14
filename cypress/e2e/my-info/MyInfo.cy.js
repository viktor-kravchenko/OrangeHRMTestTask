import LoginPage from '../../pages/LoginPage';
import NavigationPanel from '../../pages/components/NavigationPanel';
import MyInfoPage from '../../pages/MyInfo/MyInfoPage';
import Wait from '../../utils/wait';
import FileUtil from '../../utils/FileUtil';
import DeleteRecordPopup from '../../pages/popups/DeleteRecordPopup';

describe('My Info attachment tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  it('add, download, and delete attachment', () => {
    NavigationPanel.clickTab("My Info");

    MyInfoPage.clickAddAttachmentButton();
    MyInfoPage.addAttachment('cypress/fixtures/test.txt');
    MyInfoPage.fillAttachmentComment("Test comment");
    MyInfoPage.waitForFileToBeAttached('test.txt')
    MyInfoPage.clickSaveAttachmentButton();

    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentIsVisibleInTable('test.txt', 'Test comment', 'text/plain');

    MyInfoPage.downloadAttachment('test.txt');
    FileUtil.compareFiles('cypress/fixtures/test.txt', 'cypress/downloads/test.txt');

    MyInfoPage.deleteAttachment('test.txt');
    
    DeleteRecordPopup.confirmDelete();
    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentNotExistInTable('test.txt');
  })
})