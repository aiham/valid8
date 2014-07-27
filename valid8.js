var Valid8 = function (type, fields) {

  var _type, _fields;

  Object.defineProperty(this, 'type', {
    get: function () {

      return _type;

    },
    set: function (type) {

      if (!type || typeof this.testTypes[type] !== 'string') {
        throw 'Invalid test type: ' + type;
      }
      _type = type;

    }
  });

  Object.defineProperty(this, 'fields', {
    get: function () {

      return _fields;

    },
    set: function (fields) {

      if (!fields || typeof fields !== 'object') {
        throw 'Invalid fields: ' + fields;
      }

      var valid = true, type, name, field;

      for (name in fields) {
        if (fields.hasOwnProperty(name)) {
          field = fields[name];

          if (!field) {
            throw 'Invalid field definition';
          }

          type = typeof field === 'string' ? field : field.type;

          if (!type || typeof this.fieldTypes[type] !== 'string') {
            throw 'Invalid field type: ' + field.type;
          }
        }
      }
      _fields = fields;

    }
  });

  this.type = type || this.testTypes.strict;
  this.fields = fields || {};

};

Valid8.testTypes = {
  strict: 'strict',
  form: 'form'
};

Valid8.fieldTypes = {
  string: 'string',
  emailString: 'emailString',
  dateString: 'dateString',
  int: 'int',
  decimal: 'decimal',
  enum: 'enum'
};

Valid8.errors = {
  missing: 'missing',
  long: 'long',
  short: 'short',
  large: 'large',
  small: 'small',
  format: 'format',
  dataType: 'dataType',
  option: 'option'
};

Valid8.prototype = {

  constructor: Valid8,

  testTypes: Valid8.testTypes,
  fieldTypes: Valid8.fieldTypes,
  errors: Valid8.errors,

  isFieldValid: function (name, value) {

    var isForm = this.type === this.testTypes.form;

    if (!name || !this.fields.hasOwnProperty(name)) throw 'Invalid field name: ' + name;

    var field = this.fields[name];
    if (typeof field === 'string') {
      field = {type: field};
    }

    if (typeof field !== 'object') throw 'Invalid field settings: ' + field;

    if (value === undefined || value === null || (value === '' && isForm)) {
      return field.required ? this.errors.missing : true;
    }

    if (isForm && typeof value !== 'string') {
      return this.errors.dataType;
    }

    switch (field.type) {
      case this.fieldTypes.string:
      case this.fieldTypes.emailString:
        if (!isForm && typeof value !== 'string') {
          return this.errors.dataType;
        }

        if (field.max !== undefined && value.length > field.max) {
          return this.errors.long;
        }

        if (field.min !== undefined && value.length < field.min) {
          return this.errors.short;
        }
        break;

        if (!isForm && typeof value !== 'string') {
          return this.errors.dataType;
        }

        if (field.type === this.fieldTypes.emailString) {
          var emailPattern = /^[a-z0-9\._]+@[a-z0-9\-]+(\.[a-z0-9\-]+)*\.[a-z]+$/i;
          if (!emailPattern.test(value)) {
            return this.errors.format;
          }
        } else if (field.type === this.fieldTypes.dateString) {
          var format = field.format;
          if (typeof format !== 'string') throw 'Invalid date format: ' + format;

          var isValid = true; // TODO - check date format
          if (!isValid) {
            return this.errors.format;
          }
        }
        break;

      case this.fieldTypes.int:
      case this.fieldTypes.decimal:
        if (!isForm && (typeof value !== 'number' || value !== value)) {
          return this.errors.dataType;
        }

        var valueString = String(value);
        var pattern = field.type === this.fieldTypes.int ? /^[0-9]+$/ : /^[0-9]+(\.[0-9]+)?$/;
        if (!pattern.test(valueString)) {
          return this.errors.format;
        }

        var valueNumber;
        if (field.type === this.fieldTypes.int) {
          valueNumber = parseInt(value, 10);
        } else {
          valueNumber = parseFloat(value);
        }

        if (isNaN(valueNumber) && valueNumber !== valueNumber) {
          return this.errors.format;
        }

        if (field.max !== undefined && valueNumber > field.max) {
          return this.errors.large;
        }

        if (field.min !== undefined && valueNumber < field.min) {
          return this.errors.small;
        }
        break;

      case this.fieldTypes.enum:
        if (!field.options) throw 'Invalid field options: ' + field.options;

        if (field.options.indexOf(value) < 0) {
          return this.errors.option;
        }
        break;

      default:
        throw 'Invalid field type: ' + field.type;
    }

    return true;

  },

  areFieldsValid: function (values, fieldWhiteList) {

    var fields = this.fields, result = true, name, fieldResult;

    if (fieldWhiteList) {
      fields = {};
      for (var i = 0, l = fieldWhiteList.length; i < l; i++) {
        name = fieldWhiteList[i];
        fields[name] = this.fields[name];
      }
    }

    for (name in fields) {
      if (fields.hasOwnProperty(name)) {
        fieldResult = this.isFieldValid(name, values[name]);
        if (fieldResult !== true) {
          if (result === true) {
            result = {};
          }
          result[name] = fieldResult;
        }
      }
    }

    return result;

  }

};

module.exports = Valid8;
