import SearchProduct from "../PageObjects/SearchProduct";
import AllHamburger from "../PageObjects/AllHamburger";
import Homepage from "../PageObjects/Homepage";

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
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyResultPage("Results");
      SearchProduct.verifyColorChange();
      SearchProduct.clickOnProduct();
      SearchProduct.verifyStockAvailability(' In stock ');
      SearchProduct.clickOnAddToCart();
     // SearchProduct.clickOnProceedToCheckout();
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

  it("Add to cart", () => {
    cy.get("@Data").then((data) => {
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyResultPage("Results");
      SearchProduct.verifyColorChange();
      SearchProduct.clickOnProduct();
      SearchProduct.verifyStockAvailability(' In stock ');
      SearchProduct.clickOnAddToCart();
      SearchProduct.closeCartPanel();
      SearchProduct.verifyCartItems(1);
      
    });
  });

  it("Homepage Titles", () => {
    cy.get("@Data").then((data) => {
      Homepage.verifyHomepageTitles('Today’s Deals');
      
    });
  });
});
