import { faker } from '@faker-js/faker';
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
    const comment = faker.lorem.sentence();
    const filename = 'test.txt';

    NavigationPanel.clickTab("My Info");

    MyInfoPage.clickAddAttachmentButton();
    MyInfoPage.addAttachment('cypress/fixtures/test.txt');
    MyInfoPage.fillAttachmentComment(comment);
    MyInfoPage.waitForFileToBeAttached(filename)
    MyInfoPage.clickSaveAttachmentButton();

    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentIsVisibleInTable(filename, comment, 'text/plain');

    MyInfoPage.downloadAttachment(filename);
    FileUtil.compareFiles('cypress/fixtures/test.txt', 'cypress/downloads/test.txt');

    MyInfoPage.deleteAttachment(filename);
    
    DeleteRecordPopup.confirmDelete();
    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentNotExistInTable(filename);
  })
})