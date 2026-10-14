
import Element from "./Element";

class Validate {
    elementContainText({parentSelector, parentText, selector, childText}, text) {
        Element.get({parentSelector, parentText, selector, text: childText}).should('contain.text', text);
    }

    elementHasText({parentSelector, parentText, selector, childText}, text) {
        Element.get({parentSelector, parentText, selector, text: childText}).should('have.text', text);
    }

    elementVisible({parentSelector, parentText, selector, text}) {
        Element.get({parentSelector, parentText, selector, text}).should('be.visible');
    }

    elementNotExist({parentSelector, parentText, selector, text}) {
         Element.get({parentSelector, parentText, selector, text}).should('not.exist');
    }

    elementCountIsAtLeast({parentSelector, parentText, selector, text}, count) {
        Element.get({parentSelector, parentText, selector, text}).its('length').should('be.at.least', count);
    }

    static elementVisibleAndContainText(selector, text) {
        cy.get(selector).should('be.visible').and('contain.text', text);
    }

    static elementVisibleAndHaveText(selector, text) {
        cy.get(selector).should('be.visible').and('have.text', text);
    }


}

export default new Validate();