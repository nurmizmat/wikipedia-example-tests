export default {
  // Wikipedia Page Components
  wikipediaPage: {
    // Central Components
    central: {
      text: 'h1',
      logo: '.central-featured-logo',
      section: '.central-featured',
      languages: '.central-featured-lang'
    },

    // Search Components
    search: {
      languageDropdown: '#searchLanguage',
      languageOption: '#searchLanguage option',
      languageLabel: '#jsLangLabel',
    },

    // Language Components
    language: {
      button: '#js-lang-list-button',
      list: '#js-lang-lists'
    },

    // Footer Components
    footer: {
      description: '[data-jsl10n="portal.footer-description"]',
      donationLink: '[data-jsl10n="footer-donate"]',
      apps: {
        link: '[data-jsl10n="portal.app-links.url"]',
        description: '[data-jsl10n="portal.app-links.description"]',
        androidBadge: '.app-badge-android a',
        iosBadge: '.app-badge-ios a'
      },
      projects: {
        item: '.other-project',
        link: '.other-project-link',
        name: '.other-project-title',
        tagline: '.other-project-tagline'
      }
    },

    // Licensing
    license: {
      shareAlike: '[data-jsl10n="license"]',
      termsOfUse: '[data-jsl10n="terms"]',
      privacyPolicy: '[data-jsl10n="privacy-policy"]'
    },
  },

  // Main Page Components
  mainPage: {
    searchInput: 'input[placeholder="Search Wikipedia"]',
    resultsList: '[role="listbox"]',
    resultItem: '.cdx-search-result-title__match',
    createAccountButton: '#pt-createaccount-2',
  },

  // Article Page Components
  articlePage: {
    articleTitle: '.mw-page-title-main'
  },

  // Account Page Components
  accountPage: {
    usernameField: '#wpName2',
    passwordField: '#wpPassword2',
    confirmPasswordField: '#wpRetype',
    emailField: '#wpEmail',
    loginText: '.loginText',
    loginPasswordField: '.loginPassword',
    tipText: '.htmlform-tip',
    captcha: {
      container: '.captcha',
      image: '.fancycaptcha-image',
      refreshButton: '.fancycaptcha-reload',
      inputField: '#mw-input-captchaWord',
      assistance: '.mw-createacct-captcha-assisted'
    },
    submitButton: '#wpCreateaccount',
    error: '.mw-message-box-error',
    warning: '.mw-message-box-warning'
  }
}