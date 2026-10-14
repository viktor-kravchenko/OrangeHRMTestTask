import logger from "../../../utils/logger";
import wait from "../../../utils/wait";

class EditUserPage{
    locators = {
        formRoot: '.orangehrm-card-container',
        dropdownRoot: '.oxd-grid-item--gutters .oxd-select-text-input',
        dropdownOptions: '[role="option"]',
        inputRoot: '.oxd-grid-item--gutters',
        saveButton: 'button[type="submit"]'
    }

    waitForformToLoad(){
        wait.forElementToBeVisible(this.locators.formRoot);
    }

    selectUserRole(role){
        cy.contains(this.locators.inputRoot, "User Role").click();
        cy.contains(this.locators.dropdownOptions, role).click();
    }

    clickSaveButton(){
        cy.contains(this.locators.saveButton, "Save").click();
    }

}

export default new EditUserPage(); 