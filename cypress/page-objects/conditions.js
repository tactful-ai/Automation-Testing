class Conditions {
  failed = false;
  if(selector, callbackFn,elseCallbackFn= ()=>{}, parent = "body") {
    console.log("trying if");
    cy.get(parent).then(($parent) => {
      if ($parent.find(selector).length) {
        // this.failed = false;
        callbackFn();
      }else{
        elseCallbackFn
      } 
    });
  }

  

  ifNot(selector, callbackFn, parent = "body") {
    console.log("trying if");
    cy.get(parent).then(($parent) => {
      if (!$parent.find(selector).length) {
        callbackFn(selector);
      }else{
        this.failed = true;
        return this
      }  
    });
  }

  else(elseCallbackFn, selector = "") {
    if (this.failed) {
      elseCallbackFn;
      this.failed = false;
    }
  }
}
export let conditions = new Conditions();
