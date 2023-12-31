/// <reference types="cypress"/>

import { dropDown, type, waitFor } from "../page-objects/actions.js";
import tickets from "../page-objects/tickets";
import { ticketsSelector } from "../fixtures/selectors";
import ticketsData from "../fixtures/tickets-data.json"
import loginData from "../fixtures/login.json"
describe("testing tickets page", () => {
  const url = "https://app.qa.dev.tactful.ai/v/engage/erp/ticketing";
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  before(() => {
    cy.intercept(`*`, { log: false });
    cy.intercept('GET','https://api.qa.dev.tactful.ai/erp/v1/settings', (req) => {
      req.continue((res) => {
        tickets.statusCodes.push(res.statusCode)
      })
    }).as('settings')
    
      cy.manualLogin(loginData.username, loginData.password, url, "#kc-form-buttons");
    
  });
  beforeEach(() => {
    cy.intercept('GET','https://api.qa.dev.tactful.ai/erp/v1/settings', (req) => {
      req.continue((res) => {
        tickets.statusCodes.push(res.statusCode)
      })
    }).as('settings')
    cy.intercept(`*`, { log: false });
  });
  it("should filter by an existing ticket id", () => {
    const assertion = (value) => {
      cy.get(".id-number").should("exist").contains(value);
    };
    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, 1], [1]);
  });

  it("should filter by non existing ticket id", () => {
    const assertion = (value) => {
      cy.get(".id-number").should("not.exist");
      cy.get('td [role="alert"]  ').contains("There are no records to show");
    };

    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, 9999]);
  });

  it("should filter by non existing ticket id", () => {
    const assertion = () => {
      cy.get(".id-number").should("not.exist");
      tickets.isContainRecords();
    };

    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, -2]);
  });

  it("should filter by non existing ticket id", () => {
    const assertion = () => {
      cy.get(".id-number").should("not.exist");
      tickets.isContainRecords();
    };

    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, 0]);
  });

  // it("should filter by an existing username", () => {
  //   function assertionFn(value) {
  //     cy.get(".id-number").should("have.length", value);
  //   }
  //   tickets.filter(type, assertionFn, [ticketsSelector.userName, "first customer"], [6]);
  // });

  it("should filter by a non existing username", () => {
    function assertionFn(value) {
      cy.get(".id-number").should("have.length", value);
      tickets.isContainRecords();
    }
    tickets.filter(type, assertionFn, [ticketsSelector.userName, "second customer"], [0]);

  });

  it("should filter by 'assigned to' while there are existing tickets assigned to this agent", () => {
    function assertionFn( date) {
      cy.get(' td[aria-colindex="7"] > div ').contains(date);
    }
    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.assignedToDrobDown, ticketsSelector.assignedToList, "Training Program"],
      ["14"]
    );
  });

  it('should filter by an existing "Request time"', () => {
    function assertionFn( date) {
      cy.get(' td[aria-colindex="7"] > div ').contains(date);
    }

    tickets.filter(tickets.filterByDate, assertionFn, ["2023", "August", "14"], [ "14"]);
  });

  it('Should filter by a non existing "Request time"', () => {
    tickets.filter(tickets.filterByDate, tickets.isContainRecords, ["2023", "August", "13"]);
  });

  it("Should filter by category while there're existing tickets has this category ", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="4"]').each(($el) => {
        expect($el.text()).to.equal(`${value}`);
      });
    }

    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.categoryDrobDown, ticketsSelector.categoryList, "Incident"],
      ["Incident"]
    );
  });

  it("Should filter by category while there're non existing tickets has this category ", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="4"]').each(($el) => {
        expect($el.text()).to.equal(value);
      })
    }

    tickets.filter(dropDown, assertionFn, [ticketsSelector.categoryDrobDown, ticketsSelector.categoryList, "Task"],["Task"]);
  });

  it("Should filter by ticket status while there're existing tickets has this status", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="3"] > div > div  span').each(($el) => {
        expect($el.text()).to.equal(value);
      });
    }

    tickets.filter(dropDown, assertionFn, [ticketsSelector.statusDrobDown, ticketsSelector.statusList, "New"], ["New"]);
  });

  it("Should filter by ticket status while there're non existing tickets has this status", () => {
    function assertionFn() {
      cy.get('td[aria-colindex="3"] > div > div  span').should("have.length", 0);
      tickets.isContainRecords();
    }

    tickets.filter(dropDown, assertionFn, [ticketsSelector.statusDrobDown, ticketsSelector.statusList, "Canceled"]);
  });

  it("Should Filter by ticket priority while there're existing tickets has this priority ", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="2"] > :nth-child(1) > :nth-child(1) > div > .fas').each(($el) => {
        expect($el).to.have.class(value);
      });
    }

    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.priorityDrobDown, ticketsSelector.priorityList, "High"],
      ["tactful-badge-icon-high"]
    );
  });

  it("Should Filter by ticket priority while there're non existing tickets has this priority ", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="2"] > :nth-child(1) > :nth-child(1) > div > .fas').each(($el) => {
        expect($el).to.have.class(value);
      })
    }

    tickets.filter(dropDown, assertionFn, [ticketsSelector.priorityDrobDown, ticketsSelector.priorityList, "Normal"],["tactful-badge-icon-normal"]);
  });

  it("Should Filter by channel while there're exist tickets has this channel ", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="5"] > :nth-child(1) > .channel-badge-fixed-font > span').each(($el) => {
        expect($el.text()).to.equal(value);
      });
    }

    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.channelDrobDown, ticketsSelector.channelList, "test 9753"],
      ["test 9753"]
    );
  });

  it("Should Filter by multi channel", () => {
    const params = [
      ticketsSelector.userName,
      "first customer",
      ticketsSelector.categoryDrobDown,
      ticketsSelector.categoryList,
      "Incident",
      "2023",
      "August",
      "14",
    ];

    function assertionFn(value, date) {
      cy.get('td[aria-colindex="4"]').each(($el) => {
        expect($el.text()).to.equal(`${value}`);
      });
      cy.get(' td[aria-colindex="7"] > div ').contains(date).should("exist");
    }
    function testCaseFn(ticketsSsernameSelector, userName, category, categoryList, categoryOption, year, month, day) {
      type(ticketsSsernameSelector, userName);
      dropDown(category, categoryList, categoryOption);
      tickets.filterByDate(year, month, day);
    }
    tickets.filter(testCaseFn, assertionFn, params, ["Incident", 14]);
  });

  it("see detials and edit them", () => {
    function isSuccess(colorRGB) {
      cy.get(ticketsSelector.statusContainer).should("have.css", "background-color", colorRGB);
      cy.get(ticketsSelector.notificationMsg, { timeout: 10000 })
        .should("exist")
        .and("contain.text", "SUCCESS Saving Information Succeeded");
      cy.get(ticketsSelector.notificationGroup).click();
    }
    cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/editTicket/406");
    waitFor(".loader-container", "not.exist");
    cy.wait(5000)
    dropDown(".rounded-dropdown", ".status-container div", "New");
    isSuccess("rgb(230, 195, 72)");
    dropDown(".rounded-dropdown", ".status-container div", "Solved");
    isSuccess("rgb(2, 188, 119)");
    dropDown(".rounded-dropdown", ".status-container div", "Canceled");
    isSuccess("rgb(232, 74, 95)");
    dropDown(".rounded-dropdown", ".status-container div", "In Progress");
    isSuccess("rgb(21, 145, 207)");
  });
});
