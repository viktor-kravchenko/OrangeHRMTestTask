import Element from "../../../utils/Element";
import validate from "../../../utils/validate";
import wait from "../../../utils/wait";
import DeleteRecordPopup from "../../popups/DeleteRecordPopup";

class AllUsersWidget {

    locators = {
        addUserButton: '.orangehrm-header-container button',
        tableRow: '.oxd-table-card',
        usernameColumn: '.oxd-table-cell:nth-child(2)',
        userRoleColumn: '.oxd-table-cell:nth-child(3)',
        employeeNameColumn: '.oxd-table-cell:nth-child(4)',
        statusColumn: '.oxd-table-cell:nth-child(5)',
        editUserIcon: '.bi-pencil-fill',
        deleteUserIcon: '.bi-trash'
    }

    waitForAnyTableRowToLoad(){
        wait.forElementToBeVisible(this.locators.tableRow)
    }

    clickAddUserButton() {
        cy.get(this.locators.addUserButton).click();
    }

    validateUserInTable(username, role, name, status) {
        validate.elementVisible({ selector: this.locators.usernameColumn, username })
        //validating role
        validate.elementVisible({
            parentSelector: this.locators.tableRow,
            parentText: username,
            selector: this.locators.userRoleColumn,
            text: role
        })
        //validating Employee name
        validate.elementVisible({
            parentSelector: this.locators.tableRow,
            parentText: username,
            selector: this.locators.employeeNameColumn,
            text: name
        })
        //validating Status
        validate.elementVisible({
            parentSelector: this.locators.tableRow,
            parentText: username,
            selector: this.locators.statusColumn,
            text: status
        })
    }

    clickEditUser(username){
         Element.get({
            parentSelector: this.locators.tableRow,
            parentText: username,
            selector: this.locators.editUserIcon
        })
            .click();
    }

    clickDeleteUser(username) {
        Element.get({
            parentSelector: this.locators.tableRow,
            parentText: username,
            selector: this.locators.deleteUserIcon
        })
            .click();
    }

    validateUserDoesntExistInTable(username){
        validate.elementNotExist({selector: this.locators.tableRow, text: username})
    }

    deleteUserIfExist(username){
        cy.get('body').then(($body) => {
            const matchingRows = $body.find(this.locators.tableRow + ':contains("' + username + '")');
            if (matchingRows.length > 0) {
                this.clickDeleteUser(username);
                DeleteRecordPopup.confirmDelete();
            }
        });
    }
}


export default new AllUsersWidget(); 