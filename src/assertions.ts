/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import AssertionError from "assertion-error";
import { sub } from "date-fns";
import lodash from "lodash";

/**
 * Create your own test expressions.
 *
 * ```js
 * assert('two' !== 2, "string 'two' is not equivalent to integer 2");
 * ```
 */

const assert = <T>(expression, message: string): void => {
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

const fail = <T>(actual: any, expected: any, message: string): void => {
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
const isTruthy = <T>(value: any, message: string): void => {
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
const isFalsy = <T>(value: any, message: string): void => {
    if (value) {
        throw new AssertionError(message, {
            actual: value,
            expected: false,
        });
    }
};

/**
 * Asserts non-strict equality (`==`) of `actual` and `expected`.
 *
 *     assert.equal(3, '3', '== coerces values to strings');
 */

const equal = <T>(actual: any, expected: any, message: string): void => {
    if (actual != expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
 *
 *     assert.notEqual(3, 4, 'these numbers are not equal');
 */

const notEqual = <T>(actual: any, expected: any, message: string): void => {
    if (actual == expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Asserts strict equality (`===`) of `actual` and `expected`.
 *
 *     assert.strictEqual(true, true, 'these booleans are strictly equal');
 */

const strictEqual = (actual: any, expected: any, message: string): void => {
    if (actual !== expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Asserts strict inequality (`!==`) of `actual` and `expected`.
 *
 *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
 */

const notStrictEqual = (actual: any, expected: any, message: string): void => {
    if (actual === expected) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Asserts that `actual` is deeply equal to `expected`.
 *
 *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
 */

const deepEqual = (actual: any, expected: any, message: string): void => {
    if (!lodash.isEqual(actual, expected)) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Assert that `actual` is not deeply equal to `expected`.
 *
 *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
 */

const notDeepEqual = (actual: any, expected: any, message: string): void => {
    if (lodash.isEqual(actual, expected)) {
        throw new AssertionError(message, {
            actual,
            expected,
        });
    }
};

/**
 * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
 *
 *     assert.isAbove(5, 2, '5 is strictly greater than 2');
 */

const isAbove = <T>(
    valueToCheck: any,
    valueToBeAbove: any,
    message: string
): void => {
    if (!lodash.gt(valueToCheck, valueToBeAbove)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
 *
 *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
 *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
 */

const isAtLeast = <T>(
    valueToCheck: any,
    valueToBeAtLeast: any,
    message: string
): void => {
    if (!lodash.gte(valueToCheck, valueToBeAtLeast)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
 *
 *     assert.isBelow(3, 6, '3 is strictly less than 6');
 */

const isBelow = <T>(
    valueToCheck: any,
    valueToBeBelow: any,
    message: string
): void => {
    if (!lodash.lt(valueToCheck, valueToBeBelow)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
 *
 *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
 *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
 */

const isAtMost = <T>(
    valueToCheck: any,
    valueToBeAtMost: any,
    message: string
): void => {
    if (!lodash.lte(valueToCheck, valueToBeAtMost)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is true.
 *
 *     let teaServed = true;
 *     assert.isTrue(teaServed, 'the tea has been served');
 */

const isTrue = <T>(value: any, message: string): void => {
    if (value !== true) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not true.
 *
 *     let tea = 'tasty chai';
 *     assert.isNotTrue(tea, 'great, time for tea!');
 */

const isNotTrue = <T>(value: any, message: string): void => {
    if (value === true) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is false.
 *
 *     let teaServed = false;
 *     assert.isFalse(teaServed, 'no tea yet? hmm...');
 */

const isFalse = <T>(value: any, message: string): void => {
    if (value !== false) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not false.
 *
 *     let tea = 'tasty chai';
 *     assert.isNotFalse(tea, 'great, time for tea!');
 */

const isNotFalse = <T>(value: any, message: string): void => {
    if (!value === false) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is null.
 *
 *     assert.isNull(err, 'there was no error');
 */

const isNull = <T>(value: any, message: string): void => {
    if (value !== null) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not null.
 *
 *     let tea = 'tasty chai';
 *     assert.isNotNull(tea, 'great, time for tea!');
 */

const isNotNull = <T>(value: any, message: string): void => {
    if (value === null) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that value is NaN.
 *
 *     assert.isNaN(NaN, 'NaN is NaN');
 */

const isNaN = <T>(value: any, message: string): void => {
    if (value !== value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that value is not NaN.
 *
 *     assert.isNotNaN(4, '4 is not NaN');
 */
const isNotNaN = <T>(value: any, message: string): void => {
    if (value === value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target is neither `null` nor `undefined`.
 *
 *     let foo = 'hi';
 *
 *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
 */

const exists = <T>(value: any, message: string): void => {
    if (!lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target is either `null` or `undefined`.
 *
 *     let bar = null
 *       , baz;
 *
 *     assert.notExists(bar);
 *     assert.notExists(baz, 'baz is either null or undefined');
 */

const notExists = <T>(value: any, message: string): void => {
    if (lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is `undefined`.
 *
 *     let tea;
 *     assert.isUndefined(tea, 'no tea defined');
 */

const isUndefined = <T>(value: any, message: string): void => {
    if (!lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not `undefined`.
 *
 *     let tea = 'cup of chai';
 *     assert.isDefined(tea, 'tea has been defined');
 */

const isDefined = <T>(value: any, message: string): void => {
    if (lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a <T>.
 *
 *     <T> serveTea() { return 'cup of tea'; };
 *     assert.isFunction(serveTea, 'great, we can have tea now');
 */

const isFunction = <T>(value: any, message: string): void => {
    if (!lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a <T>.
 *
 *     let serveTea = [ 'heat', 'pour', 'sip' ];
 *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
 */

const isNotFunction = <T>(value: any, message: string): void => {
    if (lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
 * _The assertion does not match subclassed objects._
 *
 *     let selection = { name: 'Chai', serve: 'with spices' };
 *     assert.isObject(selection, 'tea selection is an object');
 */

const isObject = <T>(value: any, message: string): void => {
    if (!lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
 *
 *     let selection = 'chai'
 *     assert.isNotObject(selection, 'tea selection is not an object');
 *     assert.isNotObject(null, 'null is not an object');
 */

const isNotObject = <T>(value: any, message: string): void => {
    if (lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an array.
 *
 *     let menu = [ 'green', 'chai', 'oolong' ];
 *     assert.isArray(menu, 'what kind of tea do we want?');
 */

const isArray = <T>(value: any, message: string): void => {
    if (!lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ an array.
 *
 *     let menu = 'green|chai|oolong';
 *     assert.isNotArray(menu, 'what kind of tea do we want?');
 */

const isNotArray = <T>(value: any, message: string): void => {
    if (lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a string.
 *
 *     let teaOrder = 'chai';
 *     assert.isString(teaOrder, 'order placed');
 */

const isString = <T>(value: any, message: string): void => {
    if (!lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a string.
 *
 *     let teaOrder = 4;
 *     assert.isNotString(teaOrder, 'order placed');
 */

const isNotString = <T>(value: any, message: string): void => {
    if (lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a number.
 *
 *     let cups = 2;
 *     assert.isNumber(cups, 'how many cups');
 */

const isNumber = <T>(value: any, message: string): void => {
    if (!lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a number.
 *
 *     let cups = '2 cups please';
 *     assert.isNotNumber(cups, 'how many cups');
 */

const isNotNumber = <T>(value: any, message: string): void => {
    if (lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
 *
 *     let cups = 2;
 *     assert.isFinite(cups, 'how many cups');
 *
 *     assert.isFinite(NaN); // throws
 */

const isFinite = <T>(value: any, message: string): void => {
    if (!lodash.isFinite(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a boolean.
 *
 *     let teaReady = true
 *       , teaServed = false;
 *
 *     assert.isBoolean(teaReady, 'is the tea ready');
 *     assert.isBoolean(teaServed, 'has tea been served');
 */

const isBoolean = <T>(value: any, message: string): void => {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a boolean.
 *
 *     let teaReady = 'yep'
 *       , teaServed = 'nope';
 *
 *     assert.isNotBoolean(teaReady, 'is the tea ready');
 *     assert.isNotBoolean(teaServed, 'has tea been served');
 */

const isNotBoolean = <T>(value: any, message: string): void => {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
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

const typeOf = <T>(value: any, type: string, message: string): void => {
    if (typeof value !== type) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value`'s type is _not_ `name`, as determined by
 * `Object.prototype.toString`.
 *
 *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
 */

const notTypeOf = <T>(value: any, type, message: string): void => {
    if (typeof value === type) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an instance of `constructor`.
 *
 *     let Tea = <T> (name) { this.name = name; }
 *       , chai = new Tea('chai');
 *
 *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
 */

const instanceOf = <T>(value: any, constructor, message: string): void => {
    if (!lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts `value` is not an instance of `constructor`.
 *
 *     let Tea = <T> (name) { this.name = name; }
 *       , chai = new String('chai');
 *
 *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
 */

const notInstanceOf = <T>(value: any, constructor, message: string): void => {
    if (lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
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
 *     let obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.include([obj1, obj2], obj1);
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
 */

const include = <T>(
    expression: any,
    includedValue: any,
    message: string
): void => {
    if (!lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
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
 *     let obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.notInclude([obj1, obj2], {a: 1});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
 */

const notInclude = <T>(
    expression: any,
    includedValue: any,
    message: string
): void => {
    if (lodash.includes(expression, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     let obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.deepInclude([obj1, obj2], {a: 1});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
 */

const deepInclude = <T>(
    expression: any,
    includedValue: any,
    message: string
): void => {
    const element = lodash.find(expression, includedValue);
    if (!lodash.isEqual(element, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `haystack` does not include `needle`. Can be used to assert
 * the absence of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     let obj1 = {a: 1}
 *       , obj2 = {b: 2};
 *     assert.notDeepInclude([obj1, obj2], {a: 9});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
 */

const notDeepInclude = <T>(
    expression: any,
    includedValue: any,
    message: string
): void => {
    const element = lodash.find(expression, includedValue);
    if (lodash.isEqual(element, includedValue)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` matches the regular expression `regexp`.
 *
 *     assert.match('foobar', /^foo/, 'regexp matches');
 */

const match = <T>(
    expression: string,
    regularExpression: any,
    message: string
): void => {
    if (!expression.match(regularExpression)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` does not match the regular expression `regexp`.
 *
 *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
 */

const notMatch = <T>(
    expression: string,
    regularExpression: any,
    message: string
): void => {
    if (expression.match(regularExpression)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property`.
 *
 *     assert.property({ tea: { green: 'matcha' }}, 'tea');
 *     assert.property({ tea: { green: 'matcha' }}, 'toString');
 */

const property = <T>(
    value: object,
    property: string,
    message: string
): void => {
    if (!lodash.has(value, property)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property`.
 *
 *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
 */
const notProperty = <T>(
    value: object,
    property: string,
    message: string
): void => {
    if (lodash.has(value, property)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
 */

const propertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (!lodash.has(obj, property) || obj[property] !== value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
 *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
 */

const notPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (lodash.has(obj, property) && obj[property] === value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a deep equality check.
 *
 *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 */

const deepPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (!lodash.has(obj, property) || !lodash.isEqual(obj[property], value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a deep equality check.
 *
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 */

const notDeepPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (lodash.has(obj, property) && lodash.isEqual(obj[property], value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property`. Inherited
 * properties aren't checked.
 *
 *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
 */

const ownProperty = <T>(
    obj: object,
    property: string,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (!obj.hasOwnProperty(property)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by
 * `property`. Inherited properties aren't checked.
 *
 *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
 *     assert.notOwnProperty({}, 'toString');
 */
const notOwnProperty = <T>(
    obj: object,
    property: string,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (obj.hasOwnProperty(property)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a strict equality check (===).
 * Inherited properties aren't checked.
 *
 *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
 */

const ownPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (!obj.hasOwnProperty(property) || obj[property] !== value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a strict equality check
 * (===). Inherited properties aren't checked.
 *
 *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
 *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
 */

const notOwnPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (obj.hasOwnProperty(property) && obj[property] === value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a deep equality check. Inherited
 * properties aren't checked.
 *
 *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 */

const deepOwnPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        !obj.hasOwnProperty(property) ||
        !lodash.isEqual(obj[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a deep equality check.
 * Inherited properties aren't checked.
 *
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
 */

const notDeepOwnPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        obj.hasOwnProperty(property) &&
        lodash.isEqual(obj[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property`, which can be a string using dot- and bracket-notation for
 * nested reference.
 *
 *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
 */

const nestedProperty = <T>(
    obj: object,
    property: string,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (lodash.get(obj, property, "notAProperty") === "notAProperty") {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property`, which
 * can be a string using dot- and bracket-notation for nested reference. The
 * property cannot exist on the object nor anywhere in its prototype chain.
 *
 *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
 */

const notNestedProperty = <T>(
    obj: object,
    property: string,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (lodash.get(obj, property, "notAProperty") !== "notAProperty") {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a property named by `property` with value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a strict equality check (===).
 *
 *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
 */

const nestedPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        !lodash.get(obj, property) ||
        lodash.get(obj, property) !== value
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a strict equality check (===).
 *
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
 */

const notNestedPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        lodash.get(obj, property) &&
        lodash.get(obj, property) === value
    ) {
        throw new AssertionError(message);
    }
};
/**
 * Asserts that `object` has a property named by `property` with a value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a deep equality check.
 *
 *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
 */

const deepNestedPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        !lodash.get(obj, property) ||
        !lodash.isEqual(lodash.get(obj, property), value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a deep equality check.
 *
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
 */

const notDeepNestedPropertyValue = <T>(
    obj: object,
    property: string,
    value: any,
    message: string
): void => {
    if (obj === undefined || obj === null) {
        throw new AssertionError("Object is not defined");
    } else if (
        lodash.get(obj, property) &&
        lodash.isEqual(lodash.get(obj, property), value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a `length` or `size` with the expected value.
 *
 *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
 *     assert.lengthOf('foobar', 6, 'string has length of 6');
 *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
 *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
 */

const length = <T>(expression: any, length: number, message: string): void => {
    if (lodash.size(expression) !== length) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
 *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 */

const hasAnyKeys = <T>(
    obj: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (!lodash.some(lodash.intersection(keys, lodash.keys(obj)))) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has all and only all of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
 *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
 */

const hasAllKeys = <T>(
    obj: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (!lodash.isEqual(keys, lodash.keys(obj))) {
        throw new AssertionError(message);
    }
};

/**
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

const containsAllKeys = <T>(
    obj: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (!lodash.isEqual(lodash.intersection(keys, lodash.keys(obj)), keys)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has none of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 */

const doesNotHaveAnyKeys = <T>(
    obj: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (lodash.some(lodash.intersection(keys, lodash.keys(obj)))) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does not have at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 */

const doesNotHaveAllKeys = <T>(
    obj: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (lodash.isEqual(keys, lodash.keys(obj))) {
        throw new AssertionError(message);
    }
};

/**
 * Compares two values using `operator`.
 *
 *     assert.operator(1, '<', 2, 'everything is ok');
 *     assert.operator(1, '>', 2, 'this will fail');
 */

const operator = <T>(value: any, operator, val2, message: string): void => {
    let ok;
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
            throw new AssertionError(
                message + 'Invalid operator "' + operator + '"',
                {
                    operator,
                }
            );
    }
};

/**
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
 */

const closeTo = <T>(
    actual: number,
    expression: number,
    delta: number,
    message: string
): void => {
    if (!(expression - delta <= actual && actual <= expression + delta)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
 */

const approximately = <T>(
    actual: number,
    expression: number,
    delta: number,
    message: string
): void => {
    if (!(expression - delta <= actual && actual <= expression + delta)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * strict equality check (===).
 *
 *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
 */

const sameMembers = <T>(set1: any[], set2: any[], message: string): void => {
    if (!lodash.isEqual(set1.sort(), set2.sort())) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a strict equality check (===).
 *
 *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
 */

const notSameMembers = <T>(set1: any[], set2: any[], message: string): void => {
    if (lodash.isEqual(set1.sort(), set2.sort())) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * deep equality check.
 *
 *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
 */

const sameDeepMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (!lodash.isEqual(set1.sort(), set2.sort())) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a deep equality check.
 *
 *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
 */

const notSameDeepMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (lodash.isEqual(set1.sort(), set2.sort())) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a strict equality check (===).
 *
 *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
 */

const sameOrderedMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (!lodash.isEqual(set1, set2)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a strict equality check (===).
 *
 *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
 */

const notSameOrderedMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (lodash.isEqual(set1, set2)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a deep equality check.
 *
 *     assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
 */

const sameDeepOrderedMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (!lodash.isEqual(set1, set2)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a deep equality check.
 *
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
 */

const notSameDeepOrderedMembers = <T>(
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (lodash.isEqual(set1, set2)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` is included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
 */

const isSubset = <T>(subset: any[], superset: any[]): boolean => {
    subset.map((item) => {
        if (!lodash.includes(superset, item)) {
            return false;
        }
    });
    return true;
};

const includeMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
 */

const notIncludeMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` is included in `superset` in any order. Uses a deep
 * equality check. Duplicates are ignored.
 *
 *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
 */

const isDeepSubset = <T>(subset: any[], superset: any[]): boolean => {
    subset.map((item) => {
        if (!lodash.includes(superset, item)) {
            return false;
        } else {
            const index = lodash.indexOf(superset, item);
            if (!lodash.isEqual(item, superset[index])) {
                return false;
            }
        }
    });
    return true;
};

const includeDeepMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isDeepSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * deep equality check. Duplicates are ignored.
 *
 *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
 */

const notIncludeDeepMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isDeepSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
 */

const includeOrderedMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
 */

const notIncludeOrderedMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
 */

const includeDeepOrderedMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isDeepSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
 */

const notIncludeDeepOrderedMembers = <T>(
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isDeepSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
 *
 *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
 */

const oneOf = <T>(inList: any, list: any[], message: string): void => {
    if (!lodash.includes(list, inList)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is extensible (can have new properties added to it).
 *
 *     assert.isExtensible({});
 */

const isExtensible = <T>(obj: object, message: string): void => {
    if (!Object.isExtensible(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ extensible.
 *
 *     let nonExtensibleObject = Object.preventExtensions({});
 *     let sealedObject = Object.seal({});
 *     let frozenObject = Object.freeze({});
 *
 *     assert.isNotExtensible(nonExtensibleObject);
 *     assert.isNotExtensible(sealedObject);
 *     assert.isNotExtensible(frozenObject);
 */

const isNotExtensible = <T>(obj: object, message: string): void => {
    if (Object.isExtensible(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is sealed (cannot have new properties added to it
 * and its existing properties cannot be removed).
 *
 *     let sealedObject = Object.seal({});
 *     let frozenObject = Object.seal({});
 *
 *     assert.isSealed(sealedObject);
 *     assert.isSealed(frozenObject);
 */

const isSealed = <T>(obj: object, message: string): void => {
    if (!Object.isSealed(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ sealed.
 *
 *     assert.isNotSealed({});
 */

const isNotSealed = <T>(obj: object, message: string): void => {
    if (Object.isSealed(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is frozen (cannot have new properties added to it
 * and its existing properties cannot be modified).
 *
 *     let frozenObject = Object.freeze({});
 *     assert.frozen(frozenObject);
 */

const isFrozen = <T>(obj: object, message: string): void => {
    if (!Object.isFrozen(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ frozen.
 *
 *     assert.isNotFrozen({});
 */

const isNotFrozen = <T>(obj: object, message: string): void => {
    if (Object.isFrozen(obj)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target does not contain any values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-<T> objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isEmpty([]);
 *     assert.isEmpty('');
 *     assert.isEmpty(new Map);
 *     assert.isEmpty({});
 */

const isEmpty = <T>(value: any, message: string): void => {
    if (!lodash.isEmpty(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target contains values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-<T> objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isNotEmpty([1, 2]);
 *     assert.isNotEmpty('34');
 *     assert.isNotEmpty(new Set([5, 6]));
 *     assert.isNotEmpty({ key: 7 });
 */
const isNotEmpty = <T>(value: any, message: string): void => {
    if (lodash.isEmpty(value)) {
        throw new AssertionError(message);
    }
};
