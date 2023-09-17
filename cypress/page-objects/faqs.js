/// <reference types="cypress"/>

export function navigate(){
    cy.visit('https://dstnyengage.com/')
}


export function login(){
    // cy.get('.kl-navbar__end > .kl-navbar__button > span').click()
    cy.visit('https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=https%3A%2F%2Fapp.qa.dev.tactful.ai%2Fv%2Fengage%2Ferp%2Ffaq&scope=openid')
    cy.get('#username').type('hipeme4062@tipent.com')
    cy.get('#password').type('TrainingProgram2023')
    cy.get('#kc-form-buttons').click()
    cy.wait(40000)
}

export function faqs(){
    // cy.visit('https://app.qa.dev.tactful.ai/v/engage/erp/faq')
    cy.wait(10000)
    cy.get('[aria-colindex="1"] > div').should('have.text','Title')
    cy.get('[aria-colindex="2"] > div').should('have.text','Answer')
    // cy.get('[aria-colindex="3"] > div').should('have.text','Language')
    cy.get('[aria-colindex="3"] > div').should('have.text','Intent')
    cy.get('[aria-colindex="4"] > div').should('have.text','Edit')
    cy.get('[aria-colindex="5"] > div').should('have.text','Remove')
}

export function emptyFaqs(){
    cy.get('a > .tactful-button-primary').click()
    cy.wait(10000)
    cy.get('[data-v-67b85b08=""] > span > .tactful-input > .form-input-with-icon-search').click()
    cy.get('.tactful-textarea-input').click()
    cy.get('[data-v-67b85b08=""] > span > .tactful-input > .form-input-with-icon-search').click()
    cy.get('.tactful-textarea-input').should('be.visible')
    cy.get('.tactful-textarea-input__validation > .col-10').should('be.visible')
    // cy.get('.tactful-button-primary').click()
    // cy.get('.tactful-input > .validation-msg-error').should('have.text','This field is required')
    // cy.get('[data-v-4dec5119=""] > .validation-msg-error').should('have.text','This field is required')
    // cy.get('.tactful-textarea-input__validation > .col-10').should('have.text','This field is required')

}

export function newFaqs(){
    cy.get('[data-v-67b85b08=""] > span > .tactful-input > .form-input-with-icon-search').type('Temp Test')
    cy.get('.tactful-textarea-input').type('Test Answers')
    cy.get('.cancel-faq-edit').click()
    cy.get('.ml-3').click()
    cy.wait(40000)
    // cy.get('.tactful-button-primary').click()
}

export function updateFaqs(){
    cy.wait(10000)
    cy.get('.fi-rr-edit').click()
    cy.get('.tactful-button-primary > .tactful-button-component-text').click()
}

export function deleteFaqs(){
    cy.wait(10000)
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