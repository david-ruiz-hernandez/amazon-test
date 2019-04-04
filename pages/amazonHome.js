// TODO: Need refactoring once the path has been added to the config
module.exports = {
  url: 'https://www.amazon.com.au/',
  elements: {
    loginLink: {
      selector: '#nav-tools [data-nav-role]',
      locateStrategy: 'css selector',
    },
    emailInput: {
      selector: '#ap_email',
      locateStrategy: 'css selector',
    },
    passwordInput: {
      selector: '#ap_password',
      locateStrategy: 'css selector',
    },
    loginButton: {
      selector: '#signInSubmit',
      locateStrategy: 'css selector',
    },
    categoriesCombobox: {
      selector: '#searchDropdownBox',
      locateStrategy: 'css selector',
    },
    searchButton: {
      selector: 'input[value="Go"]',
      locateStrategy: 'css selector',
    },
    cartButton: {
      selector: '#nav-cart',
      locateStrategy: 'css selector',
    },
    goToCheckoutButton: {
      selector: '[name="proceedToCheckout"]',
      locateStrategy: 'css selector',
    },
    deliverToThisAddressButton: {
      selector: '.ship-to-this-address a',
      locateStrategy: 'css selector',
    },
    continueAfterShippingButton: {
      selector: '.sosp-continue-button input',
      locateStrategy: 'css selector',
    },
    continueAfterPaymentButton: {
      selector: '[name="ppw-widgetEvent:SetPaymentPlanSelectContinueEvent"][type="submit"]',
      locateStrategy: 'css selector',
    },
    placeYourOrderButton: {
      selector: '[name="placeYourOrder1"]',
      locateStrategy: 'css selector',
    }
  },
  commands: [
    {
      async login(email, password) {
        // const email = 'david.tester@zoho.com';
        // const password = 'AQ!sw2de3';

        await this.waitForElementPresent('@loginLink', 15000)
          .click('@loginLink')
          .waitForElementVisible('@emailInput', 15000)
          .setValue('@emailInput', email)
          .waitForElementVisible('@passwordInput', 15000)
          .setValue('@passwordInput', password)
          .click('@loginButton')
          .waitForElementPresent('@categoriesCombobox', 15000)
        return this.api;
      },

      selectCategory(category) {
        const optionXpath = `//option[contains(text(), "${category}")]`;

        return this.waitForElementPresent('@categoriesCombobox', 15000)
          .click('@categoriesCombobox')
          .useXpath()
          .waitForElementVisible(optionXpath, 'xpath')
          .click(optionXpath)
          .useCss();
      },

      async selectTopBrands(count) {
        const firstUnselectedBrandXpath = '//h4[contains(text(), "Featured Brands")]/following-sibling::ul//input[@type="checkbox" and @value="false"]'
        await this.useXpath()
          .waitForElementPresent(firstUnselectedBrandXpath, 15000)
          .click(firstUnselectedBrandXpath)
          .pause(500)
          .waitForElementPresent('@searchButton', 15000)
          .useCss();

        for(let i = 2; i <= count; i++) {
          const restUnselecterBrandsXpath = `(//span[contains(text(), "Featured Brands")]/parent::div/following-sibling::ul//i)[${i}]`;
          await this.useXpath()
            .waitForElementPresent(restUnselecterBrandsXpath, 15000)
            .click(restUnselecterBrandsXpath)
            .pause(500)
            .waitForElementPresent(restUnselecterBrandsXpath, 15000)
            .useCss();
        }

        return this;
      },

      selectFirstResult() {
        const firstSearchResultSelector = 'h5 a';

        return this.waitForElementPresent(firstSearchResultSelector, 15000)
          .click(firstSearchResultSelector);
      },

      goToCart() {
        return this.waitForElementPresent('@cartButton', 15000)
          .click('@cartButton')
          .waitForElementPresent('@goToCheckoutButton', 15000);
      },

      validateCartContent() {
        const itemName = require('../itemTitle.json')
        const itemTitleElement = `//*[contains(text(), "${itemName}")]`;

        return this.useXpath()
          .waitForElementPresent(itemTitleElement, 15000)
          .useCss();
      },

      goToSelectDeliveryAddress() {
        return this.waitForElementPresent('@goToCheckoutButton', 15000)
          .click('@goToCheckoutButton')
          .waitForElementPresent('@deliverToThisAddressButton', 15000);
      },

      selectDeliveryAddress() {
        return this.waitForElementPresent('@deliverToThisAddressButton', 15000)
          .click('@deliverToThisAddressButton')
          .waitForElementPresent('@continueAfterShippingButton', 15000);
      },

      selectShipOption() {
        return this.waitForElementPresent('input[type="radio"]', 15000)
          .click('input[type="radio"]')
          .waitForElementPresent('@continueAfterShippingButton', 15000)
          .click('@continueAfterShippingButton');
      },

      selectPaymentOption() {
        return this.waitForElementPresent('@continueAfterPaymentButton', 15000)
          .click('@continueAfterPaymentButton');
      },

      logout() {
        return this.api
          .click('xpath', '//*[@id="menu-button-1-toggle"]//i')
          .click('xpath', '//*[@id="menu-button-1-list"]/li/div');
      },
    },
  ],
};
