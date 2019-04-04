Feature: Amazon Search

# The background step needs to be performed manually before any execution.
Background: Preconditions for the test
  Given the shopping cart of the test users is empty

Scenario: Go to Amazon
  Given I open Amazon`s search page
  And I am logged in with the credentials
    | david.tester@zoho.com | AQ!sw2de3 |
  When I select the "Home" category
  And I select the "5" top brands
  And I add the first item to his cart
  Then I can proceed to the cart
  And I can place the order