/// <reference types="cypress" />
import Validate from "../utils/validate";

class LoginPage {
    locators = {
        usernameInput: "input[name='username']:visible",
        passwordInput: "input[name='password']",
        loginButton: ".orangehrm-login-button",
        inputRow: ".oxd-input-field-bottom-space",
        inputRequiredMessage: ".oxd-input-field-error-message",
        invalidCredentialsMessage: ".orangehrm-login-error .oxd-alert"
    }

    fillUsername(username) {
        cy.get(this.locators.usernameInput).type(username);
    }

    fillPassword(password) {
        cy.get(this.locators.passwordInput).type(password, {log: false});

    }

    clickLoginButton() {
        cy.get(this.locators.loginButton).click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton()
    }

    loginWithCorrectCredentials() {
        cy.env(['TEST_USERNAME', 'TEST_PASSWORD']).then(
            ({ TEST_USERNAME, TEST_PASSWORD }) => {
                this.fillUsername(TEST_USERNAME);
                this.fillPassword(TEST_PASSWORD);
            }
        );
        this.clickLoginButton()
    }

    validateIncorrectCredentialsMessageDisplayed() {
        Validate.elementVisible({ selector: this.locators.invalidCredentialsMessage, text: "Invalid credentials" })
    }

    validateUsernameRequiredErrorDisplayed() {
        Validate.elementVisible({
            parentSelector: this.locators.inputRow,
            parentText: 'Username',
            selector: this.locators.inputRequiredMessage,
            text: 'Required'
        })
    }

    validatePasswordRequiredErrorDisplayed() {
        Validate.elementVisible({
            parentSelector: this.locators.inputRow,
            parentText: 'Password',
            selector: this.locators.inputRequiredMessage,
            text: 'Required'
        })
    }
}

export default new LoginPage(); 
