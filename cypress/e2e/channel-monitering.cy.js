/// <reference types="cypress"/>

import { moniteringSelector } from "../fixtures/selectors.js";
import moniterData from "../fixtures/moniter-mock-data.json";
import moniter from "../page-objects/moniter";

describe("testing channel monitering page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  console.log(moniteringSelector);
  const url = "https://app.qa.dev.tactful.ai/v/engage/engagement-hub/history";

  beforeEach(() => {
    cy.intercept("https://livechat-server.qa.dev.tactful.ai/conversation/getConversationByQuery", (req) => {
      req.reply(moniterData.queueConvos)  
    }).as("convos");
  });
  before(() => {
    cy.intercept(`*`, { log: false });
    cy.intercept("https://livechat-server.qa.dev.tactful.ai/conversation/getConversationByQuery", (req) => {
      req.reply(moniterData.queueConvos)  
    }).as("convos")
  
    cy.manualLogin(
      { selector: "#username", value: "hipeme4062@tipent.com " },
      { selector: "#password", value: "TrainingProgram2023" },
      url,
      "#kc-form-buttons"
    );
  });
  function AssertionFn(selector, value, options = {}) {
    cy.get(`td[aria-colindex="${selector}"] ${options.specifiedChildren || ""}`).each(($el) => {
      expect($el).to.contain(value);
    });
  }

  it("should filter according to the chosen agent", () => {

    moniter.drobDownFilterOnly(moniteringSelector.agentDrobDown, moniteringSelector.agentList, "bot", AssertionFn, [
      "5",
      "bot",
    ]);

    moniter.drobDownFilterOnly(moniteringSelector.agentDrobDown, moniteringSelector.agentList, "Unassigned");
  });

  it("should filter by multible agents", () => {
    moniter.drobDownFilterOnly(
      moniteringSelector.agentDrobDown,
      moniteringSelector.agentList,
      ["bot", "Unassigned"],
      AssertionFn,
      ["5", "bot"]
    );
  });

  it("should filter by chosen channel", () => {
    function assertFn() {
      cy.get('[aria-colindex="7"] img').should("have.attr", "src", "/img/eng-img/icons/webchat-icon.png");
    }
    moniter.drobDownFilterOnly(moniteringSelector.channelDrobDown, moniteringSelector.channelList, "Whatsapp");
    moniter.drobDownFilterOnly(moniteringSelector.channelDrobDown, moniteringSelector.channelList, "Web", assertFn);
  });
  it("should filter by multible channels", () => {
    function assertFn() {
      cy.get('[aria-colindex="7"] img').should("have.attr", "src", "/img/eng-img/icons/webchat-icon.png");
    }
    moniter.drobDownFilterOnly(
      moniteringSelector.channelDrobDown,
      moniteringSelector.channelList,
      ["Web", "Whatsapp"],
      assertFn
    );
  });

  it("should filter according to the chosen tag", () => {
    moniter.drobDownFilterOnly(moniteringSelector.tagsDrobDown, moniteringSelector.tagsList, "Active");

    moniter.drobDownFilterOnly(moniteringSelector.tagsDrobDown, moniteringSelector.tagsList, "Top fan");

    moniter.drobDownFilterOnly(moniteringSelector.tagsDrobDown, moniteringSelector.tagsList, "Premium");
  });

  it("should filter by multible tags selection", () => {
    moniter.drobDownFilterOnly(moniteringSelector.tagsDrobDown, moniteringSelector.tagsList, [
      "Active",
      "Top fan",
      "Premium",
    ]);
  });

  it("should filter according to the chosen queue", () => {
    moniter.drobDownFilterOnly(moniteringSelector.queueDrobDown, moniteringSelector.queueList, "queue test");

    moniter.drobDownFilterOnly(moniteringSelector.queueDrobDown, moniteringSelector.queueList, "email queue");

    moniter.drobDownFilterOnly(moniteringSelector.queueDrobDown, moniteringSelector.queueList, "default", AssertionFn, [
      "10",
      "default",
    ]);
  });

  it("should filter by multible queue selection", () => {
    moniter.drobDownFilterOnly(
      moniteringSelector.queueDrobDown,
      moniteringSelector.queueList,
      ["default", "queue test", "email queue"],
      AssertionFn,
      ["10", "default"]
    );
  });

  it("should filter according to the chosen handover", () => {
    moniter.drobDownFilterOnly(moniteringSelector.HandoverDrobDown, moniteringSelector.handOverList, "agent_active");

    moniter.drobDownFilterOnly(moniteringSelector.HandoverDrobDown, moniteringSelector.handOverList, "pending");

    moniter.drobDownFilterOnly(moniteringSelector.HandoverDrobDown, moniteringSelector.handOverList, "redirect");

    moniter.drobDownFilterOnly(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "bot_active",
      AssertionFn,
      ["8", "Bot Active"]
    );
  });

  it("should filter by multible handover selection", () => {
    moniter.drobDownFilterOnly(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      ["agent_active", "pending", "redirect", "bot_active"],
      AssertionFn,
      ["8", "Bot Active"]
    );
  });

  it("should filter by an existing nick name", () => {
    moniter.inputFilterOnly(moniteringSelector.nickName, "new user", AssertionFn, ["2", "New User"]);
  });

  it("should filter by an non existing nick name", () => {
    moniter.inputFilterOnly(moniteringSelector.nickName, "wrong user");
  });

  it("should filter with multible filters", () => {
    function assertFn() {
      cy.get('[aria-colindex="7"] img').should("have.attr", "src", "/img/eng-img/icons/webchat-icon.png");
    }
    moniter.clickReset();
    moniter.inputFilter(moniteringSelector.nickName, "new user", AssertionFn, ["2", "New User"]);
    moniter.drobDownFilter(
      moniteringSelector.HandoverDrobDown,
      moniteringSelector.handOverList,
      "bot_active",
      AssertionFn,
      ["8", "Bot Active"]
    );

    moniter.drobDownFilter(moniteringSelector.channelDrobDown, moniteringSelector.channelList, "Web", assertFn);
  });
});
