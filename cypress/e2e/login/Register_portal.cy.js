/// <reference types="Cypress" />

const page = 'https://testing-dev.siviltech.com/'
const page_signup = "https://testing-dev.siviltech.com/signup"
const first_name = 'Automation First Name'
const last_name = 'Automation Last Name'
const email_1 = 'miguel+automation20@test.com'
const email_2 = 'miguel+automation1@test.com'
const password_1 = 'Pruebastest1!'
const password_2 = 'pruebastest1!'
const password_3 = 'pruebastest2!'

describe("Register User",() =>{
    beforeEach(() => {
        cy.viewport('macbook-13');
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        cy.window().then((win) => {
            win.indexedDB.deleteDatabase('firebaseLocalStorageDb');
           });
           cy.visit(page);
    })
    
    it("Register with different password",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-contained > .MuiButton-label').click();
        cy.url().should('include','/signup');
        cy.get(':nth-child(1) > .MuiInputBase-root > #standard-basic').type(first_name);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(last_name);
        cy.get(':nth-child(3) > .MuiInputBase-root > #standard-basic').type(email_1);
        cy.get(':nth-child(4) > .MuiInputBase-root > #standard-basic').type(password_2);
        cy.get(':nth-child(5) > .MuiInputBase-root > #standard-basic').type(password_3);
        cy.get('#standard-basic-helper-text').should('contain','Both Passwords must match');
        //cy.get('form').contains('CREATE ACCOUNT').click();

    })

    it("Register with wrong password",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-contained > .MuiButton-label').click();
        cy.url().should('include','/signup');
        cy.get(':nth-child(1) > .MuiInputBase-root > #standard-basic').type(first_name);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(last_name);
        cy.get(':nth-child(3) > .MuiInputBase-root > #standard-basic').type(email_1);
        cy.get(':nth-child(4) > .MuiInputBase-root > #standard-basic').type(password_2);
        cy.get(':nth-child(5) > .MuiInputBase-root > #standard-basic').type(password_2);
        cy.get('form').contains('CREATE ACCOUNT').click();
        cy.get('#standard-basic-helper-text').should('contain','Password should be a minimum of 12 characters and include at least one uppercase letter, one lowercase letter, one number, and a special character.');
    })

    it("Register with a already registered email",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-contained > .MuiButton-label').click();
        cy.url().should('include','/signup');
        cy.get(':nth-child(1) > .MuiInputBase-root > #standard-basic').type(first_name);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(last_name);
        cy.get(':nth-child(3) > .MuiInputBase-root > #standard-basic').type(email_2);
        cy.get(':nth-child(4) > .MuiInputBase-root > #standard-basic').type(password_1);
        cy.get(':nth-child(5) > .MuiInputBase-root > #standard-basic').type(password_1);
        cy.get('form').contains('CREATE ACCOUNT').click();
        cy.get('#standard-basic-helper-text').should('contain','This email is already registered');
    })

    it("Register Successfully",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-contained > .MuiButton-label').click();
        cy.url().should('include','/signup');
        cy.get(':nth-child(1) > .MuiInputBase-root > #standard-basic').type(first_name);
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(last_name);
        cy.get(':nth-child(3) > .MuiInputBase-root > #standard-basic').type(email_1);
        cy.get(':nth-child(4) > .MuiInputBase-root > #standard-basic').type(password_1);
        cy.get(':nth-child(5) > .MuiInputBase-root > #standard-basic').type(password_1);
        cy.get('form').contains('CREATE ACCOUNT').click();
        cy.url().should('include','/cases');
    })
})