/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import AssertionError from "assertion-error";
import lodash from "lodash";

/**
 * Create to your own test expressions.
 *
 * ```js
 * assert('two' !== 2, "string 'two' is not equivalent to integer 2");
 * ```
 *
 * @param expression
 *        The assertion fails if the expression is falsy.
 * @param message
 *        The message displayed when the assertion fails.
 */

const assert = (expression, message: string) => {
    if (!expression) {
        throw new AssertionError(message);
    }
};

/**
 * Force a failure.
 *
 * ```js
 * fail("samuel", "rowe", "values are not equal");
 * ```
 */

const fail = (actual: any, expected: any, message: string) => {
    throw new AssertionError(message, {
        actual,
        expected,
    });
};

/**
 * Asserts that the specified value is truthy.
 *
 * ```js
 * isTruthy({}, "empty objects are truthy");
 * isTruthy("", "empty strings are falsy"); // This will fail.
 * ```
 */
const isTruthy = (value: any, message: string) => {
    if (!value) {
        throw new AssertionError(message, {
            actual: value,
            expected: true,
        });
    }
};

/**
 * Asserts that the specified value is falsy.
 *
 * ```js
 * isFalsy({}, "empty objects are truthy"); // This will fail.
 * isFalsy("", "empty strings are falsy");
 * ```
 */
const isFalsy = (value: any, message: string) => {
    if (value) {
        throw new AssertionError(message, {
            actual: value,
            expected: false,
        });
    }
};

/**
 * ### .equal(actual, expected, [message])
 *
 * Asserts non-strict equality (`==`) of `actual` and `expected`.
 *
 *     assert.equal(3, '3', '== coerces values to strings');
 */

const equal = function (actual: any, expected: any, message: string) {
    if (actual != expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .notEqual(actual, expected, [message])
 *
 * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
 *
 *     assert.notEqual(3, 4, 'these numbers are not equal');
 */

const notEqual = function (actual: any, expected: any, message: string) {
    if (actual == expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .strictEqual(actual, expected, [message])
 *
 * Asserts strict equality (`===`) of `actual` and `expected`.
 *
 *     assert.strictEqual(true, true, 'these booleans are strictly equal');
 */

const strictEqual = (actual: any, expected: any, message: string) => {
    if (actual !== expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .notStrictEqual(actual, expected, [message])
 *
 * Asserts strict inequality (`!==`) of `actual` and `expected`.
 *
 *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
 */

const notStrictEqual = (actual: any, expected: any, message: string) => {
    if (actual === expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .deepEqual(actual, expected, [message])
 *
 * Asserts that `actual` is deeply equal to `expected`.
 *
 *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
 */

const deepEqual = (actual: any, expected: any, message: string) => {
    if (!lodash.isEqual(actual, expected)) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .notDeepEqual(actual, expected, [message])
 *
 * Assert that `actual` is not deeply equal to `expected`.
 *
 *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
 */

const notDeepEqual = (actual: any, expected: any, message: string) => {
    if (lodash.isEqual(actual, expected)) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * ### .isAbove(valueToCheck, valueToBeAbove, [message])
 *
 * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
 *
 *     assert.isAbove(5, 2, '5 is strictly greater than 2');
 */

const isAbove = function (
    valueToCheck: any,
    valueToBeAbove: any,
    message: string
) {
    if (!lodash.gt(valueToCheck, valueToBeAbove)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
 *
 * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
 *
 *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
 *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
 */

const isAtLeast = function (
    valueToCheck: any,
    valueToBeAtLeast: any,
    message: string
) {
    if (!lodash.gte(valueToCheck, valueToBeAtLeast)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isBelow(valueToCheck, valueToBeBelow, [message])
 *
 * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
 *
 *     assert.isBelow(3, 6, '3 is strictly less than 6');
 */

const isBelow = function (
    valueToCheck: any,
    valueToBeBelow: any,
    message: string
) {
    if (!lodash.lt(valueToCheck, valueToBeBelow)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
 *
 * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
 *
 *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
 *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
 */

const isAtMost = function (
    valueToCheck: any,
    valueToBeAtMost: any,
    message: string
) {
    if (!lodash.lte(valueToCheck, valueToBeAtMost)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isTrue(value, [message])
 *
 * Asserts that `value` is true.
 *
 *     var teaServed = true;
 *     assert.isTrue(teaServed, 'the tea has been served');
 */

const isTrue = function (value: any, message: string) {
    if (!value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotTrue(value, [message])
 *
 * Asserts that `value` is not true.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotTrue(tea, 'great, time for tea!');
 */

const isNotTrue = function (value: any, message: string) {
    if (value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isFalse(value, [message])
 *
 * Asserts that `value` is false.
 *
 *     var teaServed = false;
 *     assert.isFalse(teaServed, 'no tea yet? hmm...');
 */

const isFalse = function (value: any, message: string) {
    if (value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotFalse(value, [message])
 *
 * Asserts that `value` is not false.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotFalse(tea, 'great, time for tea!');
 */

const isNotFalse = function (value: any, message: string) {
    if (!value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNull(value, [message])
 *
 * Asserts that `value` is null.
 *
 *     assert.isNull(err, 'there was no error');
 */

const isNull = function (value: any, message: string) {
    if (value !== null) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotNull(value, [message])
 *
 * Asserts that `value` is not null.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotNull(tea, 'great, time for tea!');
 */

const isNotNull = function (value: any, message: string) {
    if (value === null) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNaN
 *
 * Asserts that value is NaN.
 *
 *     assert.isNaN(NaN, 'NaN is NaN');
 */

const isNaN = function (value: any, message: string) {
    if (value !== NaN) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotNaN
 *
 * Asserts that value is not NaN.
 *
 *     assert.isNotNaN(4, '4 is not NaN');
 */
const isNotNaN = function (value: any, message: string) {
    if (value === NaN) {
        throw new AssertionError(message);
    }
};

/**
 * ### .exists
 *
 * Asserts that the target is neither `null` nor `undefined`.
 *
 *     var foo = 'hi';
 *
 *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
 */

const exists = function (value: any, message: string) {
    if (!lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notExists
 *
 * Asserts that the target is either `null` or `undefined`.
 *
 *     var bar = null
 *       , baz;
 *
 *     assert.notExists(bar);
 *     assert.notExists(baz, 'baz is either null or undefined');
 */

const notExists = function (value: any, message: string) {
    if (lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isUndefined(value, [message])
 *
 * Asserts that `value` is `undefined`.
 *
 *     var tea;
 *     assert.isUndefined(tea, 'no tea defined');
 */

const isUndefined = function (value: any, message: string) {
    if (!lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isDefined(value, [message])
 *
 * Asserts that `value` is not `undefined`.
 *
 *     var tea = 'cup of chai';
 *     assert.isDefined(tea, 'tea has been defined');
 */

const isDefined = function (value: any, message: string) {
    if (lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isFunction(value, [message])
 *
 * Asserts that `value` is a function.
 *
 *     function serveTea() { return 'cup of tea'; };
 *     assert.isFunction(serveTea, 'great, we can have tea now');
 */

const isFunction = function (value: any, message: string) {
    if (!lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotFunction(value, [message])
 *
 * Asserts that `value` is _not_ a function.
 *
 *     var serveTea = [ 'heat', 'pour', 'sip' ];
 *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
 */

const isNotFunction = function (value: any, message: string) {
    if (lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isObject(value, [message])
 *
 * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
 * _The assertion does not match subclassed objects._
 *
 *     var selection = { name: 'Chai', serve: 'with spices' };
 *     assert.isObject(selection, 'tea selection is an object');
 */

const isObject = function (value: any, message: string) {
    if (!lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotObject(value, [message])
 *
 * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
 *
 *     var selection = 'chai'
 *     assert.isNotObject(selection, 'tea selection is not an object');
 *     assert.isNotObject(null, 'null is not an object');
 */

const isNotObject = function (value: any, message: string) {
    if (lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isArray(value, [message])
 *
 * Asserts that `value` is an array.
 *
 *     var menu = [ 'green', 'chai', 'oolong' ];
 *     assert.isArray(menu, 'what kind of tea do we want?');
 */

const isArray = function (value: any, message: string) {
    if (!lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotArray(value, [message])
 *
 * Asserts that `value` is _not_ an array.
 *
 *     var menu = 'green|chai|oolong';
 *     assert.isNotArray(menu, 'what kind of tea do we want?');
 */

const isNotArray = function (value: any, message: string) {
    if (lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isString(value, [message])
 *
 * Asserts that `value` is a string.
 *
 *     var teaOrder = 'chai';
 *     assert.isString(teaOrder, 'order placed');
 */

const isString = function (value: any, message: string) {
    if (!lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotString(value, [message])
 *
 * Asserts that `value` is _not_ a string.
 *
 *     var teaOrder = 4;
 *     assert.isNotString(teaOrder, 'order placed');
 */

const isNotString = function (value: any, message: string) {
    if (lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNumber(value, [message])
 *
 * Asserts that `value` is a number.
 *
 *     var cups = 2;
 *     assert.isNumber(cups, 'how many cups');
 */

const isNumber = function (value: any, message: string) {
    if (!lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotNumber(value, [message])
 *
 * Asserts that `value` is _not_ a number.
 *
 *     var cups = '2 cups please';
 *     assert.isNotNumber(cups, 'how many cups');
 */

const isNotNumber = function (value: any, message: string) {
    if (lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isFinite(value, [message])
 *
 * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
 *
 *     var cups = 2;
 *     assert.isFinite(cups, 'how many cups');
 *
 *     assert.isFinite(NaN); // throws
 */

const isFinite = function (value: any, message: string) {
    if (!lodash.isFinite(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isBoolean(value, [message])
 *
 * Asserts that `value` is a boolean.
 *
 *     var teaReady = true
 *       , teaServed = false;
 *
 *     assert.isBoolean(teaReady, 'is the tea ready');
 *     assert.isBoolean(teaServed, 'has tea been served');
 */

const isBoolean = function (value: any, message: string) {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .isNotBoolean(value, [message])
 *
 * Asserts that `value` is _not_ a boolean.
 *
 *     var teaReady = 'yep'
 *       , teaServed = 'nope';
 *
 *     assert.isNotBoolean(teaReady, 'is the tea ready');
 *     assert.isNotBoolean(teaServed, 'has tea been served');
 */

const isNotBoolean = function (value: any, message: string) {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .typeOf(value, name, [message])
 *
 * Asserts that `value`'s type is `name`, as determined by
 * `Object.prototype.toString`.
 *
 *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
 *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
 *     assert.typeOf('tea', 'string', 'we have a string');
 *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
 *     assert.typeOf(null, 'null', 'we have a null');
 *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
 */

const typeOf = function (value: any, type: string, message: string) {
    if (typeof value !== type) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notTypeOf(value, name, [message])
 *
 * Asserts that `value`'s type is _not_ `name`, as determined by
 * `Object.prototype.toString`.
 *
 *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
 */

const notTypeOf = function (value: any, type, message: string) {
    if (typeof value === type) {
        throw new AssertionError(message);
    }
};

/**
 * ### .instanceOf(object, constructor, [message])
 *
 * Asserts that `value` is an instance of `constructor`.
 *
 *     var Tea = function (name) { this.name = name; }
 *       , chai = new Tea('chai');
 *
 *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
 */

const instanceOf = function (value: any, constructor, message: string) {
    if (!lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notInstanceOf(object, constructor, [message])
 *
 * Asserts `value` is not an instance of `constructor`.
 *
 *     var Tea = function (name) { this.name = name; }
 *       , chai = new String('chai');
 *
 *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
 */

const notInstanceOf = function (value: any, constructor, message: string) {
    if (lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .include(haystack, needle, [message])
 *
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array, a substring in a string, or a subset of
 * properties in an object.
 *
 *     assert.include([1,2,3], 2, 'array contains value');
 *     assert.include('foobar', 'foo', 'string contains substring');
 *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
 *
 * Strict equality (===) is used. When asserting the inclusion of a value in
 * an array, the array is searched for an element that's strictly equal to the
 * given value. When asserting a subset of properties in an object, the object
 * is searched for the given property keys, checking that each one is present
 * and strictly equal to the given property value. For instance:
 *
 *     var obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.include([obj1, obj2], obj1);
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
 */

const include = function (
    expression: any,
    includedValue: any,
    message: string
) {
    if (!lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` does not include `needle`. Can be used to assert
 * the absence of a value in an array, a substring in a string, or a subset of
 * properties in an object.
 *
 *     assert.notInclude([1,2,3], 4, "array doesn't contain value");
 *     assert.notInclude('foobar', 'baz', "string doesn't contain substring");
 *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
 *
 * Strict equality (===) is used. When asserting the absence of a value in an
 * array, the array is searched to confirm the absence of an element that's
 * strictly equal to the given value. When asserting a subset of properties in
 * an object, the object is searched to confirm that at least one of the given
 * property keys is either not present or not strictly equal to the given
 * property value. For instance:
 *
 *     var obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.notInclude([obj1, obj2], {a: 1});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
 */

const notInclude = function (
    expression: any,
    includedValue: any,
    message: string
) {
    if (lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .deepInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     var obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.deepInclude([obj1, obj2], {a: 1});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
 */

const deepInclude = function (
    expression: any,
    includedValue: any,
    message: string
) {
    if (!lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notDeepInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` does not include `needle`. Can be used to assert
 * the absence of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     var obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.notDeepInclude([obj1, obj2], {a: 9});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
 */

const notDeepInclude = function (
    expression: any,
    includedValue: any,
    message: string
) {
    if (lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .match(value, regexp, [message])
 *
 * Asserts that `value` matches the regular expression `regexp`.
 *
 *     assert.match('foobar', /^foo/, 'regexp matches');
 */

const match = function (
    expression: string,
    regularExpression: any,
    message: string
) {
    if (!expression.match(regularExpression)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notMatch(value, regexp, [message])
 *
 * Asserts that `value` does not match the regular expression `regexp`.
 *
 *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
 */

const notMatch = function (
    expression: string,
    regularExpression: any,
    message: string
) {
    if (expression.match(regularExpression)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .property(object, property, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property`.
 *
 *     assert.property({ tea: { green: 'matcha' }}, 'tea');
 *     assert.property({ tea: { green: 'matcha' }}, 'toString');
 */

const property = function (value: Object, property: string, message: string) {
    if (!value[property]) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property`.
 *
 *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
 */
const notProperty = function (
    value: Object,
    property: string,
    message: string
) {
    if (value[property]) {
        throw new AssertionError(message);
    }
};

/**
 * ### .propertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
 */

const propertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (!obj[property] || obj[property] !== value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
 *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
 */

const notPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (obj[property] && obj[property] === value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .deepPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a deep equality check.
 *
 *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 */

const deepPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (!obj[property] || !lodash.isEqual(obj[property], value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notDeepPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a deep equality check.
 *
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 */

const notDeepPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (obj[property] && lodash.isEqual(obj[property], value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .ownProperty(object, property, [message])
 *
 * Asserts that `object` has a direct property named by `property`. Inherited
 * properties aren't checked.
 *
 *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
 */

const ownProperty = function (obj: Object, property: string, message: string) {
    if (!obj.hasOwnProperty(property)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notOwnProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by
 * `property`. Inherited properties aren't checked.
 *
 *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
 *     assert.notOwnProperty({}, 'toString');
 */
const notOwnProperty = function (
    obj: Object,
    property: string,
    message: string
) {
    if (!obj.hasOwnProperty(property)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .ownPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a strict equality check (===).
 * Inherited properties aren't checked.
 *
 *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
 *
 * @name ownPropertyVal
 * @param {Object} object
 * @param {String} property
 * @param {Mixed} value
 * @param {String} message
 * @api public
 */

const ownPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (!obj.hasOwnProperty(property) || obj[property] !== value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a strict equality check
 * (===). Inherited properties aren't checked.
 *
 *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
 *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
 */

const notOwnPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (obj.hasOwnProperty(property) && obj[property] === value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .deepOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a deep equality check. Inherited
 * properties aren't checked.
 *
 *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 */

const deepOwnPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (
        !obj.hasOwnProperty(property) ||
        !lodash.isEqual(obj[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notDeepOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a deep equality check.
 * Inherited properties aren't checked.
 *
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
 */

const notDeepOwnPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (obj.hasOwnProperty(property) && lodash.isEqual(obj[property], value)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .nestedProperty(object, property, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property`, which can be a string using dot- and bracket-notation for
 * nested reference.
 *
 *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
 */

const nestedProperty = function (
    obj: Object,
    property: string,
    message: string
) {
    if (!lodash.get(obj, property)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notNestedProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property`, which
 * can be a string using dot- and bracket-notation for nested reference. The
 * property cannot exist on the object nor anywhere in its prototype chain.
 *
 *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
 */

const notNestedProperty = function (
    obj: Object,
    property: string,
    message: string
) {
    if (lodash.get(obj, property)) {
        throw new AssertionError(message);
    }
};

/**
 * ### .nestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a property named by `property` with value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a strict equality check (===).
 *
 *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
 */

const nestedPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (!lodash.get(obj, property) || lodash.get(obj, property) !== value) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a strict equality check (===).
 *
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
 */

const notNestedPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (lodash.get(obj, property) && lodash.get(obj, property) === value) {
        throw new AssertionError(message);
    }
};
/**
 * ### .deepNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a property named by `property` with a value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a deep equality check.
 *
 *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
 */

const deepNestedPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (
        !lodash.get(obj, property) ||
        !lodash.isEqual(lodash.get(obj, property), value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * ### .notDeepNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a deep equality check.
 *
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
 */

const notDeepNestedPropertyVal = function (
    obj: Object,
    property: string,
    value: any,
    message: string
) {
    if (
        lodash.get(obj, property) &&
        lodash.isEqual(lodash.get(obj, property), value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * ### .lengthOf(object, length, [message])
 *
 * Asserts that `object` has a `length` or `size` with the expected value.
 *
 *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
 *     assert.lengthOf('foobar', 6, 'string has length of 6');
 *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
 *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
 */

const lengthOf = function (expression: any, length: number, message: string) {
    if (lodash.size(expression) !== length) {
        throw new AssertionError(message);
    }
};

/**
 * ### .hasAnyKeys(object, [keys], [message])
 *
 * Asserts that `object` has at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
 *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 */

const hasAnyKeys = function (obj, keys, message: string) {
    new Assertion(obj, message, assert.hasAnyKeys, true).to.have.any.keys(keys);
};

/**
 * ### .hasAllKeys(object, [keys], [message])
 *
 * Asserts that `object` has all and only all of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
 *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
 */

const hasAllKeys = function (obj, keys, message: string) {
    new Assertion(obj, message, assert.hasAllKeys, true).to.have.all.keys(keys);
};

/**
 * ### .containsAllKeys(object, [keys], [message])
 *
 * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
 *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
 *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
 *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
 */

const containsAllKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.containsAllKeys,
        true
    ).to.contain.all.keys(keys);
};

/**
 * ### .doesNotHaveAnyKeys(object, [keys], [message])
 *
 * Asserts that `object` has none of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 */

const doesNotHaveAnyKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.doesNotHaveAnyKeys,
        true
    ).to.not.have.any.keys(keys);
};

/**
 * ### .doesNotHaveAllKeys(object, [keys], [message])
 *
 * Asserts that `object` does not have at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 */

const doesNotHaveAllKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.doesNotHaveAllKeys,
        true
    ).to.not.have.all.keys(keys);
};

/**
 * ### .hasAnyDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has at least one of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 */

const hasAnyDeepKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.hasAnyDeepKeys,
        true
    ).to.have.any.deep.keys(keys);
};

/**
 * ### .hasAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has all and only all of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
 *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
 *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 */

const hasAllDeepKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.hasAllDeepKeys,
        true
    ).to.have.all.deep.keys(keys);
};

/**
 * ### .containsAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` contains all of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
 *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
 *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 */

const containsAllDeepKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.containsAllDeepKeys,
        true
    ).to.contain.all.deep.keys(keys);
};

/**
 * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has none of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
 *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
 *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
 *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
 */

const doesNotHaveAnyDeepKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.doesNotHaveAnyDeepKeys,
        true
    ).to.not.have.any.deep.keys(keys);
};

/**
 * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` does not have at least one of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
 *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
 *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
 *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
 */

const doesNotHaveAllDeepKeys = function (obj, keys, message: string) {
    new Assertion(
        obj,
        message,
        assert.doesNotHaveAllDeepKeys,
        true
    ).to.not.have.all.deep.keys(keys);
};

/**
 * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
 *
 * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
 * instance of `errorLike`.
 * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
 * instance as `errorLike`.
 * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
 * message matching `errMsgMatcher`.
 *
 *     assert.throws(fn, 'Error thrown must have this message');
 *     assert.throws(fn, /Error thrown must have a message that matches this/);
 *     assert.throws(fn, ReferenceError);
 *     assert.throws(fn, errorInstance);
 *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this message');
 *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this message');
 *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
 *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
 */

const throws = function (fn, errorLike, errMsgMatcher, message: string) {
    if ("string" === typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }

    var assertErr = new Assertion(fn, message, assert.throws, true).to.throw(
        errorLike,
        errMsgMatcher
    );
    return flag(assertErr, "object");
};

/**
 * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
 *
 * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
 * instance of `errorLike`.
 * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
 * instance as `errorLike`.
 * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
 * message matching `errMsgMatcher`.
 *
 *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
 *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
 *     assert.doesNotThrow(fn, Error);
 *     assert.doesNotThrow(fn, errorInstance);
 *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
 *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
 *     assert.doesNotThrow(fn, Error, /Error must not match this/);
 *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
 */

const doesNotThrow = function (fn, errorLike, errMsgMatcher, message: string) {
    if ("string" === typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }

    new Assertion(fn, message, assert.doesNotThrow, true).to.not.throw(
        errorLike,
        errMsgMatcher
    );
};

/**
 * ### .operator(val1, operator, val2, [message])
 *
 * Compares two values using `operator`.
 *
 *     assert.operator(1, '<', 2, 'everything is ok');
 *     assert.operator(1, '>', 2, 'this will fail');
 */

const operator = function (value: any, operator, val2, message: string) {
    var ok;
    switch (operator) {
        case "==":
            ok = value == val2;
            break;
        case "===":
            ok = value === val2;
            break;
        case ">":
            ok = value > val2;
            break;
        case ">=":
            ok = value >= val2;
            break;
        case "<":
            ok = value < val2;
            break;
        case "<=":
            ok = value <= val2;
            break;
        case "!=":
            ok = value != val2;
            break;
        case "!==":
            ok = value !== val2;
            break;
        default:
            message = message ? message + ": " : message;
            throw new chai.AssertionError(
                message + 'Invalid operator "' + operator + '"',
                undefined,
                assert.operator
            );
    }
    var test = new Assertion(ok, message, assert.operator, true);
    test.assert(
        true === flag(test, "object"),
        "expected " +
            util.inspect(value) +
            " to be " +
            operator +
            " " +
            util.inspect(val2),
        "expected " +
            util.inspect(value) +
            " to not be " +
            operator +
            " " +
            util.inspect(val2)
    );
};

/**
 * ### .closeTo(actual, expected, delta, [message])
 *
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
 */

const closeTo = function (actual, expression, delta, message: string) {
    new Assertion(actual, message, assert.closeTo, true).to.be.closeTo(
        expression,
        delta
    );
};

/**
 * ### .approximately(actual, expected, delta, [message])
 *
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
 */

const approximately = function (actual, expression, delta, message: string) {
    new Assertion(
        actual,
        message,
        assert.approximately,
        true
    ).to.be.approximately(expression, delta);
};

/**
 * ### .sameMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * strict equality check (===).
 *
 *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
 */

const sameMembers = function (set1, set2, message: string) {
    new Assertion(set1, message, assert.sameMembers, true).to.have.same.members(
        set2
    );
};

/**
 * ### .notSameMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a strict equality check (===).
 *
 *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
 */

const notSameMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.notSameMembers,
        true
    ).to.not.have.same.members(set2);
};

/**
 * ### .sameDeepMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * deep equality check.
 *
 *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
 */

const sameDeepMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.sameDeepMembers,
        true
    ).to.have.same.deep.members(set2);
};

/**
 * ### .notSameDeepMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a deep equality check.
 *
 *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
 */

const notSameDeepMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.notSameDeepMembers,
        true
    ).to.not.have.same.deep.members(set2);
};

/**
 * ### .sameOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a strict equality check (===).
 *
 *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
 */

const sameOrderedMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.sameOrderedMembers,
        true
    ).to.have.same.ordered.members(set2);
};

/**
 * ### .notSameOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a strict equality check (===).
 *
 *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
 */

const notSameOrderedMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.notSameOrderedMembers,
        true
    ).to.not.have.same.ordered.members(set2);
};

/**
 * ### .sameDeepOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a deep equality check.
 *
 *     assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
 *
 * @name sameDeepOrderedMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {String} message
 * @namespace Assert
 * @api public
 */

const sameDeepOrderedMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.sameDeepOrderedMembers,
        true
    ).to.have.same.deep.ordered.members(set2);
};

/**
 * ### .notSameDeepOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a deep equality check.
 *
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
 */

const notSameDeepOrderedMembers = function (set1, set2, message: string) {
    new Assertion(
        set1,
        message,
        assert.notSameDeepOrderedMembers,
        true
    ).to.not.have.same.deep.ordered.members(set2);
};

/**
 * ### .includeMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
 */

const includeMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.includeMembers,
        true
    ).to.include.members(subset);
};

/**
 * ### .notIncludeMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
 */

const notIncludeMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.notIncludeMembers,
        true
    ).to.not.include.members(subset);
};

/**
 * ### .includeDeepMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in any order. Uses a deep
 * equality check. Duplicates are ignored.
 *
 *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
 */

const includeDeepMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.includeDeepMembers,
        true
    ).to.include.deep.members(subset);
};

/**
 * ### .notIncludeDeepMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * deep equality check. Duplicates are ignored.
 *
 *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
 */

const notIncludeDeepMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.notIncludeDeepMembers,
        true
    ).to.not.include.deep.members(subset);
};

/**
 * ### .includeOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
 */

const includeOrderedMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.includeOrderedMembers,
        true
    ).to.include.ordered.members(subset);
};

/**
 * ### .notIncludeOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
 */

const notIncludeOrderedMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.notIncludeOrderedMembers,
        true
    ).to.not.include.ordered.members(subset);
};

/**
 * ### .includeDeepOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
 */

const includeDeepOrderedMembers = function (superset, subset, message: string) {
    new Assertion(
        superset,
        message,
        assert.includeDeepOrderedMembers,
        true
    ).to.include.deep.ordered.members(subset);
};

/**
 * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
 */

const notIncludeDeepOrderedMembers = function (
    superset,
    subset,
    message: string
) {
    new Assertion(
        superset,
        message,
        assert.notIncludeDeepOrderedMembers,
        true
    ).to.not.include.deep.ordered.members(subset);
};

/**
 * ### .oneOf(inList, list, [message])
 *
 * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
 *
 *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
 */

const oneOf = function (inList, list, message: string) {
    new Assertion(inList, message, assert.oneOf, true).to.be.oneOf(list);
};

/*!
 * ### .ifError(object)
 *
 * Asserts if value is not a false value, and throws if it is a true value.
 * This is added to allow for chai to be a drop-in replacement for Node's
 * assert class.
 *
 *     var err = new Error('I am a custom error');
 *     assert.ifError(err); // Rethrows err!
 */

const ifError = function (value) {
    if (value) {
        throw value;
    }
};

/**
 * ### .isExtensible(object)
 *
 * Asserts that `object` is extensible (can have new properties added to it).
 *
 *     assert.isExtensible({});
 */

const isExtensible = function (obj, message: string) {
    new Assertion(obj, message, assert.isExtensible, true).to.be.extensible;
};

/**
 * ### .isNotExtensible(object)
 *
 * Asserts that `object` is _not_ extensible.
 *
 *     var nonExtensibleObject = Object.preventExtensions({});
 *     var sealedObject = Object.seal({});
 *     var frozenObject = Object.freeze({});
 *
 *     assert.isNotExtensible(nonExtensibleObject);
 *     assert.isNotExtensible(sealedObject);
 *     assert.isNotExtensible(frozenObject);
 */

const isNotExtensible = function (obj, message: string) {
    new Assertion(obj, message, assert.isNotExtensible, true).to.not.be
        .extensible;
};

/**
 * ### .isSealed(object)
 *
 * Asserts that `object` is sealed (cannot have new properties added to it
 * and its existing properties cannot be removed).
 *
 *     var sealedObject = Object.seal({});
 *     var frozenObject = Object.seal({});
 *
 *     assert.isSealed(sealedObject);
 *     assert.isSealed(frozenObject);
 */

const isSealed = function (obj, message: string) {
    new Assertion(obj, message, assert.isSealed, true).to.be.sealed;
};

/**
 * ### .isNotSealed(object)
 *
 * Asserts that `object` is _not_ sealed.
 *
 *     assert.isNotSealed({});
 */

const isNotSealed = function (obj, message: string) {
    new Assertion(obj, message, assert.isNotSealed, true).to.not.be.sealed;
};

/**
 * ### .isFrozen(object)
 *
 * Asserts that `object` is frozen (cannot have new properties added to it
 * and its existing properties cannot be modified).
 *
 *     var frozenObject = Object.freeze({});
 *     assert.frozen(frozenObject);
 */

const isFrozen = function (obj, message: string) {
    new Assertion(obj, message, assert.isFrozen, true).to.be.frozen;
};

/**
 * ### .isNotFrozen(object)
 *
 * Asserts that `object` is _not_ frozen.
 *
 *     assert.isNotFrozen({});
 */

const isNotFrozen = function (obj, message: string) {
    new Assertion(obj, message, assert.isNotFrozen, true).to.not.be.frozen;
};

/**
 * ### .isEmpty(target)
 *
 * Asserts that the target does not contain any values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-function objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isEmpty([]);
 *     assert.isEmpty('');
 *     assert.isEmpty(new Map);
 *     assert.isEmpty({});
 */

const isEmpty = function (value: any, message: string) {
    new Assertion(value, message, assert.isEmpty, true).to.be.empty;
};

/**
 * ### .isNotEmpty(target)
 *
 * Asserts that the target contains values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-function objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isNotEmpty([1, 2]);
 *     assert.isNotEmpty('34');
 *     assert.isNotEmpty(new Set([5, 6]));
 *     assert.isNotEmpty({ key: 7 });
 */
const isNotEmpty = function (value: any, message: string) {
    new Assertion(value, message, assert.isNotEmpty, true).to.not.be.empty;
};
