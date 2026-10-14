import logger from "./logger";

class Element {

    static get({ parentSelector = '', parentText = '', selector = '', text = '' }) {
        //No parent element is used for search
        const hasParent = parentSelector !== '' || parentText !== '';
        const hasParentText = parentText !== '';
        const hasText = text !== '';

        if (!hasParent) {
            if (hasText) {
                return cy.contains(selector, text)
            }
            else {
                return cy.get(selector)
            }
        }
        //Searching from parent element
        else {
            //search only by locators
            if (!hasParentText && !hasText) {
                return cy.get(parentSelector).find(selector)
            }
            //search by locators and child element text
            if (!hasParentText) {
                return cy.get(parentSelector).contains(selector, text)
            }
            //search by locators and child parent text 
            if (!hasText) {
                return cy.contains(parentSelector, parentText).find(selector)
            }
            //default search - searching by elements locators and texts
            return cy.contains(parentSelector, parentText).contains(selector, text)
        }
    }
}


export default Element