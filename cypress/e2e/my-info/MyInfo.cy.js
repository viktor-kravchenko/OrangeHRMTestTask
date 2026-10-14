import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/LoginPage';
import NavigationPanel from '../../pages/components/NavigationPanel';
import MyInfoPage from '../../pages/MyInfo/MyInfoPage';
import Wait from '../../utils/wait';
import FileUtil from '../../utils/FileUtil';
import DeleteRecordPopup from '../../pages/popups/DeleteRecordPopup';
import tabNames from '../../consts/tabNames';

describe('My Info attachment tests', () => {
  const filename = 'test.txt';
  const filePath = 'cypress/fixtures/test.txt';
  const downloadPath = `cypress/downloads/${filename}`;

  beforeEach(() => {
    cy.visit('index.php');
    LoginPage.loginWithCorrectCredentials()
  });

  afterEach(() => {
    NavigationPanel.clickTab(tabNames.MY_INFO);
    MyInfoPage.deleteAttachmentIfExist(filename);
  });

  it('test adding attachment', () => {
    const comment = faker.lorem.sentence();

    NavigationPanel.clickTab(tabNames.MY_INFO);
    MyInfoPage.clickAddAttachmentButton();
    MyInfoPage.addAttachment(filePath);
    MyInfoPage.fillAttachmentComment(comment);
    MyInfoPage.waitForFileToBeAttached(filename)
    MyInfoPage.clickSaveAttachmentButton();

    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentIsVisibleInTable(filename, comment, 'text/plain');
  })

  it('test downloading attachment', () => {
    const comment = faker.lorem.sentence();

    NavigationPanel.clickTab(tabNames.MY_INFO);
    MyInfoPage.clickAddAttachmentButton();
    MyInfoPage.addAttachment(filePath);
    MyInfoPage.fillAttachmentComment(comment);
    MyInfoPage.waitForFileToBeAttached(filename);
    MyInfoPage.clickSaveAttachmentButton();

    Wait.forTableLoaderToDisappear();
    MyInfoPage.downloadAttachment(filename);
    FileUtil.compareFiles(filePath, downloadPath);
  })

  it('test deleting attachment', () => {
    const comment = faker.lorem.sentence();

    NavigationPanel.clickTab(tabNames.MY_INFO);
    MyInfoPage.clickAddAttachmentButton();
    MyInfoPage.addAttachment(filePath);
    MyInfoPage.fillAttachmentComment(comment);
    MyInfoPage.waitForFileToBeAttached(filename)
    MyInfoPage.clickSaveAttachmentButton();

    Wait.forTableLoaderToDisappear();
    MyInfoPage.deleteAttachment(filename);
    DeleteRecordPopup.confirmDelete();
    Wait.forTableLoaderToDisappear();
    MyInfoPage.validateAttachmentNotExistInTable(filename);
  })
})