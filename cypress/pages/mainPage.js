import locators from "./locators";

// Constant holding the expected URL of the Wikipedia Main Page
const WIKI_MAIN_PAGE_URL = 'https://en.wikipedia.org/wiki/Main_Page';

export default {
  // Visits the Wikipedia Main Page and validates the URL.
  visitMainPage() {
    cy.visit('https://en.wikipedia.org');
    cy.url().should('eq', WIKI_MAIN_PAGE_URL);
  },

  // Clicks on the 'Create Account' button on the Wikipedia Main Page.
  clickCreateAccountButton() {
    cy.get(locators.mainPage.createAccountButton)
      .should('contain', 'Create account')
      .click();
  },
}