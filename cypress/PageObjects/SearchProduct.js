class searchProduct {
  txtBoxSearchProd = "input#twotabsearchtextbox";
  btnSearch = "input#nav-search-submit-button";
  txtResult = "span.a-size-medium-plus.a-color-base.a-text-bold";
  txtAllResult = ".a-size-medium.a-color-base.a-text-normal";
  AllProductLink =
    "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal";
  ProductAvailability = "span.a-size-medium.a-color-success";
  btnAddToCart = "input#add-to-cart-button";
  btnProceedToCheckout = 'input[aria-labelledby="attach-sidesheet-checkout-button-announce"]';

  enterProduct(product) {
    cy.assertElementVisibility(this.txtBoxSearchProd);
    cy.enterText(this.txtBoxSearchProd, product);
  }

  clickOnSearch() {
    cy.clickElement(this.btnSearch);
  }

  verifyResultPage(txt) {
    cy.assertElementVisibility(this.txtResult);
    cy.verifyElementText(this.txtResult, txt);
  }
  verifyColorChange() {
    cy.get(this.txtAllResult)
      .first()
      .invoke("css", "color")
      .then((colorBefore) => {
        cy.log(colorBefore);
        cy.get(this.txtAllResult).first().realHover();
        cy.get(this.txtAllResult)
          .first()
          .invoke("css", "color")
          .then((colorAfter) => {
            cy.log(colorAfter);
            expect(colorBefore).not.to.equal(colorAfter);
          });
      });
  }
  clickOnProduct() {
    cy.get(this.AllProductLink).first().invoke("removeAttr", "target").click();
  }

  verifyStockAvailability(text) {
    cy.verifyElementText(this.ProductAvailability, text);
  }

  clickOnAddToCart() {
    cy.clickElement(this.btnAddToCart);
  }

  clickOnProceedToCheckout() {
    cy.clickElement(this.btnProceedToCheckout);
  }
}
export default new searchProduct();
