import wait from "../../utils/wait";

class RecruitmentHeader {
    locators = {
        vacanciesTab: '.oxd-topbar-body-nav a'
    }

    clickVacanciesTab() {
        cy.contains(this.locators.vacanciesTab, "Vacancies").click();
        wait.forUrlTocontain("/viewJobVacancy", 30000)
    }
}

export default RecruitmentHeader;