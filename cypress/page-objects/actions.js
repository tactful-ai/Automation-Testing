const def = {
  wait: undefined,
  assertionFunction(el) {},
  force: false,
};
function ifOption(option) {
  if(option){
    return option;
  }
}
export function type(selectors, value, options = {}) {
  options.clearFirst = options.clearFirst || true;

  if (typeof selectors === "string") {
    return cy
      .get(selectors, ifOption(options.configGet))
      .type((options.clearFirst?"{selectAll}{backspace}":"") +value, ifOption(options.configAction));
  } else if (Array.isArray(selectors) && Array.isArray(value)) {
    return selectors.forEach((selector, index) => {
      cy.get(selector, ifOption(options.configGet)).type(
        value[index],
        ifOption(options.configAction)
      );
    });
  }
}

export function assert(arrayOfElements, condition, options = def) {
  if (!Array.isArray(arrayOfElements)) {
    console.error("Type expects an array of objects");
  } else {
    arrayOfElements.forEach((element) => {
      cy.get(element.selector, { timeout: options.wait }).should(
        condition,
        element.value
      );
    });
  }
}

export function waitFor(loadingElement=".loader-container", condition="not.exist", value = "") {
  return cy.get(loadingElement, { timeout: 100000 }).should(condition, value);
}

export function clickOn(selectors,options = {}) {
  if(!Array.isArray(selectors[0])){
    cy.contains(...selectors).click(options.clickConfig || { force: false })
  }else if(Array.isArray(selectors[0])){
    selectors.forEach(selector=>{
      cy.contains(...selector).click(options.clickConfig || { force: false })
    })
  }
}

export function click(selectors, options = def) {
  if (typeof selectors === "string") {
    return cy.get(selectors, { timeout: options.wait })
      .should("exist")
      .click({ force: options.force })
      .then(() => {
        if (typeof options.assertionFunction === "function") {
          options.assertionFunction(selectors);
        }
      });
  } else if (Array.isArray(selectors)) {
    selectors.forEach((selector) => {
      cy.get(selector, { timeout: options.wait })
        .should("exist")
        .click({ force: options.force })
        .then(() => {
          if (typeof options.assertionFunction === "function") {
            options.assertionFunction(selector);
          }
        });
    });
  }
}

export function dropDown(dropDownBtn, optionList, text, options = {}) {
  click(dropDownBtn);

  //choose from options of the drop down menu
  if (Array.isArray(text)) {
    text.forEach(($option) => {
      cy.get(optionList)
        .contains($option)
        .click(options.clickConfig || { force: false });
    });
  } else if (typeof text == "string") {
    cy.get(optionList)
      .contains(text)
      .click( { force: true });
  }
}

export function check(selectors, options = def) {
  if (typeof selectors === "string") {
    cy.get(selectors, { timeout: options.wait })
      .as("checkbox")
      .should("exist")
      .check()
      .then(() => {
        if (typeof options.assertionFunction === "function") {
          options.assertionFunction(selectors);
        }
      });
  } else if (Array.isArray(selectors)) {
    for (const selector of selectors) {
      cy.get(selector, { timeout: options.wait })
        .should("exist")
        .check()
        .then(() => {
          {
            if (typeof options.assertionFunction === "function") {
              options.assertionFunction(selector);
            }
          }
        });
    }
  }
}
