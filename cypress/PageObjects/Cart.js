class cart {
    IconCart = "span.nav-cart-icon.nav-sprite";
    RandomClick = "#dp";
    DropdownQuantity = 'span[data-action="a-dropdown-button"]';
    DropdownQuantityValues = 'ul[role="listbox"]';
    CartProduct = "span.a-list-item a.a-link-normal.sc-product-link";
    btnProccedToBuy = 'input[data-feature-id="proceed-to-checkout-action"]';
    txtPrice = '.a-section > .a-size-medium';
    txtSubTotalPrice = '#sc-subtotal-amount-buybox > .a-size-medium';
 

    CartIconVisibility() {
        cy.get(this.IconCart).should('be.visible');
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
        cy.get(this.CartProduct).invoke('removeAttr', 'target').click();
    }

    ClickOnProceedToBuy() {
        cy.clickElement(this.btnProccedToBuy);
    }

    verifyProductPrice(price) {
        cy.get(this.txtPrice).should('contain.text', price);
    }
    
    verifySubTotalPrice(price, qty) {
        cy.get(this.txtSubTotalPrice).invoke('text').then((text) => {
            let displayedText = text;
            // You can now use displayedText for further assertions or actions
            cy.log(`Displayed Text: ${displayedText}`);
            let numberValue = Number(displayedText.replace(/,/g, ''));
            if (numberValue == price * qty) {
                cy.log('passed')
            }
            else {
                cy.log('failed');
            }
            expect(numberValue).to.be.equal(price * qty);

            // Compare the initial and updated total prices
   
        
        });
}
}
export default new cart();