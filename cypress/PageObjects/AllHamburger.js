class allHamburger{
    hamburgerAll = "span.hm-icon-label";
    AllMenu = 'ul[class="hmenu hmenu-visible"]';
    clickAllHamburger() {
        cy.assertElementVisibility(this.hamburgerAll);
        cy.clickElement(this.hamburgerAll);
    }
    verifyMenuIsPresent(menu) {
        cy.get(this.AllMenu).children().should('contain.text', menu);
        cy.get(this.AllMenu).children().contains(menu).realHover();
    }
    clickOnHamburgerMenu(menu) {
        cy.get(this.AllMenu).children().should('contain.text', menu);
        cy.get(this.AllMenu).children().contains(menu).click();
    }

}
export default new allHamburger();