class Homepage{
    
    HomepageTitles = 'h2.a-color-base';
    
    verifyHomepageTitles(title) {
        cy.verifyElementText(this.HomepageTitles, title);
    }

}
export default new Homepage();