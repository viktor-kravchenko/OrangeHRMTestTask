import Validate from "../../utils/validate";
import Element from "../../utils/Element";
import Wait from "../../utils/wait";
import DeleteRecordPopup from "../popups/DeleteRecordPopup";

class MyInfoPage {
    locators = {
        addAttachmentButton: '.orangehrm-attachment .oxd-button',
        fileAttachmentInput: '.orangehrm-attachment .oxd-file-input',
        attachedFileInInput: '.oxd-file-input-div',
        attachmentComment: '.orangehrm-attachment textarea',
        attachmentSaveButton: '.orangehrm-attachment button[type="submit"]',
        attachmentTable: '.orangehrm-attachment .oxd-table',
        attachmentTableRow: '.orangehrm-attachment .oxd-table-row',
        attachmentDescriptionColumn: '.oxd-table-cell:nth-child(3)',
        attachmentTypecolum: '.oxd-table-cell:nth-child(5)',
        downloadFileIcon: '.bi-download',
        deleteFileIcon: '.bi-trash'
    }

    clickAddAttachmentButton() {
        cy.contains(this.locators.addAttachmentButton, "Add").click()
    }

    fillAttachmentComment(comment) {
        cy.get(this.locators.attachmentComment).type(comment)
    }

    addAttachment(filePath) {
        cy.get(this.locators.fileAttachmentInput).selectFile(filePath, {force: true})
    }

    waitForFileToBeAttached(filename){
        Validate.elementVisible({selector: this.locators.attachedFileInInput, text: filename})
    }

    clickSaveAttachmentButton(){
        cy.contains(this.locators.attachmentSaveButton, "Save").click();
    }

    validateAttachmentIsVisibleInTable(filename, description, contentType) {
        Validate.elementVisible({ selector: this.locators.attachmentTableRow, text: filename })
        Validate.elementVisible({
            parentSelector: this.locators.attachmentTableRow,
            parentText: filename,
            selector: this.locators.attachmentDescriptionColumn,
            text: description
        })
        Validate.elementVisible({
            parentSelector: this.locators.attachmentTableRow,
            parentText: filename,
            selector: this.locators.attachmentTypecolum,
            text: contentType
        })
    }

    validateAttachmentNotExistInTable(filename) {
        Validate.elementNotExist({
            selector: this.locators.attachmentTableRow,
            text: filename
        })
    }

    downloadAttachment(filename) {
        Element.get({
            parentSelector: this.locators.attachmentTableRow,
            parentText: filename,
            selector: this.locators.downloadFileIcon,
        }).click();
    }

    deleteAttachment(filename) {
        Element.get({
            parentSelector: this.locators.attachmentTableRow,
            parentText: filename,
            selector: this.locators.deleteFileIcon,
        }).click();
    }

    deleteAttachmentIfExist(filename) {
        Wait.forElementToBeVisible(this.locators.attachmentTable);
        Wait.forTableLoaderToDisappear();
        cy.get('body').then(($body) => {
            const matchingRows = $body.find(this.locators.attachmentTableRow + ':contains("' + filename + '")');
            if (matchingRows.length > 0) {
                cy.wrap(matchingRows.first()).find(this.locators.deleteFileIcon).click();
                DeleteRecordPopup.confirmDelete();
                Wait.forTableLoaderToDisappear();
                Validate.elementNotExist({ selector: this.locators.attachmentTableRow, text: filename });
            }
        });
    }
}

export default new MyInfoPage(); 