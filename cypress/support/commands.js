import { waitFor } from "../page-objects/actions";
import 'cypress-file-upload';
import "cypress-real-events";

Cypress.Commands.add("goTo", (url) => {
  cy.url().then(($url) => {
    if ($url.includes("?")) {
      let index = $url.search("?");
      if ($url.slice(0, index) !== url) {
        cy.visit(url);
      }
    } else if ($url !== url) {
      //if we are already not visiting the wanted url visit url
      cy.visit(url);
    }
    //else do nothing
  });
});

Cypress.Commands.add("checkUrl", (url) => {
  cy.url().should("equal", url);
});

Cypress.Commands.add("reWrite", (file, editFn) => {
  cy.readFile("cypress/fixtures/" + file, (err, data) => {
    if (err) {
      return console.error(err);
    }
  }).then((data) => {
    editFn(data);
    cy.writeFile("cypress/fixtures/" + file, JSON.stringify(data));
  });
});

Cypress.Commands.add("manualLogin", (username, password, url, button) => {
  const loginUrl = `https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=${url}`;
  cy.visit(loginUrl);
  waitFor(".loader-container", "not.exist");
  cy.url().then(($url) => {
    if ($url == loginUrl) {
      //if url is the login url type user name and password and login
      cy.get(username.selector).type(username.value);
      cy.get(password.selector).type(password.value);
      cy.get(button).click();
      waitFor(".loader-container", "not.exist");
      return;
    } else if ($url == url) {
      //if redirected to wanted url do nothing
      return;
    } else {
      throw new Error("wrong URL");
    }
  });
});

Cypress.Commands.add("sessionLogin", (username, password, url, button) => {
  cy.session("login", () => {
    // cy.visit(url)
    cy.visit(
      "https://keycloak.eco.dev.tactful.ai/realms/engage/protocol/openid-connect/auth?client_id=tactful&response_type=code&redirect_uri=https%3A%2F%2Fapp.qa.dev.tactful.ai%2Fv%2Fengage%2Fengagement-hub%2Fhistory&scope=openid"
    );
    cy.get(username.selector).type(username.value);
    cy.get(password.selector).type(password.value);
    cy.get(button).click();
    waitFor(".loader-container", "not.exist");
  });
});



