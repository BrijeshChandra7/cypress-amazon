import SearchProduct from "../PageObjects/SearchProduct";
import AllHamburger from "../PageObjects/AllHamburger";
describe("Amazon", () => {
  beforeEach("Enter Amazon", () => {
    cy.visit("/");
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.fixture("Amazon.json").as("Data");
  });

  it("enter product", () => {
    cy.get("@Data").then((data) => {
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyResultPage("Results");
      SearchProduct.verifyColorChange();
      SearchProduct.clickOnProduct();
      //SearchProduct.verifyStockAvailability(' In stock ');
      SearchProduct.clickOnAddToCart();
      SearchProduct.clickOnProceedToCheckout();
    });
  });

  it("test 'All' hamburger", () => {
    cy.get("@Data").then((data) => {
      AllHamburger.clickAllHamburger();
      AllHamburger.verifyMenuIsPresent("trending");
      AllHamburger.verifyMenuIsPresent("Best Sellers");
      AllHamburger.clickOnHamburgerMenu("Best Sellers");
      AllHamburger.verifyNewPageText("Amazon Bestsellers");
      AllHamburger.clickAllHamburger();
      AllHamburger.closeMenu();
      SearchProduct.verifyCartItems(0);
    });
  });
});
