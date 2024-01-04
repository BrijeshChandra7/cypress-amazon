import SearchProduct from "../PageObjects/SearchProduct";
import AllHamburger from "../PageObjects/AllHamburger";
import Homepage from "../PageObjects/Homepage";
import Cart from "../PageObjects/Cart";

describe("Amazon", () => {
  beforeEach("Enter Amazon", () => {
    cy.clearAllCookies;
    cy.clearAllLocalStorage;
    cy.visit("/");
    Cypress.on("uncaught:exception", (err, runnable) => {
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
      SearchProduct.verifyStockAvailability(" In stock ");
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
      SearchProduct.verifyStockAvailability(" In stock ");
      SearchProduct.clickOnAddToCart();
      SearchProduct.verifyCartItems(1);
    });
  });

  it("Homepage Titles", () => {
    cy.get("@Data").then((data) => {
      Homepage.verifyHomepageTitles("Today’s Deals");
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

  it("Check whether the page redirects to the product detail page when clicking on the product in the shopping cart.", () => {
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

  it("Check whether the user is redirected to the checkout page after clicking on the checkout button.", () => {
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
      Cart.ClickOnProceedToBuy();
    });
  });

  it("Check whether the total price is added when the product is added to the cart.", () => {
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
      Cart.verifyProductPrice("78,900.00");
      Cart.verifySubTotalPrice(78900.0, 5);
    });
  });

  it("Check whether the total price reduces when the product is removed from the cart.", () => {
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
      Cart.verifyProductPrice("78,900.00");
      Cart.verifySubTotalPrice(78900.0, 5);
      Cart.SelectQuantityNum(4);
      cy.wait(2000);
      Cart.verifySubTotalPrice(78900.0, 4);
    });
  });

  it("Check whether the total price reduces when the product is removed from the cart.", () => {
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
      Cart.clickOnDelete();
      Cart.verifyGiftText("Your order is eligible for FREE Delivery.");
    });
  });

  it("Check whether the user is able to delete the product from the cart.", () => {
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
      Cart.clickOnDelete();
      Cart.verifyEmptyCartText("Your Amazon Cart is empty.");
    });
  });

  it("Check whether the item is added to the cart when clicking on the button.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      Cart.SelectQuantityNum(5);
      SearchProduct.verifyCartItems(5);
    });
  });

  it("Check whether the user can add a product as gift.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      Cart.checkAsGift();
      SearchProduct.clickOnAddToCart();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      SearchProduct.verifyCartItems(1);
      Cart.verifyAsGift();
    });
  });

  it("Check whether the shopping cart page has options for edit, delete, save etc", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.clickOnProduct();
      SearchProduct.clickOnAddToCart();
      SearchProduct.verifyCartItems(1);
      Cart.OpenCart();
      SearchProduct.verifyCartItems(1);
      Cart.verifyOptionsInCart("Delete");
      Cart.verifyOptionsInCart("Share");
      Cart.verifyOptionsInCart("Qty:1");
    });
  });

  it("Verify that search field accepts alphabets, numbers or symbols.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.enterProduct(data.Product3);
      SearchProduct.enterProduct(data.Product4);
    });
  });

  it("Verify that sorting options should be present on search results page.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifySortPresent();
    });
  });

  it("Verify that sorting option is clickable", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifySortPresent();
      SearchProduct.clickSort();
    });
  });

  it("Verify that user is able to select sorting option", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifySortPresent();
      SearchProduct.clickSort();
      SearchProduct.selectSort("Price: High to Low");
    });
  });

  it("Verify that the number of search results displayed on one page.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyToatalSearchPages("1-16");
    });
  });

  it("Verify that there should be navigation button(Next) for navigation to pages.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyToatalSearchPages("1-16");
      SearchProduct.clickOnNextPage();
      SearchProduct.verifyToatalSearchPages("17-32");
    });
  });

  it("Verify that there should be navigation button(Previous) for navigation to pages.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.enterProduct(data.Product2);
      SearchProduct.clickOnSearch();
      SearchProduct.verifyToatalSearchPages("1-16");
      SearchProduct.clickOnNextPage();
      SearchProduct.verifyToatalSearchPages("17-32");
      SearchProduct.clickOnPrevPage();
      SearchProduct.verifyToatalSearchPages("1-16");
    });
  });

  it.only("Verify that user should be perform search in different categories for example, Amazon Devices, Appliances etc.", () => {
    cy.get("@Data").then((data) => {
      Cart.CartIconVisibility();
      SearchProduct.selectCategories("Amazon Devices");
      SearchProduct.enterProduct(data.Product1);
      SearchProduct.clickOnSearch();
      SearchProduct.selectCategories("Appliances");
      SearchProduct.enterProduct(data.Product5);
      SearchProduct.clickOnSearch();
    });
  });
});
