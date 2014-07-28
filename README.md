# valid8

[![NPM version](https://badge.fury.io/js/valid8.svg)](http://badge.fury.io/js/valid8)

valid8 is a Javascript data validator for use with user input from web forms, APIs, etc.

## Requirements

- [Node.js][]
- [mocha][] (To run tests)

[Node.js]: http://nodejs.org/
[mocha]: http://visionmedia.github.io/mocha/

## Installation

```sh
npm install valid8
```

## Run Tests

```sh
mocha
```

## Usage

```js
var Valid8 = require('valid8');

var valid8 = new Valid8('form', {
  name: 'string',
  username: {
    type: 'string',
    max: 20,
    required: true
  },
  email: 'emailString',
  age: {
    type: 'int',
    min: 18,
    required: true
  },
  gpa: {
    type: 'decimal',
  },
  gender: {
    type: 'enum',
    options: ['male', 'female']
  },
  country: {
    type: 'string',
    required: true
  }
});

var result = valid8.areFieldsValid({
  name: 'Aiham',
  username: 'averylonglonglongusername',
  email: 'invalid email',
  age: 17,
  gpa: '1.23',
  gender: 'foobar'
});

/* result contains:

  {
    username: 'long',
    email: 'format',
    age: 'small',
    gender: 'option',
    country: 'missing'
  }

*/
```

## Constructor

- `new Valid8([testType], [fields])`
  - `testType` - either `strict` or `form` (see below)
  - `fields` - An object containing the field definitions

## Instance Methods

- `isFieldValid(name, value)`
  - `name` - Name of the field to be validated
  - `value` - Value to be validated
  - Returns `true` if the field is valid
  - Returns an error response if invalid (see below)

- `areFieldsValid(values, [fieldWhiteList])`
  - `values` - An object containing the values for each field to be validated
  - `fieldWhiteList` - An array of field names to be validated. For when you only want to validate a subset of the fields
  - Returns `true` if all values are valid
  - Returns an object containing the name of each invalid field and the corresponding error response (see below)

## Constants

### Test Types

- `Valid8.testTypes.strict` - Checks value and data type. (Default)
- `Valid8.testTypes.form` - Checks value even if data is provided in strings. Good for web forms

### Field Types

- `Valid8.fieldTypes.string`
- `Valid8.fieldTypes.emailString`
- `Valid8.fieldTypes.dateString`
- `Valid8.fieldTypes.int`
- `Valid8.fieldTypes.decimal`
- `Valid8.fieldTypes.enum`

### Error Responses

- `Valid8.errors.missing`
- `Valid8.errors.long`
- `Valid8.errors.short`
- `Valid8.errors.large`
- `Valid8.errors.small`
- `Valid8.errors.format`
- `Valid8.errors.dataType`
- `Valid8.errors.option`

