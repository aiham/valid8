var assert = require('assert');
var Valid8 = require('../valid8');

describe('Valid8', function () {
  describe('init', function () {
    it('should initialise the object with type and fields', function () {

      var valid8;

      assert.doesNotThrow(function () {
        valid8 = new Valid8();
      });
  
      assert.doesNotThrow(function () {
        valid8 = new Valid8(Valid8.testTypes.form);
        assert.strictEqual(valid8.type, Valid8.testTypes.form);
      });
  
      assert.doesNotThrow(function () {
        valid8 = new Valid8(Valid8.testTypes.form, {});
        assert.strictEqual(valid8.type, Valid8.testTypes.form);
      });
  
      assert.doesNotThrow(function () {
        valid8 = new Valid8('form', {});
        assert.strictEqual(valid8.type, Valid8.testTypes.form);
      });
  
      assert.doesNotThrow(function () {
        valid8 = new Valid8(null, {});
        assert.strictEqual(valid8.type, Valid8.testTypes.strict);
      });
  
      assert.throws(function () {
        valid8 = new Valid8('foo', {});
      }, /^Invalid test type/);

      assert.throws(function () {
        valid8 = new Valid8('form', {name: 'foo'});
      }, /^Invalid field type/);

    });
  });

  describe('setters', function () {
    it('should set the type and field options', function () {

    var valid8 = new Valid8();

      assert.throws(function () {
        valid8.type = null;
      }, /^Invalid test type/);

      assert.throws(function () {
        valid8.type = 'foo';
      }, /^Invalid test type/);

      assert.throws(function () {
        valid8.fields = null;
      }, /^Invalid fields/);

      assert.throws(function () {
        valid8.fields = 'foo';
      }, /^Invalid fields/);

      assert.throws(function () {
        valid8.fields = {name: 'foo'};
      }, /^Invalid field type/);

      assert.throws(function () {
        valid8.fields = {name: null};
      }, /^Invalid field definition/);

    });
  });

  describe('strings', function () {
    it('should validate string fields', function () {

      var valid8;

      assert.doesNotThrow(function () {
        valid8 = new Valid8('form', {name: Valid8.fieldTypes.string});
      });

      assert.doesNotThrow(function () {
        valid8 = new Valid8('form', {name: 'string'});
      });

      assert.doesNotThrow(function () {
        valid8.areFieldsValid({name: 'Aiham'});
      });

      assert.doesNotThrow(function () {
        valid8.areFieldsValid({name: 'Aiham'}, ['name']);
      });

      assert.doesNotThrow(function () {
        valid8.isFieldValid('name', 'Aiham');
      });

      assert.throws(function () {
        valid8.isFieldValid();
      }, /^Invalid field name/);

      assert.throws(function () {
        valid8.isFieldValid('foo');
      }, /^Invalid field name/);

      assert.doesNotThrow(function () {
        assert.strictEqual(valid8.isFieldValid('name'), true);
        assert.strictEqual(valid8.isFieldValid('name', null), true);
        assert.strictEqual(valid8.isFieldValid('name', ''), true);
        assert.strictEqual(valid8.isFieldValid('name', 'Aiham'), true);
        assert.strictEqual(valid8.isFieldValid('name', 1), Valid8.errors.dataType);
      });

    });
  });

  describe('integers', function () {
    it('should validate integer fields', function () {

      var valid8;

      assert.doesNotThrow(function () {
        valid8 = new Valid8('form', {age: Valid8.fieldTypes.int});
      });

      assert.doesNotThrow(function () {
        valid8 = new Valid8('form', {age: 'int'});
      });

      assert.doesNotThrow(function () {
        valid8.areFieldsValid({age: 123});
      });

      assert.doesNotThrow(function () {
        valid8.areFieldsValid({age: 123}, ['age']);
      });

      assert.doesNotThrow(function () {
        valid8.isFieldValid('age', 123);
      });

      assert.throws(function () {
        valid8.isFieldValid();
      }, /^Invalid field name: undefined/);

      assert.throws(function () {
        valid8.isFieldValid('foo');
      }, /^Invalid field name: foo/);

      assert.doesNotThrow(function () {
        // assert.strictEqual(valid8.isFieldValid('age', 1), true);
        // assert.strictEqual(valid8.isFieldValid('age', 123), true);
        // assert.strictEqual(valid8.isFieldValid('age', 'foo'), Valid8.errors.dataType);
      });

    });
  });
});
