/// <reference types="Cypress" />

const page = "https://testing-dev.siviltech.com/"
const email = 'miguel+automation10@byyuto.com'
const password = "Pruebastest1!"


describe("Login User",() =>{
    beforeEach(() => {
        cy.viewport('macbook-13');
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          });
        
        //cy.clearIndexedDb('firebaseLocalStorageDb');
        cy.window().then((win) => {
            win.indexedDB.deleteDatabase('firebaseLocalStorageDb');
           });
        cy.visit(page);
        
    })

    it("Successful Logout",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).type(email);
        
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(password);
        cy.get('form').contains('LOGIN').click()
        cy.url().should('include','/cases');

        cy.get(':nth-child(2) > .MuiButton-label').click();
        cy.url().should('not.include','/cases')
    })

})

