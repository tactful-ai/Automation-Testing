import { waitFor } from "../page-objects/actions";

Cypress.Commands.add("goTo", (url) => {
  cy.url().then($url=>{
    if($url !== url){
        cy.visit(url)
    }
})
});

Cypress.Commands.add("sessionLogin", (username, password) => {
  cy.session("login", () => {
    cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/ticketing");
    cy.get(username.selector).type(username.value);
    cy.get(password.selector).type(password.value);
    cy.get("#kc-form-buttons").click();

  });
});



