/// <reference types="cypress"/>

import { moniteringSelector } from "../fixtures/selectors.js";
import { type } from "../page-objects/actions.js";
import moniter from "../page-objects/moniter";

describe("testing channel monitering page", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
  const url = "https://app.qa.dev.tactful.ai/v/engage/engagement-hub/history";

  beforeEach(() => {
    cy.intercept(`*`, { log: false });
    cy.sessionLogin(
      { selector: "#username", value: "hipeme4062@tipent.com " },
      { selector: "#password", value: "TrainingProgram2023" }
    );
  });
  function AssertionFn(selector, value, options = {}) {
    cy.get(
      `td[aria-colindex="${selector}"] ${options.specifiedChildren || ""}`
    ).each(($el) => {
      expect($el).to.contain(value);
    });
  }
  it("should filter according to the chosen agent", () => {
    moniter.drobDownFilter(
      moniteringSelector.agentDrobDown,
      moniteringSelector.agentList,
      "bot",
      AssertionFn,
      ["5", "bot"]
    );
    moniter.clickReset();

    moniter.drobDownFilter(
      moniteringSelector.agentDrobDown,
      moniteringSelector.agentList,
      "Unassigned"
    );
    moniter.clickReset();
  });

  it("should filter by multible agents", () => {
    moniter.drobDownFilter(
      moniteringSelector.agentDrobDown,
      moniteringSelector.agentList,
      ["bot", "Unassigned"],
      AssertionFn,
      ["5", "bot"]
    );
    moniter.clickReset();
  });

  it("should filter by chosen channel", () => {
    function assertFn() {
      cy.get('[aria-colindex="7"] img').should(
        "have.attr",
        "src",
        "/img/eng-img/icons/webchat-icon.png"
      );
    }
    moniter.drobDownFilter(
      moniteringSelector.channelDrobDown,
      moniteringSelector.channelList,
      "Whatsapp"
    );
    moniter.clickReset();
    moniter.drobDownFilter(
      moniteringSelector.channelDrobDown,
      moniteringSelector.channelList,
      "Web",
      assertFn
    );
    moniter.clickReset();
  });
  it("should filter by multible channels", () => {
    function assertFn() {
      cy.get('[aria-colindex="7"] img').should(
        "have.attr",
        "src",
        "/img/eng-img/icons/webchat-icon.png"
      );
    }
    moniter.drobDownFilter(
      moniteringSelector.channelDrobDown,
      moniteringSelector.channelList,
      ["Web", "Whatsapp"],
      assertFn
    );
  });

  it("should filter according to the chosen tag", () => {
    moniter.drobDownFilter(
      moniteringSelector.tagsDrobDown,
      moniteringSelector.tagsList,
      "Active"
    );
    moniter.clickReset();

    moniter.drobDownFilter(
      moniteringSelector.tagsDrobDown,
      moniteringSelector.tagsList,
      "Top fan"
    );
    moniter.clickReset();

    moniter.drobDownFilter(
      moniteringSelector.tagsDrobDown,
      moniteringSelector.tagsList,
      "Premium"
    );
    moniter.clickReset();
  });

  it("should filter by multible tags selection", () => {
    moniter.drobDownFilter(
      moniteringSelector.tagsDrobDown,
      moniteringSelector.tagsList,
      ["Active", "Top fan", "Premium"]
    );
    moniter.clickReset();
  });

  it("should filter according to the chosen queue", () => {
    moniter.drobDownFilter(
      moniteringSelector.queueDrobDown,
      moniteringSelector.queueList,
      "queue test"
    );
    moniter.clickReset();
    moniter.drobDownFilter(
      moniteringSelector.queueDrobDown,
      moniteringSelector.queueList,
      "email queue"
    );
    moniter.clickReset();
    moniter.drobDownFilter(
      moniteringSelector.queueDrobDown,
      moniteringSelector.queueList,
      "default",
      AssertionFn,
      ["10", "default"]
    );
    moniter.clickReset();
  });

  it("should filter by multible queue selection", () => {
    moniter.drobDownFilter(
      moniteringSelector.queueDrobDown,
      moniteringSelector.queueList,
      ["default", "queue test", "email queue"],
      AssertionFn,
      ["10", "default"]
    );
    moniter.clickReset();
  });

  it("should filter according to the chosen handover", () => {
    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "agent_active"
    );
    moniter.clickReset();

    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "pending"
    );
    moniter.clickReset();

    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "redirect"
    );
    moniter.clickReset();
    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "bot_active",
      AssertionFn,
      ["8", "Bot Active"]
    );
    moniter.clickReset();
  });

  it("should filter by multible handover selection", () => {
    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      ["agent_active", "pending", "redirect", "bot_active"],
      AssertionFn,
      ["8", "Bot Active"]
    );
    moniter.clickReset();
  });

  it("should filter by an existing nick name", () => {
    moniter.inputFilter(moniteringSelector.nickName, "new user", AssertionFn, [
      "2",
      "New User",
    ]);
    moniter.clickReset();
  });

  it("should filter by an non existing nick name", () => {
    moniter.inputFilter(moniteringSelector.nickName, "wrong user");
    moniter.clickReset();
  });


  it("should filter with multible filters", () => {

    function assertFn() {
        cy.get('[aria-colindex="7"] img').should(
          "have.attr",
          "src",
          "/img/eng-img/icons/webchat-icon.png"
        );
      }

    moniter.inputFilter(moniteringSelector.nickName, "new user", AssertionFn, [
        "2",
        "New User",
      ]);
      moniter.drobDownFilter(
        moniteringSelector.HandoverDrobDown,
        moniteringSelector.handOverList,
        "bot_active",
        AssertionFn,
        ["8", "Bot Active"]
      );

      moniter.drobDownFilter(
        moniteringSelector.channelDrobDown,
        moniteringSelector.channelList,
        "Web",
        assertFn
      );

    moniter.clickReset();
  });

});
