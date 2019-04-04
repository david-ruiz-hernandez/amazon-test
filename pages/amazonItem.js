// TODO: Need refactoring once the path has been added to the config
const fs = require('fs');

module.exports = {
  elements: {
    addToCartButton: {
      selector: '[value="Add to Cart"]',
      locateStrategy: 'css selector',
    },
  },
  commands: [
    {
      async addItemToCart() {
        const itemNameSelector = '#productTitle';

        await this.api.getText('css selector', itemNameSelector, function(name) {
          fs.writeFile('itemTitle.json', JSON.stringify(name.value), () => {});
        });

        return this.waitForElementPresent('@addToCartButton', 15000)
          .click('@addToCartButton');
      },
    },
  ],
};
