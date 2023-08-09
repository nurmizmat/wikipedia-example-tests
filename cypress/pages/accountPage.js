
import faker from './faker';
import locators from './locators';
import mainPage from './mainPage';

// Define constants for possible error messages displayed during the account creation process.
const ERROR_MESSAGES = {
  NUMERIC: (num) => `To prevent confusion, the username "${num}" cannot be used: Usernames must contain one or more characters..\nPlease choose another username.`,
  TECHNICAL_ADJUST: (name) => `Your username will be adjusted to "${name}" due to technical restrictions.`,
  SYMBOL: 'You have not specified a valid user name.',
  IN_USE: 'Username entered already in use.\nPlease choose a different name.',
  MIN_LENGTH: 'Passwords must be at least 8 characters.',
  COMMON_PASSWORD: 'The password entered is in a list of very commonly used passwords. Please choose a more unique password.',
  PROBLEMS_WITH_INPUT: 'There are problems with some of your input.',
  PASSORD_NOT_MATCH: 'The passwords you entered do not match.',
  INCORRECT_CAPTCHA: 'Incorrect or missing CAPTCHA.',
  LOOK_FOR_EMAIL: 'Please look for an email from us to verify your address.',
};

export default {
  // Navigate to the main account creation page.
  navigateToAccountPage() {
    mainPage.visitMainPage();
    mainPage.clickCreateAccountButton();
    this.checkUrlAccountPage();
  },

  // Verify that the current URL matches the expected URL for account creation.
  checkUrlAccountPage() {
    cy.url().should('contain', 'title=Special:CreateAccount');
  },

  // Verify if a specific input field is visible and has the correct placeholder text.
  checkFieldVisibilityAndPlaceholder(fieldLocator, placeholderText) {
    cy.get(fieldLocator)
      .should('be.visible')
      .and('have.attr', 'placeholder', placeholderText);
  },

  // Validate input fields with associated labels, extra text, and hyperlink.
  checkFieldWithLabel(fieldLocator, labelText, extraText = null, hrefLink = null) {
    cy.get(fieldLocator)
      .should('be.visible')
      .parents(locators.loginText)
      .find('label')
      .should('contain', labelText);
    
    if (extraText && hrefLink) {
      cy.get(locators.accountPage.loginText)
        .find('a')
        .should('contain', extraText)
        .and('have.attr', 'href', hrefLink);
    }
  },

  // Validate the visibility and content of tip texts adjacent to form fields.
  checkTipText(index, expectedText) {
    cy.get(locators.accountPage.tipText).eq(index)
      .should('contain', expectedText);
  },

  // Validate the visibility and content of the CAPTCHA section on the account creation page.
  checkCaptchaSection() {
    cy.get(locators.accountPage.captcha.container).should('be.visible').within(() => {
      cy.get('p')
        .should('contain', 'To protect the wiki against automated account creation, we kindly ask you to enter the words that appear below in the box')
        .find('a')
        .should('contain', 'more info')
        .and('have.attr', 'href', '/wiki/Special:Captcha/help');
      cy.get('label')
        .should('contain', 'CAPTCHA Security check');
      cy.get(locators.accountPage.captcha.image)
        .should('have.attr', 'src')
        .and('contain', '/w/index.php?title=Special:Captcha');
      cy.get(locators.accountPage.captcha.refreshButton)
        .should('contain', 'Refresh');
      cy.get(locators.accountPage.captcha.inputField)
        .should('have.attr', 'placeholder', 'Enter the text you see on the image');
      cy.get(locators.accountPage.captcha.assistance)
        .should('contain', 'Can\'t see the image?')
        .find('a')
        .should('contain', 'Request an account')
        .and('have.attr', 'href', '/wiki/Wikipedia:Request_an_account');
    });
  },

  // Confirm the visibility and label of the account creation submission button.
  checkSubmitButton() {
    cy.get(locators.accountPage.submitButton)
    .should('be.visible')
    .should('contain', 'Create your account');
  },

  // Consolidate all the checks for the entire account creation form.
  checkCreateAccountForm() {
    this.checkFieldWithLabel(locators.accountPage.usernameField, 'Username', '(help me choose)', '/wiki/Wikipedia:Username_policy');
    this.checkTipText(0, 'You should choose a username that is different from your real name, as usernames are public and cannot be made private later.');
    this.checkFieldWithLabel(locators.accountPage.passwordField, 'Password');
    this.checkTipText(1, 'It is recommended to use a unique password that you are not using on any other website.');
    this.checkFieldWithLabel(locators.accountPage.confirmPasswordField, 'Confirm password');
    this.checkFieldWithLabel(locators.accountPage.emailField, 'Email address (recommended)');
    this.checkTipText(2, 'Email is required to recover your account if you lose your password.');
    this.checkCaptchaSection();
    this.checkSubmitButton();
  },

  // Validate behavior of the username input against various scenarios.
  validateUsernameAccountForm(username) {
    // Generate a random numeric and symbol for testing
    const randomNumeric = faker.randomNumeric();
    const randomSymbol = faker.randomSymbol();
    const adjustedUsername = username.charAt(0).toLowerCase() + username.slice(1);
  
    // Check for error with numeric username
    this.typeUsername(randomNumeric);
    this.checkError(ERROR_MESSAGES.NUMERIC(randomNumeric));
  
    // Check for error with symbol username
    this.typeUsername(randomSymbol);
    this.checkError(ERROR_MESSAGES.SYMBOL);
  
    // Check for error with a common username "test"
    this.typeUsername('test');
    this.checkError(ERROR_MESSAGES.IN_USE);
  
    // Check for warning with adjusted username
    this.typeUsername(adjustedUsername);
    this.checkWarning(ERROR_MESSAGES.TECHNICAL_ADJUST(username));
  
    // Check no error or warning messages for the original username
    this.typeUsername(username);
    this.checkErrorsAndWarningsNotVisible();
  },

  // Validate password input behaviors.
  validatePasswordAccountForm(username, password) {
    // Enter username
    this.typeUsername(username);
  
    // Check for minimum password length error
    this.typePassword('test');
    this.checkError(ERROR_MESSAGES.MIN_LENGTH);
  
    // Check for common password errors
    this.typePassword('test1234');
    this.checkError(ERROR_MESSAGES.COMMON_PASSWORD);
  
    // Enter and check valid password
    this.typePassword(password);
    this.checkErrorsAndWarningsNotVisible();
  },

  // Validate confirm password input behaviors.
  validateConfirmPasswordAccountForm(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.typeConfirmPassword('test');
    this.checkErrorsAndWarningsNotVisible();
    this.typeCaptcha('test');
    this.checkErrorsAndWarningsNotVisible();
    // this.clickCreateYourAccountButton(); // disabled
    // this.checkError(ERROR_MESSAGES.PROBLEMS_WITH_INPUT);
    // this.checkError(ERROR_MESSAGES.PASSORD_NOT_MATCH);
  },

  // Validate the email input and the associated warnings.
  validateEmailAccountForm(email) {
    this.typeEmail(email);
    this.checkWarning(ERROR_MESSAGES.LOOK_FOR_EMAIL);
  },

  // Validate CAPTCHA behavior for the account creation form.
  validateTextFromImageAccountForm(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.typeConfirmPassword(password);
    this.typeCaptcha('test');
    // this.clickCreateYourAccountButton(); // disabled
    // this.checkError(ERROR_MESSAGES.INCORRECT_CAPTCHA);
  },

  // Fill in required fields in the form (for CAPTCHA validation).
  fillRequiredFieldsAccountForm(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.typeConfirmPassword(password);
  },

  // Helper method to type into a specified field.
  typeField(fieldLocator, value) {
    cy.get(fieldLocator)
      .clear()
      .type(value);
  },

  // Type a username into the appropriate field.
  typeUsername(username) {
    this.typeField(locators.accountPage.usernameField, username);
  },

  // Type a password into the appropriate field.
  typePassword(password) {
    this.typeField(locators.accountPage.passwordField, password);
  },

  // Confirm the password by typing it again.
  typeConfirmPassword(password) {
    this.typeField(locators.accountPage.confirmPasswordField, password);
  },
  
  // Input an email address into the email field.
  typeEmail(email) {
    this.typeField(locators.accountPage.emailField, email);
  },

  // Input CAPTCHA text into the CAPTCHA input field.
  typeCaptcha(text) {
    this.typeField(locators.accountPage.captcha.inputField, text);
  },

  // Click the "Create your account" button to submit the form.
  clickCreateYourAccountButton() {
    cy.get(locators.accountPage.submitButton)
      .should('be.visible')
      .click();
  },

  // Verify that no error or warning messages are displayed on the page.
  checkErrorsAndWarningsNotVisible() {
    cy.get(locators.accountPage.error)
      .should('not.exist');
    cy.get(locators.accountPage.warning)
      .should('not.exist');
  },

  // Verify a specific error message is displayed.
  checkError(message) {
    cy.get(locators.accountPage.error)
      .should('be.visible')
      .and('contain', message);
    cy.get(locators.accountPage.warning)
      .should('not.exist');
  },

  // Verify a specific warning message is displayed.
  checkWarning(message) {
    cy.get(locators.accountPage.warning)
      .should('be.visible')
      .and('contain', message);
    cy.get(locators.accountPage.error)
      .should('not.exist');
  },

  // Get the CAPTCHA image, which may be required for account creation.
  getCaptchaImage() {
    cy.get(locators.accountPage.captcha.image)
      .should('have.attr', 'src')
      .then((src) => {
        cy.request({url: src, encoding: 'base64'})
          .then((response) => {
            cy.writeFile('cypress/fixtures/captchaImage.png', response.body, 'base64');
          });
      });
  },

  // Extract the CAPTCHA text using an external API.
  extractCaptchaText() {
    return cy.extractTextAPI().then((response) => {
      const text = response.body.ParsedResults[0].TextOverlay.Lines[0].Words[0].WordText;
      return cy.wrap(text);
    });
  }
}