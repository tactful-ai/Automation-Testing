/// <reference types="cypress"/>

const neatCSV = require('neat-csv');


import * as chatbot from '../page-objects/chatbot';
import 'cypress-mochawesome-reporter/register';

// const firstNameData = "Taha" 
// const lastNameData = "Hesham"
// const businessEmailData = "tahahesham@hotmail.com"
// const passwordData = "Taha1234"
// const phoneData = "01007470976"

describe('testing chatbot', () => {
    let table;
  
    before(() => {
      cy
        .fixture('data.csv')
        .then(neatCSV) // convert csv file into an object
        .then(data => {
          table = data;
        })
        .then(console.table)
    });
  
    // it('Fill input fields using CSV data', () => {
    //   cy.visit('https://practice.automationbro.com/contact')
  
    //   const randomRow = Math.floor(Math.random() * table.length)
  
    //   cy.get('.contact-name input').type(table[randomRow]['name'])
    //   cy.get('.contact-email input').type(table[randomRow]['email'])
    //   cy.get('.contact-phone input').type(table[randomRow]['phone'])
    //   cy.get('.contact-message textarea').type(table[randomRow]['message'])
    // });
    
    Cypress.on('uncaught:exception',(err, runnable)=>{
            return false
      })

      const url = "https://app.qa.dev.tactful.ai/v/engage/engagement-hub/queueing";
     
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
      //       chatbot.login(JSON.stringify(table[0]['Email']),JSON.stringify(table[0]['Password']))
      //       cy.wait(5000)
      // })

      it('Check adding empty queue',()=>{
            chatbot.emptyQueue()
      })

      it('Create a new queue',()=>{
        chatbot.createQueue()
      })

      // it('Check auto assignment trigger',()=>{
      //   chatbot.disableAssignment()
      // })

      // it('Check chatbot preview as not auto assigned',()=>{
      //   chatbot.preview()
      // })

    })