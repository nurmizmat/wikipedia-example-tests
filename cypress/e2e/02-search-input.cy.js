import locators from "../pages/locators";
import mainPage from "../pages/mainPage";

// Array containing search terms to be used in tests.
const words = [
  'wikipedia',
  'cypress',
  'test',
  'qa',
  'challenge',
];

// Function to get a random word from the words array.
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// Test suite for search input functionality.
describe('Search input', () => {
  
  // Runs before each test case.
  // It navigates to the wikipedia.org main page and assigns commonly used elements as aliases.
  beforeEach('Visit wikipedia.org main page', () => {
    mainPage.visitMainPage();
    cy.get(locators.mainPage.searchInput).as('searchInput'); // Alias for search input field.
    cy.get(locators.articlePage.articleTitle).as('articleTitle'); // Alias for article title.
  });

  // Test to validate the listbox search results.
  it('validates the listbox search results', () => {
    const word = getRandomWord(); // Get a random word to search.
    const limit = 10; // Define the expected limit for search results.

    // Intercept the search request to validate the response.
    cy.intercept('GET', `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${word}&limit=${limit}`).as('search');
    cy.get('@searchInput').type(word);
    cy.wait('@search').its('response.statusCode').should('equal', 200);

    // Check if the listbox with search results is visible and validate its contents.
    cy.get(locators.mainPage.resultsList).should('be.visible').then(($listbox) => {
      const resultCount = $listbox.find(locators.mainPage.resultItem).length;
      expect(resultCount).to.eq(limit); // Expect the results count to match the defined limit.
    }).find(locators.mainPage.resultItem).each(($el) => {
      cy.wrap($el)
        .invoke('text').then((text) => {
          expect(text.toLowerCase()).to.contain(word); // Validate if each result contains the search word.
        });
    });
  });

  // Function to check if the result of the search contains the word searched for.
  const checkSearchResultForWord = (word) => {
    cy.get('@articleTitle').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.contain(word);
    });
  };

  // Test to validate searching using the "Search" button.
  it('validates search using the "Search" button', () => {
    const word = getRandomWord();

    cy.get('@searchInput').type(word);
    cy.contains('button', 'Search').click();
    checkSearchResultForWord(word);
  });

  // Test to validate searching by pressing the "Enter" key.
  it('validates search using the "Enter" key', () => {
    const word = getRandomWord();

    cy.get('@searchInput').type(word);
    cy.get('@searchInput').type('{enter}'); // Simulate pressing the "Enter" key.
    checkSearchResultForWord(word);
  });
});