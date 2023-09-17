/// <reference types="cypress"/>

export function navigate(){
    cy.visit('https://dstnyengage.com/')
}


export function login(businessEmailData,passwordData){
    // cy.get('.kl-navbar__end > .kl-navbar__button > span').click()
    cy.visit('https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=https%3A%2F%2Fapp.qa.dev.tactful.ai%2Fv%2Fengage%2Ferp%2Fcustomers&scope=openid')
    cy.get('#username').type('hipeme4062@tipent.com')
    cy.get('#password').type('TrainingProgram2023')
    cy.get('#kc-form-buttons').click()
}

export function newCustomer(){
    cy.get('span[data-v-1ab2c926=""] > .tactful-button-primary').click()
}

export function submitNewCustomer(){
    cy.get('#bv-modal-create-customer___BV_modal_footer_ > div > .tactful-button-primary').click()
}

export function newCustomerErrorVisibility(){
    cy.get('.create-customer-model__dropdown-margin-email-input > .mb-4 > span > .tactful-input > .validation-msg-error').should('be.visible')
    cy.get(':nth-child(4) > span > .tactful-input > .validation-msg-error').should('be.visible')
    cy.get(':nth-child(1) > :nth-child(5) > .create-customer-model__required').should('be.visible')
    // cy.get('[data-v-28e4aaf6=""][data-v-8faf8946=""] > .validation-msg-error').should('be.visible')
}

export function createNewCustomer(businessEmailData,firstNameData,phoneData){
    cy.get('.create-customer-model__dropdown-margin-email-input > .mb-4 > span > .tactful-input > .form-input-with-icon-search').type(businessEmailData)
    cy.get(':nth-child(4) > span > .tactful-input > .form-input-with-icon-search').type(firstNameData)
    cy.get('#vs3__combobox').click()
    cy.contains('Egypt').click()
    cy.get('.tactful-tel-input__input').type(phoneData)
    cy.get('#vs5__combobox').click()
    cy.contains('email').click()
    cy.get('#bv-modal-create-customer___BV_modal_footer_ > div > .tactful-button-primary').click()
}

export function filterCustomerOrder(businessEmailData,passwordData){
    cy.wait(5000)
    cy.get(':nth-child(8) > .sc-gYMRRK > .sc-bGWzfD').click()
    cy.get('.ml-3').click()
    cy.wait(10000)
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('Orders').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('Include').click()
    cy.get('#vs10__combobox').click()
    if(cy.contains('no matching options')){
        cy.contains('Add').click()
        cy.get('.alert-link').should('be.visible')
    }
    else{
        cy.get('.alert-link').should('not.be.visible')
    }
    cy.get('div > .mr-2').click()
}

export function filterCustomerOrderCount(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.contains('Order Count').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-4').click()
    cy.get('.form-input-with-icon-search').type('1')
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    cy.get('body').then((body)=>{
        if(body.find('There are no records matching your request')){
            cy.get('[role="alert"] > .text-center').should('be.visible')
        }
        else{
            cy.get('[role="alert"] > .text-center').should('not.be.visible')

        }
    })
}

export function filterCustomerSessionCount(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('.d-flex > .tactful-button-secondary').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-2').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-4').click()
    cy.get('.form-input-with-icon-search').type('1')
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    cy.get('body').then((body)=>{
        if(body.find('There are no records matching your request')){
            cy.get('[role="alert"] > .text-center').should('be.visible')
        }
        else{
            cy.get('[role="alert"] > .text-center').should('not.be.visible')

        }
    })
}

export function filterCustomerFacebookName(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('.d-flex > .tactful-button-secondary').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-6').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-2').click()
    cy.get('.form-input-with-icon-search').type('Dstny Test')
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    cy.get('body').then((body)=>{
        if(body.find('There are no records matching your request')){
            cy.get('[role="alert"] > .text-center').should('be.visible')
        }
        else{
            cy.get('[role="alert"] > .text-center').should('not.be.visible')

        }
    })
}

export function filterCustomerPhoneNumber(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('.d-flex > .tactful-button-secondary').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-8').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-0').click()
    cy.get('.form-input-with-icon-search').type('1234')
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    cy.get('body').then((body)=>{
        if(body.find('There are no records matching your request')){
            cy.get('[role="alert"] > .text-center').should('be.visible')
        }
        else{
            cy.get('[role="alert"] > .text-center').should('not.be.visible')

        }
    })
}

export function filterCustomerCities(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('.d-flex > .tactful-button-secondary').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-11').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-0').click()
    cy.get('#vs9__combobox').click()
    //cy.get('#vs13__combobox').click()
    cy.get('#vs19__combobox').click()
    if(cy.contains('no matching options')){
        cy.contains('Add').click()
        cy.get('.alert-link').should('be.visible')
    }
    else{
        cy.get('.alert-link').should('not.be.visible')
    }
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
}

export function filterCustomerChannels(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-15').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__combobox > .vs__selected-options')
    cy.get('#vs9__option-0').click()
    //cy.get('#vs22__combobox').click()
    // cy.get('#vs22__combobox > .vs__actions > .vs__open-indicator > .fa').click()
    // cy.get('#vs13__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs22__combobox').click()
    cy.contains('test').click()
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    const channelChoice = cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary')
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    // cy.get('body').then((body)=>{
    //     if(body.find('.b-table-empty-row')){
    //         cy.contains('There are no records matching your request').should('be.visible')
    //     }
    //     else{
    //         cy.contains('There are no records matching your request').should('not.be.visible')

    //     }
    // })
    // if(cy.get('#__BVID__456 > tbody > tr > [aria-colindex="3"]')){
    //     cy.get('.text-center > span > .fas').should('be.visible')
    // }
    // else{
    //     cy.get('.text-center > span > .fas').should('not.be.visible')
    // }
}

export function filterCustomerTags(){
    cy.get('[showbtn="true"] > .tactful-button-medium').click()
    cy.get('.d-flex > .tactful-button-secondary').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs8__option-14').click()
    cy.get('#vs9__combobox > .vs__selected-options > .vs__search').click()
    cy.get('#vs9__option-0').click()
    cy.get('.form-input-with-icon-search').type('Active')
    cy.get('[cols="2"] > .tactful-button-secondary').click()
    cy.get('.customer-segmentation-modal-actions-container > div > .tactful-button-primary').click()
    // cy.get('body').then((body)=>{
    //     if(body.find('There are no records matching your request')){
    //         cy.get('[role="alert"] > .text-center').should('be.visible')
    //     }
    //     else{
    //         cy.get('[role="alert"] > .text-center').should('not.be.visible')

    //     }
    // })
}

export function sortSignUp(){
    cy.get('.time-date-column-en').click()
    cy.get('.time-date-column-en').get('[role=rowgroup] .time-date-column-en').find('.sr-only').should('have.text',' (Click to sort Descending)')
}

export function sortName(){
    
    cy.contains('Name').click()
    // cy.get('#__BVID__456 > thead > tr > [aria-colindex="3"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')

}

export function sortNickName(){
    cy.contains('Nick').click()
    // cy.get('#__BVID__456 > thead > tr > [aria-colindex="4"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')

}

export function sortFBName(){
    cy.get('thead > tr > [aria-colindex="5"]').click()
    cy.get('thead > tr > [aria-colindex="5"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')
}

export function sortPhoneNumber(){
    cy.get('thead > tr > [aria-colindex="6"]').click()
    cy.get('thead > tr > [aria-colindex="6"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')
}

export function sortGenderAge(){
    cy.get('thead > tr > [aria-colindex="7"]').click()
    cy.get('thead > tr > [aria-colindex="7"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')
}

export function sortCityArea(){
    cy.get('thead > tr > [aria-colindex="8"]').click()
    cy.get('thead > tr > [aria-colindex="8"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')
}

export function sortTags(){
    cy.get('thead > tr > [aria-colindex="9"]').click()
    cy.get('thead > tr > [aria-colindex="9"]').find('.sr-only').should('have.text',' (Click to sort Ascending)')
}