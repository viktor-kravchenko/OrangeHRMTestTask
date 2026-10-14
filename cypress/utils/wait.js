class Wait {

    locators = {
        tableLoader: '.oxd-table-loader'
    }
    /**
     * Method for overriring default waits for elements for secific element
     * @param {*} selector - Element selector
     * @param {*} timeout - new timeout
     */
    forElementToBeVisible(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('be.visible');
    }

    forTableLoaderToDisappear(){
        cy.get(this.locators.tableLoader).should('not.exist');
    }

    forUrlTocontain(url, timeout=15000){
        cy.url({ timeout: timeout }).should('include', url);
    }
}

export default new Wait();