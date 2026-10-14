import cypress from "cypress";

class RecruitmentHeader{
    locators = {
        navigationButtons: '.oxd-topbar-body-nav-tab-item'
    }

    clickHeaderNavigationButton(buttonName){
        cypress.contains(this.locators.navigationButtons, buttonName).click()
    }
}

export default new RecruitmentHeader();