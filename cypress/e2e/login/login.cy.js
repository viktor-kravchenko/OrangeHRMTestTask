import loginPage from '../../pages/LoginPage';

describe('Login tests', () => {

  beforeEach(() => {
    cy.visit('index.php');
  });

  it('Log in with correct credentials', () => {
    loginPage.loginWithCorrectCredentials();
    cy.url().should('include', '/dashboard/index');
  })

  it('Log in with wrong credentials', () => {
    loginPage.login('InvalidUser', 'WrongPass');
    loginPage.validateIncorrectCredentialsMessageDisplayed();
  })

  it('Send empty login form', () => {
    loginPage.clickLoginButton();
    loginPage.validateUsernameRequiredErrorDisplayed();
    loginPage.validatePasswordRequiredErrorDisplayed();
  })

})