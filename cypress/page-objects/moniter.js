import { type, click, dropDown, waitFor } from "./actions";
import { conditions } from "./conditions";

class Moniter {
  url = "https://app.qa.dev.tactful.ai/v/engage/engagement-hub/history";


  isContainRecords() {
    return cy
      .get('td [role="alert"]  ')
      .contains("There are no records matching your request")
      .should("exist")
      .and("have.length", 1);
  }
  clickReset() {
    
    cy.contains("button", "Reset", { timeout: 1000 }).click({ force: true });
  }
  drobDownFilter(
    drobdown,
    list,
    text,
    assertfn = this.isContainRecords,
    args = []
  ) {
    cy.goTo(this.url);
    waitFor(".loader-container", "not.exist");

    dropDown(drobdown, list, text);
    // assertfn(...args);
    conditions.if('td [role="alert"]',()=>{this.isContainRecords()},assertfn(...args))
  }

  drobDownFilterOnly(
    drobdown,
    list,
    text,
    assertfn = this.isContainRecords,
    args = []
  ) {
    cy.goTo(this.url);
    waitFor(".loader-container", "not.exist");

    this.clickReset();
    dropDown(drobdown, list, text);
    conditions.if('body td [role="alert"]',()=>{this.isContainRecords()},()=>{assertfn(...args)})
  }

  inputFilter(
    inputSelector,
    text,
    assertfn = this.isContainRecords,
    args = []
  ) {
    cy.goTo(this.url);
    waitFor(".loader-container", "not.exist");
    type(inputSelector, text);
    conditions.if('body td [role="alert"]',()=>{this.isContainRecords()},()=>{assertfn(...args)})
  }
  inputFilterOnly(
    inputSelector,
    text,
    assertfn = this.isContainRecords,
    args = []
  ) {
    cy.goTo(this.url);
    waitFor(".loader-container", "not.exist");
    this.clickReset();
    type(inputSelector, text);
    conditions.if('body td [role="alert"]',()=>{this.isContainRecords()},()=>{assertfn(...args)})
  }
}

const moniter = new Moniter();
export default moniter;

