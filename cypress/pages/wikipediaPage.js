import locators from "./locators";

// Base URL for Wikipedia's main page.
const WIKI_URL = 'https://www.wikipedia.org/';

// Central languages and their respective details displayed on Wikipedia's main page.
const CENTRAL_LANGUAGES = [
  {name: 'English', link: '//en.wikipedia.org/', title: 'English — Wikipedia — The Free Encyclopedia', tagline: 'articles'},
  {name: '日本語', link: '//ja.wikipedia.org/', title: 'Nihongo — ウィキペディア — フリー百科事典', tagline: '記事'},
  {name: 'Español', link: '//es.wikipedia.org/', title: 'Español — Wikipedia — La enciclopedia libre', tagline: 'artículos'},
  {name: 'Русский', link: '//ru.wikipedia.org/', title: 'Russkiy — Википедия — Свободная энциклопедия', tagline: 'статей'},
  {name: 'Deutsch', link: '//de.wikipedia.org/', title: 'Deutsch — Wikipedia — Die freie Enzyklopädie', tagline: 'Artikel'},
  {name: 'Français', link: '//fr.wikipedia.org/', title: 'français — Wikipédia — L’encyclopédie libre', tagline: 'articles'},
  {name: 'Italiano', link: '//it.wikipedia.org/', title: 'Italiano — Wikipedia — L\'enciclopedia libera', tagline: 'voci'},
  {name: '中文', link: '//zh.wikipedia.org/', title: 'Zhōngwén — 维基百科 / 維基百科 — 自由的百科全书 / 自由的百科全書', tagline: '条目 / 條目'},
  {name: 'Português', link: '//pt.wikipedia.org/', title: 'Português — Wikipédia — A enciclopédia livre', tagline: 'artigos'},
  {name: 'فارسی', link: '//fa.wikipedia.org/', title: 'Fārsi — ویکی‌پدیا — دانشنامهٔ آزاد', tagline: 'مقاله'}
];

// Various projects hosted by the Wikimedia Foundation, displayed on Wikipedia's main page.
const EXPECTED_PROJECTS = [
  {name: 'Commons',      link: '//commons.wikimedia.org/', tagline: 'Freely usable photos & more'},
  {name: 'Wikivoyage',   link: '//www.wikivoyage.org/',    tagline: 'Free travel guide'},
  {name: 'Wiktionary',   link: '//www.wiktionary.org/',    tagline: 'Free dictionary'},
  {name: 'Wikibooks',    link: '//www.wikibooks.org/',     tagline: 'Free textbooks'},
  {name: 'Wikinews',     link: '//www.wikinews.org/',      tagline: 'Free news source'},
  {name: 'Wikidata',     link: '//www.wikidata.org/',      tagline: 'Free knowledge base'},
  {name: 'Wikiversity',  link: '//www.wikiversity.org/',   tagline: 'Free course materials'},
  {name: 'Wikiquote',    link: '//www.wikiquote.org/',     tagline: 'Free quote compendium'},
  {name: 'MediaWiki',    link: '//www.mediawiki.org/',     tagline: 'Free & open wiki application'},
  {name: 'Wikisource',   link: '//www.wikisource.org/',    tagline: 'Free library'},
  {name: 'Wikispecies',  link: '//species.wikimedia.org/', tagline: 'Free species directory'},
  {name: 'Meta-Wiki',    link: '//meta.wikimedia.org/',    tagline: 'Community coordination & documentation'}
];

export default {
  // Visits Wikipedia's homepage and verifies the URL.
  visitHomepage() {
    cy.visit('/');
    cy.url().should('eq', WIKI_URL);
  },

  // Validates the central text and logo displayed on Wikipedia's homepage.
  verifyCentralTextAndLogo() {
    cy.get(locators.wikipediaPage.central.text)
      .should('contain', 'Wikipedia')
      .and('contain', 'The Free Encyclopedia');
      
    cy.get(locators.wikipediaPage.central.logo)
      .should('have.attr', 'src', 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
  },

  // Validates the central languages section on Wikipedia's homepage.
  verifyCentralLanguages() {
    cy.get(locators.wikipediaPage.central.languages)
      .each((languageBox, index) => {
        const expectedLanguage = CENTRAL_LANGUAGES[index];
        
        cy.wrap(languageBox)
          .should('contain', expectedLanguage.name)
          .find('a')
          .should('have.attr', 'href', expectedLanguage.link)
          .and('have.attr', 'title', expectedLanguage.title)
          .and('contain', expectedLanguage.tagline);
      });
  },

  // Checks the language selection dropdown in the search field.
  verifySearchFieldLanguageSelection() {
    cy.get(locators.wikipediaPage.search.languageOption).should('have.length', 70);
    
    cy.get(locators.wikipediaPage.search.languageOption).then(options => {
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];

      cy.get(locators.wikipediaPage.search.languageDropdown).select(randomOption.value);
      cy.get(locators.wikipediaPage.search.languageLabel).should('contain', randomOption.getAttribute('lang'));
    });
  },

  // Verifies the toggle functionality of the language dropdown.
  verifyLanguageDropdownToggle() {
    cy.get(locators.wikipediaPage.language.button).should('be.visible')
      .and('contain', 'Read Wikipedia in your language');
    cy.get(locators.wikipediaPage.language.list)
      .should('not.be.visible');
    cy.get(locators.wikipediaPage.language.button).click();
    cy.get(locators.wikipediaPage.language.list)
      .should('be.visible');
    cy.get(locators.wikipediaPage.language.button).click();
    cy.get(locators.wikipediaPage.language.list)
      .should('not.be.visible');
  },

  // Validates the description in the footer about Wikipedia and the Wikimedia Foundation.
  verifyFooterDescription() {
    cy.get(locators.wikipediaPage.footer.description)
      .should('contain', 'Wikipedia is hosted by the Wikimedia Foundation, a non-profit organization that also hosts a range of other projects.');
    
    cy.get(locators.wikipediaPage.footer.donationLink).parent()
      .should('contain', 'You can support our work with a donation.')
      .and('have.attr', 'href').and('include', 'donate.wikimedia.org');
  },

  // Validates the apps section in the footer which includes links to mobile applications.
  verifyFooterApps() {
    cy.get(locators.wikipediaPage.footer.apps.link)
      .should('contain', 'Download Wikipedia for Android or iOS')
      .and('have.attr', 'href', 'https://en.wikipedia.org/wiki/List_of_Wikipedia_mobile_applications');
    cy.get(locators.wikipediaPage.footer.apps.description)
      .should('contain', 'Save your favorite articles to read offline, sync your reading lists across devices and customize your reading experience with the official Wikipedia app.');
    cy.get(locators.wikipediaPage.footer.apps.androidBadge)
      .should('have.attr', 'href').and('include', 'play.google.com');
    cy.get(locators.wikipediaPage.footer.apps.iosBadge)
      .should('have.attr', 'href').and('include', 'itunes.apple.com');
  },

  // Validates the links and names of various other projects hosted by the Wikimedia Foundation.
  verifyOtherProjects() {
    cy.get(locators.wikipediaPage.footer.projects.item)
      .its('length')
      .should('eq', 12);
    cy.get(locators.wikipediaPage.footer.projects.item)
      .each(($project, index) => {
        cy.wrap($project)
          .find(locators.wikipediaPage.footer.projects.name)
          .should('contain', EXPECTED_PROJECTS[index].name);
        cy.wrap($project)
          .find(locators.wikipediaPage.footer.projects.link)
          .should('have.attr', 'href', EXPECTED_PROJECTS[index].link);
        cy.wrap($project)
          .find(locators.wikipediaPage.footer.projects.tagline)
          .should('contain', EXPECTED_PROJECTS[index].tagline);
      });
  },

  // Checks the information about the Creative Commons Attribution-ShareAlike License.
  verifyShareAlikeLicense() {
    cy.get(locators.wikipediaPage.license.shareAlike)
      .should('contain', 'This page is available under the')
      .find('a')
      .should('contain', 'Creative Commons Attribution-ShareAlike License')
      .and('have.attr', 'href', 'https://creativecommons.org/licenses/by-sa/4.0/');
  },

  // Validates the link to the "Terms of Use" page.
  verifyTermsOfUse() {
    cy.get(locators.wikipediaPage.license.termsOfUse)
      .find('a')
      .should('contain', 'Terms of Use')
      .and('have.attr', 'href', 'https://meta.wikimedia.org/wiki/Terms_of_use');
  },

  // Validates the link to the "Privacy Policy" page.
  verifyPrivacyPolicy() {
    cy.get(locators.wikipediaPage.license.privacyPolicy)
      .find('a')
      .should('contain', 'Privacy Policy')
      .and('have.attr', 'href', 'https://meta.wikimedia.org/wiki/Privacy_policy');
  }
}