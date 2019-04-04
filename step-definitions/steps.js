import { client } from 'nightwatch-api';
import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

Given(/^the shopping cart of the test users is empty$/, () => {
  // TODO: I do not have access/control over the backend 
  // in order to be able to set up the preconditions in a safe and reliable way.

  return true;
})

Given(/^I open Amazon`s search page$/, async () => {
  return client.page.amazonHome().navigate()
    .waitForElementPresent('body', 15000)
    .waitForElementPresent('@searchButton', 15000);
});

Given(/^I am logged in with the credentials$/, async (dataTable) => {
  const email = dataTable.raw()[0][0];
  const password = dataTable.raw()[0][1];

  return client.page.amazonHome().login(email, password);
})

When(/^I select the "(.*?)" category$/, async (category) => {
  await client.page.amazonHome()
    .selectCategory(category)
    .click('@searchButton');

  return client.url(function(result) {
    expect(result.value).contains(category.toLowerCase());
  });
})

When(/^I select the "(.*?)" top brands$/, async (brandCount) => {
  return client.page.amazonHome()
    .selectTopBrands(parseInt(brandCount));
})

When(/^I add the first item to his cart$/, async () => {
  await client.page.amazonHome()
    .selectFirstResult();

  return client.page.amazonItem()
    .addItemToCart();
})

Then(/^I can proceed to the cart$/, async () => {
  await client.page.amazonHome()
    .goToCart();

  await client.url(function(result) {
    expect(result.value).contains('ref_=nav_cart');
  });

  return client.page.amazonHome()
    .validateCartContent();
})

Then(/^I can place the order$/, async () => {
  await client.page.amazonHome()
    .goToSelectDeliveryAddress();
  
  await client.url(function(result) {
    expect(result.value).contains('addressselect');
  });

  await client.page.amazonHome()
    .selectDeliveryAddress();

  await client.pause(5000);
  
  await client.url(function(result) {
    expect(result.value).contains('shipoptionselect');
  });

  await client.page.amazonHome()
    .selectShipOption();

  await client.pause(5000);
  
  await client.url(function(result) {
    expect(result.value).contains('payselect');
  });

  await client.page.amazonHome()
    .selectPaymentOption();
  
  await client.pause(5000);
  
  await client.url(function(result) {
    expect(result.value).contains('spc');
  });
    
})
