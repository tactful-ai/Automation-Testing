/// <reference types="cypress"/>

import { func } from "assert-plus"

export function navigate(){
    cy.visit('https://practice.automationbro.com/contact')
}


export function login(businessEmailData,passwordData){
    // cy.visit('https://practice.automationbro.com/contact')
    // cy.visit('https://app.qa.dev.tactful.ai/v/engage/engagement-hub/agent-desktop')
    cy.visit('https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=https%3A%2F%2Fapp.qa.dev.tactful.ai%2Fv%2Fengage%2Fengagement-hub%2Fqueueing&scope=openid')
    cy.get('#username').type('hipeme4062@tipent.com')
    cy.get('#password').type('TrainingProgram2023')
    cy.get('#kc-form-buttons').click()
}

export function emptyQueue(){
    cy.wait(5000)
    cy.get('.tactful-button-primary').click()
    cy.wait(5000)
    cy.get('.tactful-button-primary').click()
    // cy.get('.tactful-input > .validation-msg-error').should('be.visible')
    // cy.get('[data-v-57cbcee6=""][data-v-376abb10=""] > .validation-msg-error').should('be.visible')
    cy.get(':nth-child(9) > :nth-child(1) > .validation-msg-error').should('be.visible')
    cy.get(':nth-child(11) > :nth-child(1) > .validation-msg-error').should('be.visible')
}

export function createQueue(){
    cy.get('.form-input-with-icon-search').type('Test')
    cy.get('#vs2__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs2__combobox > .vs__selected-options > .vs__search').invoke('show')
    cy.contains('Highest').click()
    cy.get('#vs3__combobox > .vs__selected-options').click()
    cy.contains('temp').click()
    cy.get('.add-edit-queue__channel-error > :nth-child(1)').click()
    cy.get('#vs4__combobox > .vs__selected-options').click()
    cy.get('#vs4__combobox > .vs__selected-options').invoke('show')
    cy.contains('Training').click()
    cy.get('.add-edit-queue__actions > .mr-2').click()
}

export function disableAssignment(){
    cy.wait(5000)
    cy.get('#__BVID__157__row_607 > [aria-colindex="5"] > :nth-child(1) > .queueing-list__actions-container > .switcher > .switcher-indicator > .switcher-no').should('be.visible')
}

export function preview(){
    cy.get(':nth-child(12) > .sc-gYMRRK > .sc-bGWzfD').click()
    // cy.get('[aria-rowindex="5"] > [aria-colindex="4"] > div > .position-relative > .preview-wedgit').invoke('removeAttr','target').click()
    cy.visit('https://webchat.qa.dev.tactful.ai/webchat/?profileId=740&token=9cae6df2dd456e72f788beed998aa2fb833a369d9c738fd058d0abf9a1338ab0')
}