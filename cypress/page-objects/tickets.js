import {
  assert,
  click,
  clickOn,
  waitFor,
} from "./actions";
import { ticketsSelector } from "../fixtures/selectors";

class Tickets {
  url = "https://app.qa.dev.tactful.ai/v/engage/erp/ticketing?display_id=&ticket_status=&ticket_priority=&created_on=&assignee_id=&ticket_type=&requester_name=&limit=15&page=1&channels_ids=";
  statusCodes = []
  filter(testCaseFn, assertionFn, testCaseArgs = [], assertionArgs = []) {
    // cy.intercept('GET','https://api.qa.dev.tactful.ai/erp/v1/settings').as("settings")
    Cypress.on('url:changed',($url)=>{
      if($url.includes('/404')){
        cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/ticketing")
      }
    })
    cy.wrap(this.statusCodes).should(codes => {
      expect(codes.every(code => code === 200 || code === 204)).to.eq(true)
    })
    waitFor(".loader-container", "not.exist")
    cy.wrap(this.statusCodes).should(codes => {
      expect(codes.every(code => code === 200 || code === 204)).to.eq(true)
    })
    // click(':nth-child(1) > [data-test="resetBtn"]');
    cy.contains(':nth-child(1) > [data-test="resetBtn"]', "Reset").click({
      force: true,
      timeout:1000
    });
    cy.wait("@settings").its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wrap(this.statusCodes).should(codes => {
      expect(codes.every(code => code === 200 || code === 204)).to.eq(true)
    })
    waitFor(".loader-container", "not.exist")

    //test case function
    testCaseFn.apply(this, testCaseArgs);

    cy.contains(':nth-child(2) > [data-test="resetBtn"]', "Search").click({
      force: true,
      timeout:1000
    });
    cy.wait("@settings").its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wrap(this.statusCodes).should(codes => {
      expect(codes.every(code => code === 200 || code === 204)).to.eq(true)
    })
    waitFor(".loader-container", "not.exist");
   
    //assertion function
    assertionFn.apply(this, assertionArgs);
  }
  
   filterByDate(year,month,day,drobdownselector=ticketsSelector.requestTime, monthdaybtn=ticketsSelector.dayMonthBtn,yearmonthbtn=ticketsSelector.monthYearBtn,datePicker=ticketsSelector.datePicker) {
    // click([drobdownselector,monthdaybtn,yearmonthbtn],{clickConfig:{force:true}})
    cy.get(drobdownselector).click({force:true})
    cy.get(monthdaybtn).click({force:true})
    cy.get(yearmonthbtn).click({force:true})
    // clickOn([[datePicker,year],[datePicker,month],[datePicker,day]],{clickConfig:{force:true}})
    cy.get(datePicker).contains(year).click({force:true})
    cy.get(datePicker).contains(month).click({force:true})
    cy.get(datePicker).contains(day).click({force:true})
  }

  isContainRecords(args) {
    return cy
      .get('td [role="alert"]')
      .contains("There are no records to show")
      .should("exist")
      .and("have.length", 1);
  }
}
let tickets = new Tickets();
export default tickets;
