const def = {
  wait: undefined,
  assertionFunction(el) {},
  force: false,
};

export function type(selectors, value, options = {}) {
  if (typeof selectors === "string") {
    return cy
      .get(selectors, options.configGet)
      .type(value, options.configAction);
  } else if (Array.isArray(selectors) && Array.isArray(value)) {
    return selectors.forEach((selector, index) => {
      cy.get(selector, options.configGet).type(
        value[index],
        options.configAction
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

export function waitFor(loadingElement, condition, value = "") {
  return cy.get(loadingElement, { timeout: 100000 }).should(condition, value);
}

export function clickOn(selector, text) {
  cy.get(selector).contains(text).click();
}

export function click(selectors, options = def) {
  if (typeof selectors === "string") {
    cy.get(selectors, { timeout: options.wait })
      // .should("exist")
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

export function dropDown(dropDownBtn, optionList, text,options={}) {
  click(dropDownBtn);

  //choose from options of the drop down menu
  if (Array.isArray(text)) {
    text.forEach(($option) => {
      cy.get(optionList).contains($option).click(options.clickConfig||{force:false});
    });
  } else if (typeof text == "string") {
    cy.get(optionList).contains(text).click(options.clickConfig||{force:false});
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
