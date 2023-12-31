/// <reference types="cypress"/>

import * as faqs from '../page-objects/faqs';
import 'cypress-mochawesome-reporter/register';

const firstNameData = "Taha" 
const lastNameData = "Hesham"
const businessEmailData = "tahahesham@hotmail.com"
const passwordData = "Taha1234"
const phoneData = "01007470976"

describe('testing faqs page',()=>{

    Cypress.on('uncaught:exception',(err, runnable)=>{
        return false
      })

    const url = "https://app.qa.dev.tactful.ai/v/engage/erp/faq";
     
    // beforeEach(() => {
      
    // });
    before(()=>{
      cy.manualLogin(
        { selector: "#username", value: "hipeme4062@tipent.com " },
        { selector: "#password", value: "TrainingProgram2023" },
        url,
        "#kc-form-buttons"
      )
    })


    // it('Should be able to sign in',() =>{
    //     faqs.login()
    //     cy.wait(10000)
    // })
  
    it('Check that faq info is displayed right',()=>{
        // cy.wait(10000)
        faqs.faqs()
    })

    it('Add empty faq',()=>{
        faqs.emptyFaqs()
    })

    it('Add new faq',()=>{
        faqs.newFaqs()
    })

    // it('Delete exisiting faq',()=>{
    //     faqs.deleteFaqs()
    // })

    it('Filter by exist faq name in title',()=>{
        cy.wait(10000)
        faqs.filterFaqTitle()
    })

    // it('Filter by exist faq language',()=>{
    //     faqs.filterFaqLanguage()
    // })

})