# Marracash

Lightweight & easy to use react component as a price input.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
React project
```

### Installing

A step by step series of examples that tell you how to include and use the library in your javascript project

pull the repository to you local machine by running this command

```
npm i --S bitbucket:veylinx/vx-price-input-lib
```

And voila you have the module in your node_modules

you only need to import the module to your project now by doing

```
//ES6 syntax
import PriceInput from 'vx-price-input-lib';
or
//pure js syntax
var PriceInput = require('vx-price-input-lib')
```

To add default component styles
```
//ES6 syntax
import 'vx-price-input-lib/dist/styles.css';
```

## Usage

```
<PriceInput />
```

| Props        | definition           | required  | type | default value |
| :-----------: |:-------------:| :-----:| :-----: | :---------:
| currency    | Object containing precision, symbol, decimal and thousand | false | object |  { decimal: ",", thousand: ".", symbol: "€", precision: 2} |
| showSymbol | Show or hide the currency symbol |   false | boolean | TRUE |
| id    | To override default id | false | string | vx-price-input|
| styles    | Provide inline styles to input element | false | object | |
| placeholder    | Provide className to input element | false | string | |
| className    | Provide placeholder to input element | false | string | |
| AllowEmpty    | Ability to control what happens if price input gets cleared | false | boolean | TRUE |
| defaultValue | Default value provided to the input element in **cents** | false | number | | 


## Running the tests

Automated end to end tests are not yet available

## Unit tests

To run a unit test run this command

```
npm run test:unit
```

## Component tests

To run a unit test run this command

```
npm run test:cmp
```

## Deployment

For deploying a fix please check with authors.

## Built With

* [Accounting](https://www.npmjs.com/package/accounting) - used for formatting money and currency.
* [Mocha](https://mochajs.org/) - Used for Unit testing.
* [Jest](https://jest.io/) - Used for component testing.

## Contributing

Please check with the authors

## Versioning

We use npm for versioning

```
npm version patch/minor/major
```
## Authors

* **Farid Ouachrar** 

## License

This project is licensed under the Veylinx licence.
