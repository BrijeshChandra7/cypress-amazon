class cart {
  IconCart = "span.nav-cart-icon.nav-sprite";
  RandomClick = "#dp";
  DropdownQuantity = 'span[data-action="a-dropdown-button"]';
  DropdownQuantityValues = 'ul[role="listbox"]';
  CartProduct = "span.a-list-item a.a-link-normal.sc-product-link";
  btnProccedToBuy = 'input[data-feature-id="proceed-to-checkout-action"]';
  txtPrice = ".a-section > .a-size-medium";
  txtSubTotalPrice = "#sc-subtotal-amount-buybox > .a-size-medium";
  txtGift = ".a-alert-content > :nth-child(1) > b";
  btnDelete = 'span[data-csa-c-type="widget"] input[value="Delete"]';
  txtEmptyCartText = ".a-row > .a-spacing-mini";
  checkBoxGift = "input#gift-wrap";
  checkBoxGiftCart = 'input[type="checkbox"]';
  optionsInCart = "div.a-row.sc-action-links";

  CartIconVisibility() {
    cy.get(this.IconCart).should("be.visible");
  }

  OpenCart() {
    cy.clickElement(this.IconCart);
  }

  CloseCartBox() {
    cy.clickElement(this.RandomClick);
  }

  SelectQuantityNum(qty) {
    cy.clickElement(this.DropdownQuantity);
    cy.get(this.DropdownQuantityValues).contains(qty).click({ force: true });
  }

  OpenProductDtails() {
    cy.get(this.CartProduct).invoke("removeAttr", "target").click();
  }

  ClickOnProceedToBuy() {
    cy.clickElement(this.btnProccedToBuy);
  }

  verifyProductPrice(price) {
    cy.get(this.txtPrice).should("contain.text", price);
  }

  verifySubTotalPrice(price, qty) {
    cy.get(this.txtSubTotalPrice)
      .invoke("text")
      .then((text) => {
        let displayedText = text;
        // You can now use displayedText for further assertions or actions
        cy.log(`Displayed Text: ${displayedText}`);
        let numberValue = Number(displayedText.replace(/,/g, ""));
        if (numberValue == price * qty) {
          cy.log("passed");
        } else {
          cy.log("failed");
        }
        expect(numberValue).to.be.equal(price * qty);
      });
  }

  verifyGiftText(text) {
    cy.verifyElementText(this.txtGift, text);
  }

  clickOnDelete() {
    cy.get(this.btnDelete).first().click();
  }

  verifyEmptyCartText(text) {
    cy.verifyElementText(this.txtEmptyCartText, text);
  }

  checkAsGift() {
    cy.assertElementVisibility(this.checkBoxGift);
    cy.get(this.checkBoxGift).check();
  }

  verifyAsGift() {
    cy.assertElementVisibility(this.checkBoxGiftCart);
    cy.get(this.checkBoxGiftCart).first().should("be.checked");
  }

  verifyOptionsInCart(text) {
    cy.get(this.optionsInCart).should("contain.text", text);
    cy.get(this.optionsInCart)
      .invoke("text")
      .then((textReceived) => {
        console.log(textReceived);
      });
  }
}
export default new cart();
