class NavigationPanel{

    locators = {
        menuLink: '.oxd-sidepanel .oxd-main-menu-item-wrapper a'
    }

    clickTab(tabName){
        cy.contains(this.locators.menuLink, tabName).click();
    }

}


export default new NavigationPanel(); 