import {
  assert,
  click,
  waitFor,
} from "./actions";

class Tickets {
  url = "https://app.qa.dev.tactful.ai/v/engage/erp/ticketing";

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

  isContainRecords() {
    return cy
      .get('td [role="alert"]  ')
      .contains("There are no records to show")
      .should("exist")
      .and("have.length", 1);
  }

  queryFilter(t ){
    cy.visit(`https://app.qa.dev.tactful.ai/v/engage/erp/ticketing?display_id=${t?.id||""}-20&ticket_status=${t?.ticketstatus||""}&ticket_priority=${t.priority||""}&created_on=&assignee_id=&ticket_type=&requester_name=first%20customer&limit=15&page=1&channels_ids=`)
    waitFor(".loader-container", "not.exist");
    cy.contains(':nth-child(2) > [data-test="resetBtn"]', "Search").click({
      force: true,
      timeout:1000
    });
  }
}
let tickets = new Tickets();
export default tickets;
