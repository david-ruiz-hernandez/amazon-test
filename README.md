#### DAVID RUIZ HERNANDEZ - AMAZON SHOP

In this project you fill find a script able to fullfill the following scenario: 

As a logged in member I want to search for top 5 brands of any category. I want to add an item from
my search to the shopping cart and proceed to the payment page.

- Additionally validate the navigation of pages during the checkout process.
- Reading of the test data from a flat file is preferred.
- The automation script should support cross browser execution

### Prerequisites

The machine where this projet will run needs to have installed NODEJS (>11.3.0) and Chrome minimum. Also Firefox will be needed in case we want to use it. 

To install the project just run

```npm install``` 

and to run it against Chrome:

```npm run test``` 

In case it is needed to run it against Firefox, use the ENV variable 'NIGHTWATCH_ENV'. 

```NIGHTWATCH_ENV=firefox npm run test```

### NOTES
This tests require some manual interaction to set up their preconditions. The test require that the Amazon Test User ('david.tester@zoho.com') has an empty Shopping Cart. This is needed because if the Shopping cart is not empty, the 'Checkout' flow is inconsistent. 

The tests may fail randomly due to Amazon asking if the user wants to try 'Amazon Prime'. It did not happen all the time and it was difficult to account for that condition. 

This two "issues" could have been easily addressed and avoided if I had access to the BackEnd. Like that I could set up the desired preconditions (and clean up after the tests have finished) on a consitent and reliable way.

At last, I would have developed this scenario in a more reliable way using "Cypress". Also the development time would have been reduced drastically. On the downside, the tests could only have run on Chrome. 