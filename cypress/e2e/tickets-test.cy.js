/// <reference types="cypress"/>

import { dropDown, type, waitFor } from "../page-objects/actions.js";
import tickets from "../page-objects/tickets";
import {ticketsSelector} from "../fixtures/selectors";

describe("testing tickets page", () => {
  const url = "https://app.qa.dev.tactful.ai/v/engage/erp/ticketing";
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  

  beforeEach(() => {
    cy.intercept(`*`, { log: false });
    cy.sessionLogin(
      { selector: "#username", value: "hipeme4062@tipent.com " },
      { selector: "#password", value: "TrainingProgram2023" }
    )
  });
  
  

  it("should filter by an existing ticket id", () => {
   
    const assertion = (value) => {
      cy.get(".id-number").should("exist").contains(value);
    };
    cy.visit(url);
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
    const assertion = (value) => {
      cy.get(".id-number").should("not.exist");
      tickets.isContainRecords()
    };

    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, -2]);
  });

  it("should filter by non existing ticket id", () => {
    const assertion = (value) => {
      cy.get(".id-number").should("not.exist");
      tickets.isContainRecords()
    };

    tickets.filter(type, assertion, [ticketsSelector.ticketNumber, 0]);
  });

  it("should filter by an existing username", () => {
    function assertionFn(value) {
      cy.get(".id-number").should("have.length", value);
    }
    tickets.filter(
      type,
      assertionFn,
      [ticketsSelector.userName, "first customer"],
      [6]
    );
  });

  it("should filter by a non existing username", () => {
    function assertionFn(value) {
      cy.get(".id-number").should("have.length", value);
      tickets.isContainRecords()
    }
    tickets.filter(
      type,
      assertionFn,
      [ticketsSelector.userName, "second customer"],
      [0]
    );
  });

  it("should filter by 'assigned to' while there are existing tickets assigned to this agent", () => {
    function assertionFn(length, date) {
      cy.get(' td[aria-colindex="7"] > div ')
        .should("have.length", length)
        .contains(date);
    }
    tickets.filter(
      dropDown,
      assertionFn,
      [
        ticketsSelector.assignedToDrobDown,
        ticketsSelector.assignedToList,
        "Training Program",
      ],
      [6, "14"]
    );
  });

  it('should filter by an existing "Request time"', () => {
    function assertionFn(length, date) {
      cy.get(' td[aria-colindex="7"] > div ')
        .should("have.length", length)
        .contains(date);
    }
    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.requestTime, ticketsSelector.requestTimeCalender, "14"],
      [5, "14"]
    );
  });

  it('Should filter by a non existing "Request time"', () => {
    function assertionFn() {
      tickets.isContainRecords()
    }
    tickets.filter(dropDown, assertionFn, [
      ticketsSelector.requestTime,
      ticketsSelector.requestTimeCalender,
      "20",
    ]);
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
    function assertionFn() {
      cy.get('td[aria-colindex="4"]').should("have.length", 0);
      tickets.isContainRecords()
    }

    tickets.filter(dropDown, assertionFn, [
      ticketsSelector.categoryDrobDown,
      ticketsSelector.categoryList,
      "Task",
    ]);
  });

  it("Should filter by ticket status while there're existing tickets has this status", () => {
    function assertionFn(value) {
      cy.get('td[aria-colindex="3"] > div > div  span').each(($el) => {
        expect($el.text()).to.equal(value);
      });
    }

    tickets.filter(
      dropDown,
      assertionFn,
      [ticketsSelector.statusDrobDown, ticketsSelector.statusList, "New"],
      ["New"]
    );
  });

  it("Should filter by ticket status while there're non existing tickets has this status", () => {
    function assertionFn() {
      cy.get('td[aria-colindex="3"] > div > div  span').should(
        "have.length",
        0
      );
      tickets.isContainRecords()
    }

    tickets.filter(dropDown, assertionFn, [
      ticketsSelector.statusDrobDown,
      ticketsSelector.statusList,
      "Canceled",
    ]);
  });

  it("Should Filter by ticket priority while there're existing tickets has this priority ", () => {
    function assertionFn(value) {
      cy.get(
        'td[aria-colindex="2"] > :nth-child(1) > :nth-child(1) > div > .fas'
      ).each(($el) => {
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
    function assertionFn() {
      cy.get(
        'td[aria-colindex="2"] > :nth-child(1) > :nth-child(1) > div > .fas'
      ).should("have.length", 0);

      tickets.isContainRecords();
    }

    tickets.filter(dropDown, assertionFn, [
      ticketsSelector.priorityDrobDown,
      ticketsSelector.priorityList,
      "Normal",
    ]);
  });

  it("Should Filter by channel while there're exist tickets has this channel ", () => {
    function assertionFn(value) {
      cy.get(
        'td[aria-colindex="5"] > :nth-child(1) > .channel-badge-fixed-font > span'
      ).each(($el) => {
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
      ticketsSelector.requestTime,
      ticketsSelector.requestTimeCalender,
      "14",
    ];

    function assertionFn(value, date) {
      cy.get('td[aria-colindex="4"]').each(($el) => {
        expect($el.text()).to.equal(`${value}`);
      });
      cy.get(' td[aria-colindex="7"] > div ').contains(date).should("exist");
    }
    function testCaseFn(
      ticketsSsernameSelector,
      userName,
      category,
      categoryList,
      categoryOption,
      requestTime,
      calender,
      time
    ) {
      type(ticketsSsernameSelector, userName);
      dropDown(category, categoryList, categoryOption);
      dropDown(requestTime, calender, time);
    }
    tickets.filter(testCaseFn, assertionFn, params, ["Incident", 14]);
  });

  it("see detials", () => {
    function isSuccess(colorRGB) {
      cy.get(ticketsSelector.statusContainer).should(
        "have.css",
        "background-color",
        colorRGB
      );
      cy.get(ticketsSelector.notificationGroup, { timeout: 6000 })
        .should("exist")
        .and("contain.text", "SUCCESS Saving Information Succeeded");
      cy.get(ticketsSelector.notificationGroup).click();
    }
    cy.visit("https://app.qa.dev.tactful.ai/v/engage/erp/editTicket/406");
    waitFor(".loader-container", "not.exist");
    dropDown(".status-container button", ".status-container div", "New");
    isSuccess("rgb(230, 195, 72)");
    dropDown(".status-container button", ".status-container div", "Solved");
    isSuccess("rgb(2, 188, 119)");
    dropDown(".status-container button", ".status-container div", "Canceled");
    isSuccess("rgb(232, 74, 95)");
    dropDown(
      ".status-container button",
      ".status-container div",
      "In Progress"
    );
    isSuccess("rgb(21, 145, 207)");
  });


  
});
