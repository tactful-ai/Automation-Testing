import { webchatSelector } from "../fixtures/selectors";
import { click, waitFor ,type,clickOn} from "./actions";
import { conditions } from "./conditions";

class Webchat {
  url = "https://app.qa.dev.tactful.ai/v/engage/channels";
  webchatUrl =
    "https://app.qa.dev.tactful.ai/v/engage/channels/createChannel/webchat";

  fieldErrors(selector, selectorSibling,errorMsg="This field is required") {
    cy.get(selector)
      .siblings(selectorSibling)
      .should("exist")
      .and("have.text", errorMsg);
  }

  isInChannelInfo() {
    cy.get(".current > .stepper-item__counter").then(($el) => {
       
        console.log($el[0].innerText == "1")
        
      return ($el[0].innerText == "1");
    });
  }

  getEditUrl(tag){
    return `https://app.qa.dev.tactful.ai/v/engage/channels/webchat/editChannel/${tag}/2cf4d871-3ac1-4519-8ba6-6ce153cf1ad0`
}

  editWebChannelTag(oldTag,newTag){
    cy.goTo(this.getEditUrl(oldTag))
        waitFor(".loader-container", "not.exist");
        type(webchatSelector.tagInput,newTag)
        clickOn(["button","Save"])
       
        // cy.get(webchatSelector.channelTag).should("contain.text",newTag)
  }

  editWebChannelName(tag,newName){
    cy.goTo(this.getEditUrl(tag))
        waitFor(".loader-container", "not.exist");
        cy.get(webchatSelector.channelNameInput).type(newName)
        clickOn(["button","Save"])
        
  }

  skipChannelInfo() {
        conditions.if(webchatSelector.channelNameInput,(s)=>{
            cy.get(webchatSelector.channelNameInput).clear().type("name")
            cy.get(webchatSelector.tagInput).clear().type("tag2")
            clickOn(["button", "Next"]);
        waitFor(".loader-container", "not.exist");

            conditions.ifNot(webchatSelector.uploadLogoSwitcher, (s) => {
                cy.contains("Appearance").click();
                

              });
              conditions.ifNot(webchatSelector.spacing,(s)=>{
                cy.contains("Position").click()
              })
        })
  }
}

export let webchat = new Webchat();
