/// <reference types="cypress"/>

import { func } from "assert-plus"

export function navigate(){
    cy.visit('https://practice.automationbro.com/contact')
}


export function login(businessEmailData,passwordData){
    // cy.visit('https://practice.automationbro.com/contact')
    // cy.visit('https://app.qa.dev.tactful.ai/v/engage/engagement-hub/agent-desktop')
    cy.visit('https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=https%3A%2F%2Fapp.qa.dev.tactful.ai%2Fv%2Fengage%2Fengagement-hub%2Fagent-desktop&scope=openid')
    cy.get('#username').type('hipeme4062@tipent.com')
    cy.get('#password').type('TrainingProgram2023')
    cy.get('#kc-form-buttons').click()
}

export function readyStatus(){
    cy.wait(5000)
    cy.get('.LayoutNavbar__status-wrapper > :nth-child(1) > .dropdown > .dropdown-toggle').click()
    cy.contains('Ready').click()
}

export function validateReadyStatus(){
    cy.get('.LayoutNavbar__status-wrapper > :nth-child(1) > .dropdown > .dropdown-toggle').click()
    cy.contains('Ready').click()
    cy.get('.nav-element-msg > .d-flex > .status-indicator').should('be.visible')
    cy.get('.nav-element-email > .d-flex > .status-indicator').should('be.visible')
    cy.wait(10000)
    cy.get('.chat-list-conversation__iteration').click()
    cy.get('.blocked-footer__action-container > .tactful-button-primary').click()
    cy.get('#bv-modal-activateBot___BV_modal_footer_ > .tactful-button-primary').click()
}

export function validateNoConversation(){
    cy.get('.chat-list-conversation__iteration__img-container__img-wrapper > .d-block').should('be.visible')
    // cy.get('.chat-list-conversation__transactions__txt').should('be.visible')
}

export function filterExisiting(){
    cy.get('#dropdown-1__BV_toggle_').click()
    cy.contains('Email').click()
}

export function searchExisting(){
    cy.get('.tactful-input > .fas').click()
    cy.get('.form-input-with-icon-search').type('existing')
}

export function searchNonExisting(){
    // cy.get('.fas')
    cy.get('.form-input-with-icon-search').focus().clear()
    cy.get('.form-input-with-icon-search').type('non-existing')
    cy.get('.form-input-with-icon-search').focus().clear()
    // cy.wait(5000)
}

export function joinConversation(){
    // cy.wait(5000)
    cy.get('.blocked-footer__action-container > .tactful-button-primary').should('be.visible')
    cy.get('.blocked-footer__action-container > .tactful-button-primary').click()
    cy.get('#bv-modal-activateBot___BV_modal_footer_ > .tactful-button-primary').click()
}

export function validateAgent(){
    cy.get('.vue-avatar--wrapper').should('be.visible')
}

export function composeEmail(){
    cy.get('#channelActions-email > .mr-2').click()
    cy.get('.composer').should('be.visible')
}

export function closeConversation(){
    cy.get('.composer__header > .fi').click()
}

export function checkMsgAgent(){
    cy.get('[data-v-74c485c4=""][data-v-4dd7df0f=""] > :nth-child(1) > .vue-avatar--wrapper').should('be.visible')
    cy.get('.msg-status-container > .far').should('be.visible')
}

export function msgSize(){
    cy.get('.chat-footer__msg-area').type('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest')
    cy.get('.chat-footer__msg-counter-limit').should('have.text','4096/4096')

}

export function sendFile(){
    cy.get('#image-upload > .fi').should('be.visible')
    cy.get("input[type=file]").attachFile("data.csv")
    cy.get('.chat-footer__footer-tabs > [data-v-59ec59a5=""][data-v-9b76006a=""] > .file-upload-preview__container > .file-upload-preview__preview-container > :nth-child(1) > :nth-child(1) > .file-upload-preview__file-preview').should('be.visible')
}

export function msgShadowAfterWhisper(){
    cy.get(':nth-child(2) > .nav-item > .nav-link').click()
    cy.get('.chat-footer__whisper[data-v-9b76006a]').should('have.css','background-color','rgb(255, 248, 226)')
}

export function msgShadowAfterNote(){
    cy.get(':nth-child(3) > .nav-item > .nav-link').click()
    cy.get('.chat-footer__note[data-v-9b76006a]').should('have.css','background-color','rgb(243, 233, 247)')
}

export function editEnabled(){
    cy.get('[data-v-94e60bb4=""] > .user-info-view__main-actions > .tactful-button-primary').should('be.enabled')
}

export function mandatoryName(){
    cy.get('[data-v-94e60bb4=""] > .user-info-view__main-actions > .tactful-button-primary').click()
    cy.get('#inputName').focus().clear()
    cy.get('#userInfo').click()
    // cy.get('.validation-input-error[data-v-dbb1b4b6]').should('have.css','border','1px solid rgb(243, 233, 247)')
    cy.contains('This field is required').should('be.visible')
    cy.get('.general-info__action-container > .tactful-button-primary').should('be.disabled')
}

export function leaveNickname(){
    cy.get('#inputName').type('taha hesham hamed mahmoud')
    cy.get('div.mb-1 > [data-v-94e60bb4=""] > span > .tactful-input > .form-input-with-icon-search').focus().clear()
    cy.get('div.mb-1 > [data-v-94e60bb4=""] > span > .tactful-input > .form-input-with-icon-search').type('tahahesham@hotmail.com')
    cy.get('.general-info__action-container > .tactful-button-primary').click()
}

export function saveUser(){
    cy.get('[data-v-94e60bb4=""] > .user-info-view__main-actions > .tactful-button-primary').click()
    cy.get(':nth-child(4) > span > .tactful-input > .form-input-with-icon-search').focus().clear()
    cy.get(':nth-child(4) > span > .tactful-input > .form-input-with-icon-search').type('taha hesham hamed mahmoud')
    cy.get('#vs4__combobox').click()
    cy.contains('Egypt').click()
    cy.get('.tactful-tel-input__input').focus().clear()
    cy.get('.tactful-tel-input__input').type('1007470976')
    cy.get(':nth-child(3) > :nth-child(2) > span > .tactful-input > .form-input-with-icon-search').focus().clear()
    cy.get(':nth-child(3) > :nth-child(2) > span > .tactful-input > .form-input-with-icon-search').type('temp address')
    cy.get(':nth-child(5) > span > .tactful-input > .form-input-with-icon-search').focus().clear()
    cy.get(':nth-child(5) > span > .tactful-input > .form-input-with-icon-search').type('cairo')
    cy.get('#vs5__combobox > .vs__selected-options').click()
    // cy.contains('Egypt').click()
    cy.get('#vs6__combobox > .vs__selected-options').click()
    cy.contains('Active').click()
    cy.get('#userInfo').click()
    cy.get('.general-info__action-container > .tactful-button-primary').click()
}

export function newTicket(){
    cy.get('.user-info-tickets__main-container > .user-info-view__main-actions > .tactful-button-primary').click()
    cy.get('[data-v-dbb1b4b6=""][data-v-b000eeae=""] > span > .tactful-input > .form-input-with-icon-search').click()
    cy.get('.tactful-textarea-input').click()
    cy.get('[data-v-dbb1b4b6=""][data-v-b000eeae=""] > span > .tactful-input > .form-input-with-icon-search').click()
    cy.get('.tactful-input > .validation-msg-error').should('be.visible')
    cy.get('.tactful-textarea-input__validation > .col-10').should('be.visible')
    cy.get('.tickets-actions > .tactful-button-primary').should('be.disabled')
}

export function createTicket(){
    cy.get('#vs7__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('Task').click()
    cy.get('[data-v-dbb1b4b6=""][data-v-b000eeae=""] > span > .tactful-input > .form-input-with-icon-search').type('test')
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('Normal').click()
    cy.get('.tactful-textarea-input').type('testing description')
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').type('Training').type('{enter}')
    cy.get('#vs10__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('New').click()
    cy.get('.tickets-actions > .tactful-button-primary').click()
}