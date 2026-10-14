class Logger {
    logMethodArgs(methodName, args = {}) {
        cy.log('================================');
        cy.log(`Method: ${methodName}`);
        cy.log(`Arguments: ${JSON.stringify(args)}`);
        cy.log('================================');
    }

    log(...messages) {
        messages.forEach(msg => cy.log(msg));
    }

    debug(...messages) {
        messages.forEach(msg => cy.log(`[DEBUG]: ${msg}`));
    }

    error(message) {
        cy.log(`[ERROR]: ${message}`);
    }
}

export default new Logger();