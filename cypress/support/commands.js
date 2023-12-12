// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
    cy.session([username, password], function () {
      cy.visit("/");
      cy.get(login.txtUserName).clear().type(username);
      cy.get(login.txtPassword).clear().type(password);
      cy.get(login.btnlogin).click();
    });
  });
  Cypress.Commands.add("clickElement", (selector) => {
    cy.get(selector).click({force: true, multiple:true});
  });
  
  Cypress.Commands.add("enterText", (selector, text) => {
    cy.get(selector).clear().type(text,{force: true});
  });
  
  Cypress.Commands.add("assertElementVisibility", (selector) => {
    cy.get(selector).should("be.visible");
  });
  
  Cypress.Commands.add("selectDrop", (selector, drop) => {
    cy.get(selector).select(drop, { force: true });
  });
  
  Cypress.Commands.add("verifyElementText", (selector, text) => {
    cy.get(selector).should("contain", text);
  });
  
  Cypress.Commands.add('logout',()=>{
    cy.get(login.btnlogout).click();
  })
  