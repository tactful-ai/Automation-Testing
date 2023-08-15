const def = {
  wait:undefined,
  assertionFunction(el) {},
  force: false,
};

export function type(arrayOfElements, options = def) {
  if (!Array.isArray(arrayOfElements)) {
    console.error("Type expects an array of objects");
  }else{
      arrayOfElements.forEach((element) => {
          cy.get(element.selector, { timeout: options.wait })
          .as("input")
          .should("exist")
          .and("be.visible")
          .type(element.value)
          .then(() => {
              if (typeof options.assertionFunction === "function") {
                  options.assertionFunction(element);
                }
            });

        });
    }
}

export function assert(arrayOfElements, condition, options=def) {
  if (!Array.isArray(arrayOfElements)) {
    console.error("Type expects an array of objects");
    return;
  }
  arrayOfElements.forEach((element) => {
    cy.get(element.selector, { timeout: options.wait }).should(
      condition,
      element.value
    );
  });
}

export function click(selectors, options = def) {
  if (typeof selectors === "string") {
    cy.get(selectors, { timeout: options.wait })
      .should("exist")
      .and("be.visible")
      .click({ force: options.force })
      .then(() => {
        if (typeof options.assertionFunction === "function") {
          options.assertionFunction(selectors);
        }
      });
  } else if (Array.isArray(selectors)) {
    cy.get(selector, { timeout: options.wait })
      .should("exist")
      .and("be.visible")
      .click({ force: options.force })
      .then(() => {
        if (typeof options.assertionFunction === "function") {
          options.assertionFunction(selector);
        }
      });
  }
}

export function check(selectors, options = def) {
  if (typeof selectors === "string") {
    cy.get(selectors, { timeout: options.wait })
      .as('checkbox')
      .should("exist")
      .and("be.visible")
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
        .and("be.visible")
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
