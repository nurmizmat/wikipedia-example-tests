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

/**
 * Custom Cypress command to extract text from an image using the OCR.space API.
 * 
 * This command reads a captcha image stored under the "cypress/fixtures" directory,
 * encodes the image to Base64 format, and sends it to the OCR.space API for text extraction.
 *
 * @returns {Object} - The response object from the API which contains the extracted text.
 */
Cypress.Commands.add('extractTextAPI', () => {
  // Fetching the API key from Cypress's environment variables.
  const apiKey = Cypress.env('apiKey');
  // Path to the captcha image that needs text extraction.
  const imagePath = 'cypress/fixtures/captchaImage.png';
  
  // Reading the image file and encoding it to Base64 format.
  return cy.readFile(imagePath, 'base64').then((fileContent) => {
    const base64Image = `data:image/png;base64,${fileContent}`;
    
    // Sending a POST request to the OCR.space API with the encoded image to extract text.
    return cy.request({
      method: 'POST',
      url: 'https://api.ocr.space/parse/image',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      form: true,
      body: {
        apikey: apiKey,
        base64image: base64Image,
        language: 'eng',
        OCREngine: 2,
      },
    });
  });
});