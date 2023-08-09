import accountPage from "../pages/accountPage";
import faker from "../pages/faker";

// Test suite for Account Creation functionality.
describe('Account Creation', () => {

  // Runs before each test case.
  // Navigates to the account page to prepare for tests.
  beforeEach(() => {
    accountPage.navigateToAccountPage();
  });

  // Test to validate the presence of correct fields in the account creation form.
  it('displays the correct create account form fields', () => {
    accountPage.checkCreateAccountForm();
  });

  // Test to validate inputs in the account creation form.
  it('validates fields in the create account form', () => {
    const username = faker.randomName();        // Generate a random username.
    const password = faker.randomPassword();    // Generate a random password.
    const email = faker.randomEmail();          // Generate a random email address.

    // Validate various fields in the account creation form.
    accountPage.validateUsernameAccountForm(username);
    accountPage.validatePasswordAccountForm(username, password);
    accountPage.validateConfirmPasswordAccountForm(username, password);
    accountPage.validateEmailAccountForm(email);
    accountPage.validateTextFromImageAccountForm(username, password);
  });

  // Test to validate the CAPTCHA functionality during account creation.
  it('allows creating an account with valid CAPTCHA', () => {
    // This test provides an example of how to extract text from a CAPTCHA image using an API 
    // to then try and create an account. Keep in mind that this method is not always reliable
    // as the API might sometimes return inaccurate text, causing the test to fail.
    const username = faker.randomName();        // Generate a random username.
    const password = faker.randomPassword();    // Generate a random password.

    accountPage.fillRequiredFieldsAccountForm(username, password); // Fill in the mandatory fields.
    accountPage.getCaptchaImage(); // Get the CAPTCHA image.
    
    // This commented out code demonstrates how to extract the text from the CAPTCHA image,
    // type it into the CAPTCHA field, and attempt to create an account. If using frequently,
    // be cautious as repetitive failed attempts could result in an IP ban.

    // accountPage.extractCaptchaText().then((textFromImage) => {
    //   accountPage.typeCaptcha(textFromImage);
    //   accountPage.clickCreateYourAccountButton();
    // });
  });
});