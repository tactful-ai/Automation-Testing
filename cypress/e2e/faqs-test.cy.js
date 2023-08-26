/// <reference types="cypress"/>

import * as faqs from '../page-objects/faqs';
import 'cypress-mochawesome-reporter/register';

const firstNameData = "Taha" 
const lastNameData = "Hesham"
const businessEmailData = "tahahesham@hotmail.com"
const passwordData = "Taha1234"
const phoneData = "01007470976"

describe('testing faqs page',()=>{
  
    it('Check that faq info is displayed right',()=>{
        faqs.faqs()
        cy.wait(5000)
    })

    it('Add empty faq',()=>{
        faqs.emptyFaqs()
    })

    it('Add new faq',()=>{
        faqs.newFaqs()
    })

    it('Delete exisiting faq',()=>{
        faqs.deleteFaqs()
    })

    it('Filter by exist faq name in title',()=>{
        faqs.filterFaqTitle()
    })

    it('Filter by exist faq language',()=>{
        faqs.filterFaqLanguage()
    })

})