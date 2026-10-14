import logger from "../../../utils/logger";
import wait from "../../../utils/wait";

class AddUserPage{
    locators = {
        formRoot: '.orangehrm-card-container',
        dropdownOptions: '[role="listbox"]',
        inputRoot: '.oxd-grid-item--gutters',
        passwordInputRoot: '.user-password-row .oxd-grid-item--gutters',
        saveButton: 'button[type="submit"]'
    }

    waitForformToLoad(){
        wait.forElementToBeVisible(this.locators.formRoot);
    }

    selectUserRole(role){
        cy.contains(this.locators.inputRoot, "User Role").click();
        cy.contains(this.locators.dropdownOptions, role).click();
    }

    selectUserStatus(status){
        logger.log(status)
        cy.contains(this.locators.inputRoot, "Status").click();
        cy.contains(this.locators.dropdownOptions, status).click();
    }

    fillEmployeeName(name){
        cy.contains(this.locators.inputRoot, "Employee Name").find('input').type(name)
        cy.contains(this.locators.dropdownOptions, name).click();
    }

    fillUserName(username){
        cy.contains(this.locators.inputRoot, "Username").find('input').type(username)
    }

    fillPassword(password){
        cy.contains(this.locators.passwordInputRoot, "Password").find('input').type(password);
    }

    fillConfirmPassword(password){
        cy.contains(this.locators.passwordInputRoot, "Confirm Password").find('input').type(password);
    }

    clickSaveButton(){
        cy.contains(this.locators.saveButton, "Save").click();
    }

}

export default new AddUserPage(); 