/// <reference types="cypress"/>

import * as customer from '../page-objects/customers';
import 'cypress-mochawesome-reporter/register';

const firstNameData = "Taha" 
const lastNameData = "Hesham"
const businessEmailData = "tahahesham@hotmail.com"
const passwordData = "Taha1234"
const phoneData = "01007470976"

describe('testing customer page',()=>{
  
    Cypress.on('uncaught:exception',(err, runnable)=>{
      return false
    })

    // it('Should fix handling error',()=>{
    //   customer.navigate()
    // })
    it('Should be able to sign in',() =>{
        customer.login(businessEmailData,passwordData)
        cy.wait(5000)
    })

    it('Should Create new Customer',() =>{
        customer.newCustomer()
    })

    it(' Create new customer with empty data',() => {
        customer.submitNewCustomer()
        customer.newCustomerErrorVisibility()
    })

    it('Create new customer with valid data',() => {
        customer.createNewCustomer(businessEmailData,firstNameData,phoneData)
    })

    it('Check filtering with orders include a specific product',()=>{
        cy.wait(1000)
        customer.filterCustomerOrder(businessEmailData,passwordData)
    })

    it('Check filtering with order count equal a specific number',()=>{
        cy.wait(1000)
        customer.filterCustomerOrderCount()
    })

    it('Check filtering with session count equal a specific number',()=>{
        cy.wait(1000)
        customer.filterCustomerSessionCount()
    })

    it('Check filtering with FB Name contains filter and write a part of a name',()=>{
        cy.wait(1000)
        customer.filterCustomerFacebookName()
    })

    it('Check filtering with phone number is a specific number',()=>{
        cy.wait(1000)
        customer.filterCustomerPhoneNumber()
    })

    it('Check filtering with cities is a specific value',()=>{
        cy.wait(1000)
        customer.filterCustomerCities()
    })

    it('Check filtering with channels include a specific value',()=>{
        cy.wait(1000)
        customer.filterCustomerChannels()
    })

    it('Check filtering with tags is and type a specific tag',()=>{
        cy.wait(1000)
        customer.filterCustomerTags()
    })

    it('Sorting cutomers by "Signup At"',()=>{
        cy.wait(1000)
        customer.sortSignUp()
    })

    it('Sorting cutomers by "Name"',()=>{
        cy.wait(1000)
        customer.sortName()
    })

    it('Sorting cutomers by "Nick Name"',()=>{
        cy.wait(1000)
        customer.sortNickName()
    })

    it('Sorting cutomers by "fb name"',()=>{
        cy.wait(1000)
        customer.sortFBName()
    })

    it('Sorting cutomers by "PN"',()=>{
        cy.wait(1000)
        customer.sortPhoneNumber()
    })

    it('Sorting cutomers by "Gender/age"',()=>{
        cy.wait(1000)
        customer.sortGenderAge()
    })

    it('Sorting cutomers by "city/area"',()=>{
        cy.wait(1000)
        customer.sortCityArea()
    })

})