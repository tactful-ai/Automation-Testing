/// <reference types="cypress" />

import { check, click, type, assert } from "../page-objects/actions";

const data = [
  "my first name",
  "my second name",
  "e3@mail.com",
  "password",
  "password",
];
const elementSelectors = [
  "#firstName",
  "#lastName",
  "#email",
  "#password",
  "#password-confirm",
];
const dataInput = data.map((val, i) => {
  return { value: val, selector: elementSelectors[i] };
});

describe("press free trial, register and fill the inputs till you reach the dashboard", () => {
  it.only("click on free trial and go to register page", () => {
    // visit home page
    cy.navigate();

    // click on the free trail button
    click(".kl-navbar__end > .button");

    //assert if we have the correct number of inputs in form
    cy.get("#kc-register-form  input").should("have.length", 8);

    // fill inputs with the given data => "dataInput"
    type(dataInput);

    assert(dataInput, "contain.value");

    //check agree-terms and receiveEmails checkboxes
    check(["#agree-terms", "#receiveEmails"], {
      assertionFunction: (el) => {
        cy.get(el).should("be.checked");
      },
    });

    //assert if button is no disabled
    assert({ selector: "#kc-register", value: "not.be.disabled" });
    // cy.get("#kc-register").should("not.be.disabled");

    //click register button
    click("#kc-register");

    //check "other" radio button
    click(":nth-child(5) > .radio-dot", {
      wait: 250000,
    });

    //click dropdown menu
    click(".vs__actions");

    //choose from options of the drop down menu
    cy.get("#vs1__listbox > li").contains("Other").click();

    //type in "Your Team Size" input
    const inputSelector =
      '[data-v-db937a32=""][data-v-19ff86ce=""] > span > .tactful-input > .form-input-with-icon-search';
    type([{ selector: inputSelector, value: 4 }]);
    assert([{ selector: inputSelector, value: 4 }], "have.value");

    //click next
    click(
      ':nth-child(2) > .step__form > [data-v-4f723aac=""] > :nth-child(2) > .d-flex > .btn'
    );

    //type website name and brand name
    const CompanyWebsiteInput =
      ":nth-child(1) > .step__input > span > .tactful-input > .form-input-with-icon-search";
    const brandNameinput =
      ":nth-child(2) > .step__input > span > .tactful-input > .form-input-with-icon-search";
    type(
      [
        { selector: CompanyWebsiteInput, value: "www.4erka/kabira.com" },
        { selector: brandNameinput, value: "4erka kabira" },
      ],
      { wait: 250000 }
    );
    assert(
      [
        { selector: CompanyWebsiteInput, value: "www.4erka/kabira.com" },
        { selector: brandNameinput, value: "4erka kabira" },
      ],
      "have.value"
    );

    // change color
    cy.get('span[data-v-20c66459=""] > :nth-child(4) > input')
      .invoke("val", "rgba (41, 2, 0)")
      .trigger("input", { force: true });


    // click(':nth-child(3) > .button-secondary')
    // click(':nth-child(1) > .nav-item > .nav-link',{force:true,wait:500000})
    // cy.wait(10000)
    // cy.get('[data-test="uw-iframe"]')
    // .attachFile('hello-world-logo', { subjectType: 'drag-n-drop' });

    //click next button
    click(":nth-child(6) > .btn");
    cy.get(".px-1", { timeout: 250000 }).should(
      "contain",
      data[0] + " " + data[1]
    );
    click(".homepage-modal__close", { wait: 250000 });
  });
});
