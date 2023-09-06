/// <reference types="cypress"/>

const neatCSV = require('neat-csv');


import * as inbox from '../page-objects/unifiedInbox';
import 'cypress-mochawesome-reporter/register';

// const firstNameData = "Taha" 
// const lastNameData = "Hesham"
// const businessEmailData = "tahahesham@hotmail.com"
// const passwordData = "Taha1234"
// const phoneData = "01007470976"

describe('testing unified inbox', () => {
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

      it('Should be able to sign in',() =>{
            inbox.login(JSON.stringify(table[0]['Email']),JSON.stringify(table[0]['Password']))
            cy.wait(5000)
      })

      it('Check changing agents status to Ready',()=>{
            inbox.readyStatus()
            cy.wait(5000)
            inbox.validateReadyStatus()
      })

      it('Check if the agent dont have any assigned conv. (empty state)',()=>{
        inbox.validateNoConversation()
      })

      it('Check searching filters by entering existing data',()=>{
        inbox.searchExisting()
      })

      it('Check searching filters by entering non-existing',()=>{
        inbox.searchNonExisting()
      })

      // it('Check agent can join conv.',()=>{
      //   inbox.joinConversation()
      // })

      it('Check Conversation Assignee in conversation list',()=>{
        inbox.validateAgent()
      })

      it('Check Can click on "compose email " action button',()=>{
        inbox.composeEmail()
      })

      it('Check End button appears at the top right corner of the chat',()=>{
        inbox.closeConversation()
      })

      // it('Check sending a message as agent',()=>{
      //   inbox.checkMsgAgent()
      // })

      // it('Check agent can sent msg in case msg has more than 4096 char',()=>{
      //   inbox.msgSize()
      // })

      it('Verify agent is able to Upload file',()=>{
        inbox.sendFile()
      })

      it('Check Msg shadow after sent whisper msg',()=>{
        inbox.msgShadowAfterWhisper()
      })

      it('Check Msg shadow after sent note msg',()=>{
        inbox.msgShadowAfterNote()
      })

      it('Check can edit user info section after join conv.',()=>{
        inbox.editEnabled()
      })

      it('check if the user name is mandatory',()=>{
        inbox.mandatoryName()
      })

      it('check if the agent can edit user info and keep the nickname blank',()=>{
        inbox.leaveNickname()
      })

      it('Add all user info fields then save',()=>{
        inbox.saveUser()
      })

      it('Check add new empty ticket from ticketing section',()=>{
        inbox.newTicket()
      })

      it('Check add new ticket from ticketing section',()=>{
        inbox.createTicket()
      })

  });