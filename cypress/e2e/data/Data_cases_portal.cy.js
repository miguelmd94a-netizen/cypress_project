/// <reference types="Cypress" />


const page = "https://testing-dev.siviltech.com/"
const email = 'miguel+automation10@byyuto.com'
const email_2= "miguel+automationdev2@byyuto.com"
const password = "Pruebasbyyuto1!"
const wrong_email = "mguel+portaldev13@byyuto.com"
const wrong_password = "pruebasbyyuto1"

describe("Checking Data",() =>{
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


    it("User without cases",()=>{
        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).type(email);
        
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(password);
        cy.get('form').contains('LOGIN').click()

        cy.url().should('include','/cases');

        cy.get('.MuiTypography-root').should('contain','There are no cases created');
            
    })

    it('User with Cases',()=>{

        cy.get('.sc-hKFyIo > .MuiButton-outlined > .MuiButton-label').click();
        cy.url().should('include','/login');
        cy.get('#standard-basic').eq(0).then((element) =>{
            expect(element).to.have.attr('type','text');
        });
        cy.get('#standard-basic').eq(0).type(email_2);
        
        cy.get(':nth-child(2) > .MuiInputBase-root > #standard-basic').type(password);
        cy.get('form').contains('LOGIN').click()

        cy.url().should('include','/cases');
        
        cy.get('.MuiTableContainer-root').find('th').first().invoke('text').should('equal','Created Date');
        cy.get('.MuiTableContainer-root').find('tr').should('have.length',2);   
        cy.get('.MuiTableContainer-root').find('tr').eq(0).find('th').eq(1).invoke('text').should('equal','Tracking Number');
        cy.get('.MuiTableContainer-root').find('tr').eq(0).find('th').eq(2).then(($el)=>{
            const texto = $el.text();
            expect(texto).to.equal('Status');
        })
    
    });
        
})