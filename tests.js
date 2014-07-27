var Valid8 = require('./valid8');

exports.tests = {

  init: function (test) {

    test.expect(11);

    var valid8;
  
    test.doesNotThrow(function () {
      valid8 = new Valid8();
    });
  
    test.doesNotThrow(function () {
      valid8 = new Valid8(Valid8.testTypes.form);
      test.strictEqual(valid8.type, Valid8.testTypes.form);
    });
  
    test.doesNotThrow(function () {
      valid8 = new Valid8(Valid8.testTypes.form, {});
      test.strictEqual(valid8.type, Valid8.testTypes.form);
    });
  
    test.doesNotThrow(function () {
      valid8 = new Valid8('form', {});
      test.strictEqual(valid8.type, Valid8.testTypes.form);
    });
  
    test.doesNotThrow(function () {
      valid8 = new Valid8(null, {});
      test.strictEqual(valid8.type, Valid8.testTypes.strict);
    });
  
    test.throws(function () {
      valid8 = new Valid8('foo', {});
    }, /^Invalid test type/);

    test.throws(function () {
      valid8 = new Valid8('form', {name: 'foo'});
    }, /^Invalid field type/);
  
    test.done();

  },

  setters: function (test) {

    test.expect(6);

    var valid8 = new Valid8();

    test.throws(function () {
      valid8.type = null;
    }, /^Invalid test type/);

    test.throws(function () {
      valid8.type = 'foo';
    }, /^Invalid test type/);

    test.throws(function () {
      valid8.fields = null;
    }, /^Invalid fields/);

    test.throws(function () {
      valid8.fields = 'foo';
    }, /^Invalid fields/);

    test.throws(function () {
      valid8.fields = {name: 'foo'};
    }, /^Invalid field type/);

    test.throws(function () {
      valid8.fields = {name: null};
    }, /^Invalid field definition/);

    test.done();

  },

  strings: function (test) {

    test.expect(13);

    var valid8;

    test.doesNotThrow(function () {
      valid8 = new Valid8('form', {name: Valid8.fieldTypes.string});
    });

    test.doesNotThrow(function () {
      valid8 = new Valid8('form', {name: 'string'});
    });

    test.doesNotThrow(function () {
      valid8.areFieldsValid({name: 'Aiham'});
    });

    test.doesNotThrow(function () {
      valid8.areFieldsValid({name: 'Aiham'}, ['name']);
    });

    test.doesNotThrow(function () {
      valid8.isFieldValid('name', 'Aiham');
    });

    test.throws(function () {
      valid8.isFieldValid();
    }, /^Invalid field name/);

    test.throws(function () {
      valid8.isFieldValid('foo');
    }, /^Invalid field name/);

    test.doesNotThrow(function () {
      test.strictEqual(valid8.isFieldValid('name'), true);
      test.strictEqual(valid8.isFieldValid('name', null), true);
      test.strictEqual(valid8.isFieldValid('name', ''), true);
      test.strictEqual(valid8.isFieldValid('name', 'Aiham'), true);
      test.strictEqual(valid8.isFieldValid('name', 1), Valid8.errors.dataType);
    });

    test.done();

  }

};
