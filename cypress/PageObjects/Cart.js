class cart{
    IconCart = "span.nav-cart-icon.nav-sprite";
    RandomClick = "#dp";
    DropdownQuantity = 'span[data-action="a-dropdown-button"]';
    DropdownQuantityValues = 'ul[role="listbox"]';
    CartProduct = "span.a-list-item a.a-link-normal.sc-product-link";

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
        cy.get(this.DropdownQuantityValues).contains(qty).click({force:true});
    }

    OpenProductDtails() {
        cy.get(this.CartProduct).invoke('removeAttr','target').click();
    }
}

export default new cart();