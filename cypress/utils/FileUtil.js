class FileUtil {
    compareFiles(filePath1, filePath2) {
        return cy.readFile(filePath1).then((content1) => {
            return cy.readFile(filePath2).should('equal', content1);
        });
    }

    readCsv(filePath) {
        return cy.readFile(filePath).then((csv) => {
            return csv.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        });
    }
}

export default new FileUtil();