import wikipediaPage from '../pages/wikipediaPage';

// Wikipedia Home Page Validations
describe('Wikipedia Home Page Validations', () => {

  // This runs before every test to ensure we start on the Wikipedia homepage.
  beforeEach(() => {
    wikipediaPage.visitHomepage();
  });

  // Checks if the central logo and text on the Wikipedia homepage are displayed accurately.
  it('displays the central logo and text accurately', () => {
    wikipediaPage.verifyCentralTextAndLogo();
  });

  // Checks if the main languages are listed accurately on the Wikipedia homepage.
  it('lists main languages accurately', () => {
    wikipediaPage.verifyCentralLanguages();
  });

  // Validates the functionality to select different languages within the search field.
  it('provides language selection functionality in the search field', () => {
    wikipediaPage.verifySearchFieldLanguageSelection();
  });

  // Ensures the dropdown list of languages can be toggled (expanded/collapsed) via a button click.
  it('toggles visibility of language list upon button click', () => {
    wikipediaPage.verifyLanguageDropdownToggle();
  });

  // Checks the display of footer details, like description, apps, and other projects, for accuracy.
  it('displays footer details accurately', () => {
    wikipediaPage.verifyFooterDescription();
    wikipediaPage.verifyFooterApps();
    wikipediaPage.verifyOtherProjects();
  });

  // Validates that the license details (ShareAlike License, Terms of Use, Privacy Policy) are displayed correctly.
  it('displays license details accurately', () => {
    wikipediaPage.verifyShareAlikeLicense();
    wikipediaPage.verifyTermsOfUse();
    wikipediaPage.verifyPrivacyPolicy();
  });
});