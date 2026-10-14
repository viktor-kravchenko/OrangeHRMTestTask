class DeleteRecordPopup{
    locators = {
        confirmDeleteButton: '.oxd-button--label-danger'
    }

    confirmDelete(){
        cy.contains(this.locators.confirmDeleteButton, "Yes, Delete").click()
    }
}

export default new DeleteRecordPopup(); 