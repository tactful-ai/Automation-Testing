class Conditions{
    failed = false
    if(selector,callbackFn,parent="body") {
        cy.get(parent).then(($parent) => {
          if ($parent.find(selector).length) {
            this.failed = false
            callbackFn(selector)
            return
          }else{
            this.failed = true
            return this
          }
        });
      }

      else(elseCallbackFn,selector=""){
        if(this.failed){
            elseCallbackFn
            this.failed =false
        }
      }
}
export let conditions= new Conditions();
