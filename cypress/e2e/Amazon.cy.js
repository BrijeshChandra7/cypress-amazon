import SearchProduct from "../PageObjects/SearchProduct";
describe('Amazon',()=>{
    before('Enter Amazon',()=>{
        cy.visit("/");
        cy.fixture('Amazon.json').as('Data');
    })

    it('enter product',()=>{
        cy.get('@Data').then((data)=>{
            SearchProduct.enterProduct(data.Product1);
            SearchProduct.clickOnSearch();
            SearchProduct.verifyResultPage('Results');
            SearchProduct.verifyColorChange();

        })
       
    })
})