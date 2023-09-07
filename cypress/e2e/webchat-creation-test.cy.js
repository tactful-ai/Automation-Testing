/// <reference types="cypress"/>
import { webchatSelector } from "../fixtures/selectors";
import { click, clickOn, dropDown, type, waitFor } from "../page-objects/actions";
import { conditions } from "../page-objects/conditions";
import { webchat } from "../page-objects/webchat";
import webchatData from "../fixtures/webchat-data.json";

describe("webchat creation tests", () => {
  const url = "https://app.qa.dev.tactful.ai/v/engage/channels";
  const webchatUrl = "https://app.qa.dev.tactful.ai/v/engage/channels/createChannel/webchat";
  
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });
  
  before(() => {
    cy.intercept(`*`, { log: false });
    cy.fixture("login").then((data) => {
      cy.manualLogin(data.username, data.password, url, "#kc-form-buttons");
    });
  });

  it('Check existing of button "Connect new Channel"', () => {
    cy.goTo(url);
    waitFor(".loader-container", "not.exist");
    dropDown("#dropdown-1__BV_toggle_", 'ul[role="menu"]', "Webchat");
    waitFor(".loader-container", "not.exist");
    cy.checkUrl(webchatUrl);
  });

  describe("testing second step (channel settings) in webchat creation test", () => {
    beforeEach(() => {
      cy.goTo(webchatUrl);
      waitFor(".loader-container", "not.exist");
    });
    it('Check leaving "Channel name field" field empty', () => {
      type(webchatSelector.tagInput, "tag12");
      clickOn(["button", "Next"]);
      webchat.fieldErrors(webchatSelector.channelNameInput, webchatSelector.validationError);
      type(webchatSelector.tagInput, "{selectAll}{backspace}");
    });

    it('Check adding space or tab in the "tag"', () => {
      type(webchatSelector.tagInput, "          ");
      webchat.fieldErrors(webchatSelector.tagInput, webchatSelector.validationError);
    });

    it('Check leaving "tag" field empty', () => {
      type(webchatSelector.channelNameInput, "name");
      clickOn(["button", "Next"]);
      webchat.fieldErrors(webchatSelector.tagInput, webchatSelector.validationError);
    });

    it("check click Next button when all fields added correctly ", () => {
      type(webchatSelector.channelNameInput, "name2");
      type(webchatSelector.tagInput, "tag2");
      clickOn(["button", "Next"]);
      cy.get(".current > .stepper-item__counter").should("have.text", " 2 ");
    });
  });
  describe("testing second step (channel settings) in webchat creation test", () => {
    beforeEach(() => {
      cy.goTo(webchatUrl);
      waitFor(".loader-container", "not.exist");
      webchat.skipChannelInfo();
    });

    it('Check Active "Show your logo"', () => {
      conditions.ifNot(webchatSelector.uploadLogoSwitcher, (s) => {
        cy.contains("Appearance").click();
      });
      cy.get(webchatSelector.uploadLogoSwitcher + " span").should("have.class", "switcher-yes");
      cy.get(webchatSelector.uploadLogoLink).should("exist");
    });

    it('Check Active "Enable lead capture"', () => {
      click(webchatSelector.leadCaptureSwitcher);
    });

    it("Check can choose Minimized window for your webchat ", () => {
      click(webchatSelector.minimizedImg);
      cy.get(webchatSelector.squareLauncher).should("exist");
    });

    it('Check Active "add title " for webchat and add it and add more than 16 characters to tile ', () => {
      click(webchatSelector.titleSwitcher);
      cy.get(webchatSelector.titleInput).should("not.be.disabled");
      type(webchatSelector.titleInput, webchatData.bigTitle);
      cy.get(webchatSelector.titleInput).then(($el) => {
        expect($el.text()).length.to.be.lessThan(17);
      });
      click(webchatSelector.titleSwitcher);
    });

    it('Check Active "add title " for webchat and add it and write valid tile ', () => {
      click(webchatSelector.titleSwitcher);
      cy.get(webchatSelector.titleInput).should("not.be.disabled");
      type(webchatSelector.titleInput, webchatData.normalTitle);
    });

    it("Check can Customize your color(more colors)", () => {
      cy.contains("More colors").siblings(".radio-dot").click();
      function changeColor(input, colorHex, colorRGB, changein, style = "background-color") {
        cy.contains(input)
          .siblings(".color-picker")
          .children('input[type="color"]')
          .invoke("val", colorHex)
          .trigger("input");

        cy.get(changein).should("have.css", style, colorRGB);
      }
      webchatData.elementsOfChat.forEach((element) => {
        changeColor(...element);
      });
    });
    it("check type -ve numbers of side spacing", () => {
      conditions.ifNot(webchatSelector.spacing, (s) => {
        cy.contains("Position").click();
      });
      cy.get('.apperance-accordion input[type="number"]')
        .eq(0)
        .as("side-spacing")
        .clear()
        .type(webchatData.negetiveNumberForPosition);
      webchat.fieldErrors("@side-spacing", webchatSelector.validationError, "Minimum number is 0");
      type("@side-spacing", webchatData.normalNumberForPosition);
    });
    it("check type -ve numbers of Bottom  spacing", () => {
      conditions.ifNot(webchatSelector.spacing, (s) => {
        cy.contains("Position").click();
      });
      cy.get('.apperance-accordion input[type="number"]')
        .eq(1)
        .as("bottom-spacing")
        .clear()
        .type(webchatData.negetiveNumberForPosition);
      webchat.fieldErrors("@bottom-spacing", webchatSelector.validationError, "Minimum number is 0");
      type("@bottom-spacing", webchatData.normalNumberForPosition);
    });

    it("check click Done after copying snippet ", () => {
      cy.contains("button", "Connect").click();
    });
  });

  describe("test editing channels", () => {
    it("check can clicking on Edit channel ", () => {
      cy.visit(url);
      waitFor(".loader-container", "not.exist");
      cy.contains(webchatSelector.channelTag, "#2").siblings(webchatSelector.channelEdit).click();
    });
    it("check click discard ", () => {
      cy.goTo(webchat.getEditUrl("2"));
      waitFor(".loader-container", "not.exist");
      type(webchatSelector.tagInput, "22");
      clickOn(["button", "Discard"]);
      cy.get(webchatSelector.tagInput).should("contain.value", "2");
    });
    it.only("check edit channel name with another valid name ", () => {
        webchatData.editCount +=1
        cy.writeFile("cypress/fixtures/webchat-data.json" , JSON.stringify(webchatData));
      webchat.editWebChannelName("2", `${webchatData.editedName} ${webchatData.editCount}`);
      cy.get(webchatSelector.channelName, { timeout: 15000 }).contains(`${webchatData.editedName} ${webchatData.editCount}`).should("exist");
    });
    it("check editing tag to an existent tag at thesame profile", () => {
      webchat.editWebChannelTag("2", "tag");
      waitFor(".loader-container", "not.exist");

      cy.get(".danger", { timeout: 6000 }).should("exist");
    });
  });
});
