class searchProduct{
    txtBoxSearchProd = "input#twotabsearchtextbox";
    btnSearch =  "input#nav-search-submit-button";
    txtResult = "span.a-size-medium-plus.a-color-base.a-text-bold";
    txtAllResult = "span.a-size-medium.a-color-base.a-text-normal";
    
    enterProduct(product){
        cy.assertElementVisibility(this.txtBoxSearchProd);
        cy.enterText(this.txtBoxSearchProd,product);
    }

    clickOnSearch(){
        cy.clickElement(this.btnSearch);
    }

    verifyResultPage(txt){
        cy.assertElementVisibility(this.txtResult);
        cy.verifyElementText(this.txtResult,txt);
    }
    verifyColorChange(){
      /*  cy.assertElementVisibility(this.txtAllResult);
        cy.get(this.txtAllResult).should('have.css','color','rgb(15, 17, 17)');
        //cy.get(this.txtAllResult).eq(0).trigger('mouseover', {force:true});
        cy.get(this.txtAllResult).first().invoke('css', 'color').then((colorBefore)=>{
            cy.log(colorBefore);
        })
        cy.get(this.txtAllResult).first().realHover();
        cy.get(this.txtAllResult).first().invoke('css', 'color').then((colorAfter)=>{
            cy.log(colorAfter);
        })
        // cy.wait(1000);
        // cy.get(this.txtAllResult).eq(0).should('have.css','color','rgb(196, 85, 0)');
        //cy.get(this.txtAllResult).eq(0).should('have.css', 'color' , 'rgb(199, 85, 33)'); */
      
          
              cy.get(".a-size-medium.a-color-base.a-text-normal")
                .first()
                .invoke("css", "color")
                .then((colorBefore) => {
                  cy.log(colorBefore);
                  cy.get(".s-main-slot .a-link-normal.a-text-normal").first().realHover();
                  cy.get(".a-size-medium.a-color-base.a-text-normal")
                    .first()
                    .invoke("css", "color")
                    .then((colorAfter) => {
                      cy.log(colorAfter);
                      expect(colorBefore).not.to.equal(colorAfter);
                    });
                });
           
    }



}
export default new searchProduct();