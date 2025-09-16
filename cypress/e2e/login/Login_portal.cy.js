/// <reference types="Cypress" />

const page = "https://testing-dev.siviltech.com/"
const email = 'miguel+automation10@test.com'
const password = "Pruebastest1!"
const wrong_email = "mguel+portaldev13@test.com"
const wrong_password = "pruebastest1"

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

    it("Wrong Login with email",()=>{
        
        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).type(wrong_email);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(password);
        cy.get('.MuiButton-label').eq(0).click();
        cy.get('#standard-basic-helper-text').should('contain','This email is not registered');

    })

    it("Wrong Login with password",()=>{
        
        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).clear().type(email);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').clear().type(wrong_password);
        cy.get('.MuiButton-label').eq(0).click();
        cy.get('#standard-basic-helper-text').should('contain','Please, check your credentials');

    })

    it("Successful Login",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).type(email);
        
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(password);
        cy.get('form').contains('LOGIN').click()
        cy.url().should('include','/cases');
    })

})