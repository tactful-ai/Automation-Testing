import { waitFor } from "../page-objects/actions";

Cypress.Commands.add("navigate", () => {
  cy.visit("https://dstnyengage.com/");
});

Cypress.Commands.add("sessionLogin", (username, password) => {
  cy.session("login", () => {
    cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/ticketing");
    // type([username, password]);
    cy.get(username.selector).type(username.value);
    cy.get(password.selector).type(password.value);
    cy.get("#kc-form-buttons").click();
    // click("#kc-form-buttons");
    // cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/ticketing");
    // waitFor(".loader-container", "not.exist");
  });
});

