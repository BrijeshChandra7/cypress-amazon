class allHamburger{
    hamburgerAll = "span.hm-icon-label";
    AllMenu = 'ul[class="hmenu hmenu-visible"]';
    txtNewPage = 'span#zg_banner_text';
    close = '.celwidget.hmenu-visible > #hmenu-canvas-background > .nav-sprite'
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
    verifyNewPageText(text) {
        cy.verifyElementText(this.txtNewPage, text);
    }
    closeMenu() {
        cy.wait(1000);
        cy.clickElement(this.close);
    }

}
export default new allHamburger();