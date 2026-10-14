import wait from "../../../utils/wait"
import validate from "../../../utils/validate"
import RecruitmentHeader from "../../components/RecruitmentHeader";
import Element from "../../../utils/Element";

class VacanciesPage extends RecruitmentHeader {

    locators = {
        filterFormRoot: '.oxd-table-filter',
        dropdownOptions: '[role="option"]',
        inputBlockRoot: '.oxd-input-field-bottom-space',
        inputDropdownRoot: '.oxd-select-wrapper',
        searchByFiltersButton: '.oxd-form-actions button[type="submit"]',
        tableRow: '.oxd-table-card',
        vacancyNameColumn: '.oxd-table-cell:nth-child(2)',
        jobTitleColumn: '.oxd-table-cell:nth-child(3)',
        HiringManagerNameColumn: '.oxd-table-cell:nth-child(4)',
        statusColumn: '.oxd-table-cell:nth-child(5)'
    }

    waitForFiltersFormToLoad(){
        wait.forElementToBeVisible(this.locators.filterFormRoot)
    }

    selectJobTitle(jobTitle){
        wait.forElementToBeVisible(this.locators.inputBlockRoot);
        Element.get({parentSelector: this.locators.inputBlockRoot, parentText: "Job Title", selector: this.locators.inputDropdownRoot}).click();
        cy.contains(this.locators.dropdownOptions, jobTitle).click();
    }

    selectVacancy(vacancyName){
        wait.forElementToBeVisible(this.locators.inputBlockRoot);
        Element.get({parentSelector: this.locators.inputBlockRoot, parentText: "Vacancy", selector: this.locators.inputDropdownRoot}).click();
        cy.contains(this.locators.dropdownOptions, vacancyName).click();
    }

    selectHiringManager(managerName){
        wait.forElementToBeVisible(this.locators.inputBlockRoot);
        Element.get({parentSelector: this.locators.inputBlockRoot, parentText: "Hiring Manager", selector: this.locators.inputDropdownRoot}).click();
        cy.contains(this.locators.dropdownOptions, managerName).click();
    }

    selectStatus(status){
        wait.forElementToBeVisible(this.locators.inputBlockRoot);
        Element.get({parentSelector: this.locators.inputBlockRoot, parentText: "Status", selector: this.locators.inputDropdownRoot}).click();
        cy.contains(this.locators.dropdownOptions, status).click();
    }

    clickSearchButton(){
        cy.contains(this.locators.searchByFiltersButton, "Search").click();
    }

    validateSearchResults({jobTitle='', vacancyName='', managerName='', status=''}){
        cy.get(this.locators.tableRow).then(($rows) => {
            if ($rows.length === 0) return;

            if (vacancyName) {
                cy.get(this.locators.vacancyNameColumn).each(($el) => {
                    cy.wrap($el).should('have.text', vacancyName);
                });
            }
            if (jobTitle) {
                cy.get(this.locators.jobTitleColumn).each(($el) => {
                    cy.wrap($el).should('have.text', jobTitle);
                });
            }
            if (managerName) {
                cy.get(this.locators.HiringManagerNameColumn).each(($el) => {
                    cy.wrap($el).should('have.text', managerName);
                });
            }
            if (status) {
                cy.get(this.locators.statusColumn).each(($el) => {
                    cy.wrap($el).should('have.text', status);
                });
            }
        });
    }
}


export default new VacanciesPage(); 