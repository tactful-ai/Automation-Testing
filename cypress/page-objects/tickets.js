import {
  assert,
  click,
  clickOn,
  waitFor,
} from "./actions";
import { ticketsSelector } from "../fixtures/selectors";

class Tickets {
  url = "https://app.qa.dev.tactful.ai/v/engage/erp/ticketing?display_id=&ticket_status=&ticket_priority=&created_on=&assignee_id=&ticket_type=&requester_name=&limit=15&page=1&channels_ids=";

  filter(testCaseFn, assertionFn, testCaseArgs = [], assertionArgs = []) {
    
    Cypress.on('url:changed',($url)=>{
      if($url.includes('/404')){
        cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/ticketing")
      }
    })
    waitFor(".loader-container", "not.exist")

    click(':nth-child(1) > [data-test="resetBtn"]');

    waitFor(".loader-container", "not.exist")

    assert([{ selector: 'th[role="columnheader"]', value: 8 }], "have.length");
    // cy.wait(5000)
    //test case function
    testCaseFn.apply(this, testCaseArgs);

    cy.contains(':nth-child(2) > [data-test="resetBtn"]', "Search").click({
      force: true,
      timeout:1000
    });

    waitFor(".loader-container", "not.exist");
   
    //assertion function
    assertionFn.apply(this, assertionArgs);
  }
  
   filterByDate(year,month,day,drobdownselector=ticketsSelector.requestTime, monthdaybtn=ticketsSelector.dayMonthBtn,yearmonthbtn=ticketsSelector.monthYearBtn,datePicker=ticketsSelector.datePicker) {
    click([drobdownselector,monthdaybtn,yearmonthbtn])
    clickOn([[datePicker,year],[datePicker,month],[datePicker,day]],{clickConfig:{force:true}})
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
