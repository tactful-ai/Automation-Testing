/// <reference types="cypress"/>

export function navigate(){
    cy.visit('https://dstnyengage.com/')
}


export function login(businessEmailData,passwordData){
    cy.get('.kl-navbar__end > .kl-navbar__button > span').click()
    cy.visit('https://app.dstnyengage.com/v/engage/erp/customers')
    cy.get('#username').type(businessEmailData)
    cy.get('#password').type(passwordData)
    cy.get('#kc-form-buttons').click()
}

export function faqs(){
    cy.visit('https://app.qa.dev.tactful.ai/v/engage/erp/faq')
    cy.get('[aria-colindex="1"] > div').should('have.text','Title')
    cy.get('[aria-colindex="2"] > div').should('have.text','Answer')
    cy.get('[aria-colindex="3"] > div').should('have.text','Language')
    cy.get('[aria-colindex="4"] > div').should('have.text','Intent')
    cy.get('[aria-colindex="5"] > div').should('have.text','Edit')
    cy.get('[aria-colindex="6"] > div').should('have.text','Remove')
}

export function emptyFaqs(){
    cy.get('a > .tactful-button-primary').click()
    cy.wait(5000)
    cy.get('.tactful-button-primary').click()
    cy.get('.tactful-input > .validation-msg-error').should('have.text','This field is required')
    cy.get('[data-v-4dec5119=""] > .validation-msg-error').should('have.text','This field is required')
    cy.get('.tactful-textarea-input__validation > .col-10').should('have.text','This field is required')

}

export function newFaqs(){
    cy.get('.form-input-with-icon-search').type('Temp Test')
    cy.get('.vs__search').click()
    cy.contains('English').click()
    cy.get('.tactful-textarea-input').type('Test Answers')
    cy.get('.cancel-faq-edit').click()
    // cy.get('.tactful-button-primary').click()
}

export function updateFaqs(){
    cy.wait(5000)
    cy.get('.fi-rr-edit').click()
    cy.get('.tactful-button-primary > .tactful-button-component-text').click()
}

export function deleteFaqs(){
    cy.wait(5000)
    cy.get('[aria-rowindex="1"] > [aria-colindex="6"]').click()
    cy.get('.dg-btn--ok').click()
}

export function filterFaqTitle(){
    cy.get('.form-input-with-icon-search').type('test')
    cy.contains('Apply').click()
}

export function filterFaqLanguage(){
    cy.wait(5000)
    cy.get('#vs6__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('English').click()
    cy.contains('Apply').click()
}