import SearchProduct from "../PageObjects/SearchProduct";
import AllHamburger from "../PageObjects/AllHamburger";
import Homepage from "../PageObjects/Homepage";
import Cart from "../PageObjects/Cart";

describe("Amazon", () => {
  beforeEach("Enter Amazon", () => {
    cy.clearAllCookies;
    cy.clearAllLocalStorage;
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
      SearchProduct.verifyCartItems(1);
      
    });
  });

  it("Homepage Titles", () => {
    cy.get("@Data").then((data) => {
      Homepage.verifyHomepageTitles('Today’s Deals');
      
    });
  });

  it("Check whether the Shopping Cart button is seen on the product display page.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();

    });
  });

  it("Check whether the quantity of the product increases when Adding item to the cart.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      //Cart.CloseCartBox();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      Cart.SelectQuantityNum(5);
      SearchProduct.verifyCartItems(5);
    });
  });

  it("Check whether the quantity is decreased when removing some items from the cart.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      //Cart.CloseCartBox();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      Cart.SelectQuantityNum(5);
      SearchProduct.verifyCartItems(5);
      Cart.SelectQuantityNum(2);
      SearchProduct.verifyCartItems(2);
    });
  });

  it("Check whether the user can remove all items from the cart, the cart should be displayed as empty", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      //Cart.CloseCartBox();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      Cart.SelectQuantityNum(5);
      SearchProduct.verifyCartItems(5);
      Cart.SelectQuantityNum(0);
      SearchProduct.verifyCartItems(0);
    });
  });

  it.only("Check whether the page redirects to the product detail page when clicking on the product in the shopping cart.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      //Cart.CloseCartBox();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      Cart.SelectQuantityNum(5);
      SearchProduct.verifyCartItems(5);
      Cart.OpenProductDtails();
      
    });
  });
  
});
