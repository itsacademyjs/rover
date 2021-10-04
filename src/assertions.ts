/*!
 * Majority of the function declarations and documentation was derived from Chai: http://chaijs.com.
 * A few new functions were introduced based on our needs. Further, all the functions were migrated
 * to TypeScript and were written from scratch.
 *
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * Copyright(c) 2021 AcademyJS <hello@academyjs.com>
 * MIT Licensed
 */

import AssertionError from "assertion-error";
import lodash from "lodash";
import fs from "fs";
import { execute } from "./util";

/**
 * Create your own test expressions.
 *
 * ```js
 * assert('two' !== 2, "string 'two' is not equivalent to integer 2");
 * ```
 */
export const assert = (expression: any, message: string): void => {
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
export const fail = (actual: any, expected: any, message: string): void => {
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
export const isTruthy = (value: any, message: string): void => {
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
export const isFalsy = (value: any, message: string): void => {
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
 * ```js
 * equal(3, '3', '== coerces values to strings');
 * ```
 */
export const equal = (actual: any, expected: any, message: string): void => {
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
 * ```js
 * notEqual(3, 4, 'these numbers are not equal');
 * ```
 */
export const notEqual = (actual: any, expected: any, message: string): void => {
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
 * ```js
 * strictEqual(true, true, 'these booleans are strictly equal');
 * ```
 */
export const strictEqual = (
    actual: any,
    expected: any,
    message: string
): void => {
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
 * ```js
 * notStrictEqual(3, '3', 'no coercion for strict equality');
 * ```
 */
export const notStrictEqual = (
    actual: any,
    expected: any,
    message: string
): void => {
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
 * ```js
 * deepEqual({ tea: 'green' }, { tea: 'green' });
 * ```
 */
export const deepEqual = (
    actual: any,
    expected: any,
    message: string
): void => {
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
 * ```js
 * notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
 * ```
 */
export const notDeepEqual = (
    actual: any,
    expected: any,
    message: string
): void => {
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
 * ```js
 * isAbove(5, 2, '5 is strictly greater than 2');
 * ```
 */
export const isAbove = (
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
 * ```js
 * isAtLeast(5, 2, '5 is greater or equal to 2');
 * isAtLeast(3, 3, '3 is greater or equal to 3');
 * ```
 */
export const isAtLeast = (
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
 * ```js
 * isBelow(3, 6, '3 is strictly less than 6');
 * ```
 */
export const isBelow = (
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
 * ```js
 * isAtMost(3, 6, '3 is less than or equal to 6');
 * isAtMost(4, 4, '4 is less than or equal to 4');
 * ```
 */
export const isAtMost = (
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
 * ```js
 * let teaServed = true;
 * isTrue(teaServed, 'the tea has been served');
 * ```
 */
export const isTrue = (value: any, message: string): void => {
    if (value !== true) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not true.
 *
 * ```js
 * let tea = 'tasty chai';
 * isNotTrue(tea, 'great, time for tea!');
 * ```
 */
export const isNotTrue = (value: any, message: string): void => {
    if (value === true) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is false.
 *
 * ```js
 * let teaServed = false;
 * isFalse(teaServed, 'no tea yet? hmm...');
 * ```
 */
export const isFalse = (value: any, message: string): void => {
    if (value !== false) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not false.
 *
 * ```js
 * let tea = 'tasty chai';
 * isNotFalse(tea, 'great, time for tea!');
 * ```
 */
export const isNotFalse = (value: any, message: string): void => {
    if (!value === false) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is null.
 *
 * ```js
 * isNull(err, 'there was no error');
 * ```
 */
export const isNull = (value: any, message: string): void => {
    if (value !== null) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not null.
 *
 * ```js
 * let tea = 'tasty chai';
 * isNotNull(tea, 'great, time for tea!');
 * ```
 */
export const isNotNull = (value: any, message: string): void => {
    if (value === null) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that value is NaN.
 *
 * ```js
 * isNaN(NaN, 'NaN is NaN');
 * ```
 */
export const isNaN = (value: any, message: string): void => {
    if (value !== value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that value is not NaN.
 *
 * ```js
 * isNotNaN(4, '4 is not NaN');
 * ```
 */
export const isNotNaN = (value: any, message: string): void => {
    if (value === value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target is neither `null` nor `undefined`.
 *
 * ```js
 * let foo = 'hi';
 * exists(foo, 'foo is neither `null` nor `undefined`');
 * ```
 */
export const exists = (value: any, message: string): void => {
    if (!lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target is either `null` or `undefined`.
 *
 * ```js
 * let bar = null, baz;
 * notExists(bar);
 * notExists(baz, 'baz is either null or undefined');
 * ```
 */
export const notExists = (value: any, message: string): void => {
    if (lodash.exists(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is `undefined`.
 *
 * ```js
 * let tea;
 * isUndefined(tea, 'no tea defined');
 * ```
 */
export const isUndefined = (value: any, message: string): void => {
    if (!lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is not `undefined`.
 *
 * ```js
 * let tea = 'cup of chai';
 * isDefined(tea, 'tea has been defined');
 * ```
 */
export const isDefined = (value: any, message: string): void => {
    if (lodash.isUndefined(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a .
 *
 * ```js
 * isFunction(serveTea, 'great, we can have tea now');
 * ```
 */
export const isFunction = (value: any, message: string): void => {
    if (!lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a .
 *
 * ```js
 * let serveTea = [ 'heat', 'pour', 'sip' ];
 * isNotFunction(serveTea, 'great, we have listed the steps');
 * ```
 */
export const isNotFunction = (value: any, message: string): void => {
    if (lodash.isFunction(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
 * _The assertion does not match subclassed objects._
 *
 * ```js
 * let selection = { name: 'Chai', serve: 'with spices' };
 * isObject(selection, 'tea selection is an object');
 * ```
 */
export const isObject = (value: any, message: string): void => {
    if (!lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
 *
 * ```js
 * let selection = 'chai'
 * isNotObject(selection, 'tea selection is not an object');
 * isNotObject(null, 'null is not an object');
 * ```
 */
export const isNotObject = (value: any, message: string): void => {
    if (lodash.isObject(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an array.
 *
 * ```js
 * let menu = [ 'green', 'chai', 'oolong' ];
 * isArray(menu, 'what kind of tea do we want?');
 * ```
 */
export const isArray = (value: any, message: string): void => {
    if (!lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ an array.
 *
 * ```js
 * let menu = 'green|chai|oolong';
 * isNotArray(menu, 'what kind of tea do we want?');
 * ```
 */
export const isNotArray = (value: any, message: string): void => {
    if (lodash.isArray(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a string.
 *
 * ```js
 * let teaOrder = 'chai';
 * isString(teaOrder, 'order placed');
 * ```
 */
export const isString = (value: any, message: string): void => {
    if (!lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a string.
 *
 * ```js
 * let teaOrder = 4;
 * isNotString(teaOrder, 'order placed');
 * ```
 */
export const isNotString = (value: any, message: string): void => {
    if (lodash.isString(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a number.
 *
 * ```js
 * let cups = 2;
 * isNumber(cups, 'how many cups');
 * ```
 */
export const isNumber = (value: any, message: string): void => {
    if (!lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a number.
 *
 * ```js
 * let cups = '2 cups please';
 * isNotNumber(cups, 'how many cups');
 * ```
 */
export const isNotNumber = (value: any, message: string): void => {
    if (lodash.isNumber(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
 *
 * ```js
 * let cups = 2;
 * isFinite(cups, 'how many cups');
 * isFinite(NaN); // throws
 * ```
 */
export const isFinite = (value: any, message: string): void => {
    if (!lodash.isFinite(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is a boolean.
 *
 * ```js
 * let teaReady = true, teaServed = false;
 * isBoolean(teaReady, 'is the tea ready');
 * isBoolean(teaServed, 'has tea been served');
 * ```
 */
export const isBoolean = (value: any, message: string): void => {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is _not_ a boolean.
 *
 * ```js
 * let teaReady = 'yep', teaServed = 'nope';
 * isNotBoolean(teaReady, 'is the tea ready');
 * isNotBoolean(teaServed, 'has tea been served');
 * ```
 */
export const isNotBoolean = (value: any, message: string): void => {
    if (!lodash.isBoolean(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value`'s type is `name`, as determined by
 * `Object.prototype.toString`.
 *
 * ```js
 * typeOf({ tea: 'chai' }, 'object', 'we have an object');
 * typeOf(['chai', 'jasmine'], 'array', 'we have an array');
 * typeOf('tea', 'string', 'we have a string');
 * typeOf(/tea/, 'regexp', 'we have a regular expression');
 * typeOf(null, 'null', 'we have a null');
 * typeOf(undefined, 'undefined', 'we have an undefined');
 * ```
 */
export const typeOf = (value: any, type: string, message: string): void => {
    if (typeof value !== type) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value`'s type is _not_ `name`, as determined by
 * `Object.prototype.toString`.
 *
 * ```js
 * notTypeOf('tea', 'number', 'strings are not numbers');
 * ```
 */
export const notTypeOf = (value: any, type, message: string): void => {
    if (typeof value === type) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `value` is an instance of `constructor`.
 *
 * ```js
 * let Tea =  (name) { this.name = name; }, chai = new Tea('chai');
 * instanceOf(chai, Tea, 'chai is an instance of tea');
 * ```
 */
export const instanceOf = (value: any, constructor, message: string): void => {
    if (!lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts `value` is not an instance of `constructor`.
 *
 * ```js
 * let Tea =  (name) { this.name = name; }, chai = new String('chai');
 * notInstanceOf(chai, Tea, 'chai is not an instance of tea');
 * ```
 */
export const notInstanceOf = (
    value: any,
    constructor,
    message: string
): void => {
    if (lodash.isInstanceOf(value, constructor)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array, a substring in a string, or a subset of
 * properties in an object.
 *
 * ```js
 * include([1,2,3], 2, 'array contains value');
 * include('foobar', 'foo', 'string contains substring');
 * include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
 * ```
 *
 * Strict equality (===) is used. When asserting the inclusion of a value in
 * an array, the array is searched for an element that's strictly equal to the
 * given value. When asserting a subset of properties in an object, the object
 * is searched for the given property keys, checking that each one is present
 * and strictly equal to the given property value. For instance:
 *
 * ```js
 * let obj1 = {a: 1}, obj2 = {b: 2};
 * include([obj1, obj2], obj1);
 * include({foo: obj1, bar: obj2}, {foo: obj1});
 * include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
 * ```
 */
export const include = (
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
 * ```js
 * notInclude([1,2,3], 4, "array doesn't contain value");
 * notInclude('foobar', 'baz', "string doesn't contain substring");
 * notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
 * ```
 *
 * Strict equality (===) is used. When asserting the absence of a value in an
 * array, the array is searched to confirm the absence of an element that's
 * strictly equal to the given value. When asserting a subset of properties in
 * an object, the object is searched to confirm that at least one of the given
 * property keys is either not present or not strictly equal to the given
 * property value. For instance:
 *
 * ```js
 * let obj1 = {a: 1}, obj2 = {b: 2};
 * notInclude([obj1, obj2], {a: 1});
 * notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 * notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
 * ```
 */
export const notInclude = (
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
 * ```js
 * let obj1 = {a: 1}, obj2 = {b: 2};
 * deepInclude([obj1, obj2], {a: 1});
 * deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 * deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
 * ```
 */
export const deepInclude = (
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
 * ```js
 * let obj1 = {a: 1}, obj2 = {b: 2};
 * notDeepInclude([obj1, obj2], {a: 9});
 * notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
 * notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
 * ```
 */
export const notDeepInclude = (
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
 * ```js
 * match('foobar', /^foo/, 'regexp matches');
 * ```
 */
export const match = (
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
 * ```js
 * notMatch('foobar', /^foo/, 'regexp does not match');
 * ```
 */
export const notMatch = (
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
 * ```js
 * property({ tea: { green: 'matcha' }}, 'tea');
 * property({ tea: { green: 'matcha' }}, 'toString');
 * ```
 */
export const property = (
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
 * ```js
 * notProperty({ tea: { green: 'matcha' }}, 'coffee');
 * ```
 */
export const notProperty = (
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
 * ```js
 * propertyVal({ tea: 'is good' }, 'tea', 'is good');
 * ```
 */
export const propertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (!lodash.has(object0, property) || object0[property] !== value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a strict equality check
 * (===).
 *
 * ```js
 * notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
 * notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
 * ```
 */
export const notPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (lodash.has(object0, property) && object0[property] === value) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a deep equality check.
 *
 * ```js
 * deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 * ```
 */
export const deepPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        !lodash.has(object0, property) ||
        !lodash.isEqual(object0[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a deep equality check.
 *
 * ```js
 * notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 * notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 * notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 * ```
 */
export const notDeepPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        lodash.has(object0, property) &&
        lodash.isEqual(object0[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property`. Inherited
 * properties aren't checked.
 *
 * ```js
 * ownProperty({ tea: { green: 'matcha' }}, 'tea');
 * ```
 */
export const ownProperty = (
    object0: object,
    property: string,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        !object0.hasOwnProperty(property)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by
 * `property`. Inherited properties aren't checked.
 *
 * ```js
 * notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
 * notOwnProperty({}, 'toString');
 * ```
 */
export const notOwnProperty = (
    object0: object,
    property: string,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        object0.hasOwnProperty(property)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a strict equality check (===).
 * Inherited properties aren't checked.
 *
 * ```js
 * ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
 * ```
 */
export const ownPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        !object0.hasOwnProperty(property) ||
        object0[property] !== value
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a strict equality check
 * (===). Inherited properties aren't checked.
 *
 * ```js
 * notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
 * notOwnPropertyVal({}, 'toString', Object.prototype.toString);
 * ```
 */
export const notOwnPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        (object0.hasOwnProperty(property) && object0[property] === value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a deep equality check. Inherited
 * properties aren't checked.
 *
 * ```js
 * deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 * ```
 */
export const deepOwnPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        !object0.hasOwnProperty(property) ||
        !lodash.isEqual(object0[property], value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a deep equality check.
 * Inherited properties aren't checked.
 *
 * ```js
 * notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 * notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 * notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 * notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
 * ```
 */
export const notDeepOwnPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        (object0.hasOwnProperty(property) &&
            lodash.isEqual(object0[property], value))
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a direct or inherited property named by
 * `property`, which can be a string using dot- and bracket-notation for
 * nested reference.
 *
 * ```js
 * nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
 * ```
 */
export const nestedProperty = (
    object0: object,
    property: string,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        lodash.get(object0, property, "notAProperty") === "notAProperty"
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property`, which
 * can be a string using dot- and bracket-notation for nested reference. The
 * property cannot exist on the object nor anywhere in its prototype chain.
 *
 * ```js
 * notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
 * ```
 */
export const notNestedProperty = (
    object0: object,
    property: string,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        lodash.get(object0, property, "notAProperty") !== "notAProperty"
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a property named by `property` with value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a strict equality check (===).
 *
 * ```js
 * nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
 * ```
 */
export const nestedPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        !lodash.get(object0, property) ||
        lodash.get(object0, property) !== value
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a strict equality check (===).
 *
 * ```js
 * notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
 * notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
 * ```
 */
export const notNestedPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        (lodash.get(object0, property) &&
            lodash.get(object0, property) === value)
    ) {
        throw new AssertionError(message);
    }
};
/**
 * Asserts that `object` has a property named by `property` with a value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a deep equality check.
 *
 * ```js
 * deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
 * ```
 */
export const deepNestedPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        !lodash.get(object0, property) ||
        !lodash.isEqual(lodash.get(object0, property), value)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a deep equality check.
 *
 * ```js
 * notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
 * notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
 * notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
 * ```
 */
export const notDeepNestedPropertyValue = (
    object0: object,
    property: string,
    value: any,
    message: string
): void => {
    if (
        object0 === undefined ||
        object0 === null ||
        (lodash.get(object0, property) &&
            lodash.isEqual(lodash.get(object0, property), value))
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has a `length` or `size` with the expected value.
 *
 * ```js
 * lengthOf([1,2,3], 3, 'array has length of 3');
 * lengthOf('foobar', 6, 'string has length of 6');
 * lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
 * lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
 * ```
 */
export const length = (
    expression: any,
    length: number,
    message: string
): void => {
    if (lodash.size(expression) !== length) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 * ```js
 * hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
 * hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
 * hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 * hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 * ```
 */
export const hasAnyKeys = (
    object0: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (!lodash.some(lodash.intersection(keys, lodash.keys(object0)))) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has all and only all of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 * ```js
 * hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 * hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
 * hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 * hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
 * ```
 */
export const hasAllKeys = (
    object0: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (!lodash.isEqual(keys, lodash.keys(object0))) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 * ```js
 * containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
 * containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 * containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
 * containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
 * containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
 * containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 * containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
 * containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
 * ```
 */
export const containsAllKeys = (
    object0: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (
        !lodash.isEqual(lodash.intersection(keys, lodash.keys(object0)), keys)
    ) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` has none of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 * ```js
 * doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 * doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 * doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 * doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 * ```
 */
export const doesNotHaveAnyKeys = (
    object0: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (lodash.some(lodash.intersection(keys, lodash.keys(object0)))) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` does not have at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 * ```js
 * doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 * doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 * doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 * doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
 * ```
 */
export const doesNotHaveAllKeys = (
    object0: object,
    keys: string[] | Symbol[],
    message: string
): void => {
    if (lodash.isEqual(keys, lodash.keys(object0))) {
        throw new AssertionError(message);
    }
};

/**
 * Compares two values using `operator`.
 *
 * ```js
 * operator(1, '<', 2, 'everything is ok');
 * operator(1, '>', 2, 'this will fail');
 * ```
 */
export const operator = (value: any, operator, val2, message: string): void => {
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
 * ```js
 * closeTo(1.5, 1, 0.5, 'numbers are close');
 * ```
 */
export const closeTo = (
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
 * ```js
 * approximately(1.5, 1, 0.5, 'numbers are close');
 * ```
 */
export const approximately = (
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
 * ```js
 * sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
 * ```
 */
export const sameMembers = (
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
 * Uses a strict equality check (===).
 *
 * ```js
 * notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
 * ```
 */
export const notSameMembers = (
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (lodash.isEqual(set1.sort(), set2.sort())) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * deep equality check.
 *
 * ```js
 * sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
 * ```
 */
export const sameDeepMembers = (
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
 * ```js
 * notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
 * ```
 */
export const notSameDeepMembers = (
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
 * ```js
 * sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
 * ```
 */
export const sameOrderedMembers = (
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
 * ```js
 * notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
 * ```
 */
export const notSameOrderedMembers = (
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
 * ```js
 * sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
 * ```
 */
export const sameDeepOrderedMembers = (
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
 * ```js
 * notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
 * notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
 * ```
 */
export const notSameDeepOrderedMembers = (
    set1: any[],
    set2: any[],
    message: string
): void => {
    if (lodash.isEqual(set1, set2)) {
        throw new AssertionError(message);
    }
};

const isSubset = (subset: any[], superset: any[]): boolean => {
    subset.map((item) => {
        if (!lodash.includes(superset, item)) {
            return false;
        }
    });
    return true;
};

/**
 * Asserts that `subset` is included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 * ```js
 * includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
 * ```
 */
export const includeMembers = (
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
 * ```js
 * notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
 * ```
 */
export const notIncludeMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

const isDeepSubset = (subset: any[], superset: any[]): boolean => {
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

/**
 * Asserts that `subset` is included in `superset` in any order. Uses a deep
 * equality check. Duplicates are ignored.
 *
 * ```js
 * includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
 * ```
 */
export const includeDeepMembers = (
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
 * ```js
 * notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
 * ```
 */
export const notIncludeDeepMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isDeepSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

const isOrderedSubset = (subset: any[], superset: any[]): boolean => {
    if (!lodash.includes(superset, subset[0])) {
        return false;
    }
    let index = lodash.indexOf(superset, subset[0]);
    for (let i = 1; i < subset.length; i++) {
        if (superset[index + i] !== subset[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 * ```js
 * includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
 * ```
 */
export const includeOrderedMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isOrderedSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 * ```js
 * notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
 * notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
 * ```
 */
export const notIncludeOrderedMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isOrderedSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

const isDeepOrderedSubset = (subset: any[], superset: any[]): boolean => {
    if (!lodash.includes(superset, subset[0])) {
        return false;
    }
    let index = lodash.indexOf(superset, subset[0]);
    for (let i = 1; i < subset.length; i++) {
        if (!lodash.isEqual(superset[index + i], subset[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 * ```js
 * includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
 * ```
 */
export const includeDeepOrderedMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (!isDeepOrderedSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 * ```js
 * notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
 * notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
 * notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
 * ```
 */
export const notIncludeDeepOrderedMembers = (
    superset: any[],
    subset: any[],
    message: string
): void => {
    if (isDeepOrderedSubset(subset, superset)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
 *
 * ```js
 * oneOf(1, [ 2, 1 ], 'Not found in list');
 * ```
 */
export const oneOf = (inList: any, list: any[], message: string): void => {
    if (!lodash.includes(list, inList)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is extensible (can have new properties added to it).
 *
 * ```js
 * isExtensible({});
 * ```
 */
export const isExtensible = (object0: object, message: string): void => {
    if (!Object.isExtensible(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ extensible.
 *
 * ```js
 * let nonExtensibleObject = Object.preventExtensions({});
 * let sealedObject = Object.seal({});
 * let frozenObject = Object.freeze({});
 * isNotExtensible(nonExtensibleObject);
 * isNotExtensible(sealedObject);
 * isNotExtensible(frozenObject);
 * ```
 */
export const isNotExtensible = (object0: object, message: string): void => {
    if (Object.isExtensible(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is sealed (cannot have new properties added to it
 * and its existing properties cannot be removed).
 *
 * ```js
 * let sealedObject = Object.seal({});
 * let frozenObject = Object.seal({});
 * isSealed(sealedObject);
 * isSealed(frozenObject);
 * ```
 */
export const isSealed = (object0: object, message: string): void => {
    if (!Object.isSealed(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ sealed.
 *
 * ```js
 * isNotSealed({});
 * ```
 */
export const isNotSealed = (object0: object, message: string): void => {
    if (Object.isSealed(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is frozen (cannot have new properties added to it
 * and its existing properties cannot be modified).
 *
 * ```js
 * let frozenObject = Object.freeze({});
 * frozen(frozenObject);
 * ```
 */
export const isFrozen = (object0: object, message: string): void => {
    if (!Object.isFrozen(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that `object` is _not_ frozen.
 *
 * ```js
 * isNotFrozen({});
 * ```
 */
export const isNotFrozen = (object0: object, message: string): void => {
    if (Object.isFrozen(object0)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target does not contain any values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non- objects, it gets the count of own
 * enumerable string keys.
 *
 * ```js
 * isEmpty([]);
 * isEmpty('');
 * isEmpty(new Map);
 * isEmpty({});
 * ```
 */
export const isEmpty = (value: any, message: string): void => {
    if (!lodash.isEmpty(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the target contains values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non- objects, it gets the count of own
 * enumerable string keys.
 *
 * ```js
 * isNotEmpty([1, 2]);
 * isNotEmpty('34');
 * isNotEmpty(new Set([5, 6]));
 * isNotEmpty({ key: 7 });
 * ```
 */
export const isNotEmpty = (value: any, message: string): void => {
    if (lodash.isEmpty(value)) {
        throw new AssertionError(message);
    }
};

/**
 * Asserts that the specified path resolves to a file.
 */
export const fileExists = async (
    path: string,
    message?: string
): Promise<void> => {
    try {
        await fs.promises.access(path);
    } catch {
        throw new AssertionError(message);
    }
};

/**
 * Executes the specified command and checks for the standard output and standard error
 * generated.
 *
 * @param command The command to execute
 * @param input The standard input to the process.
 * @param expectedOutput The execpted output from the process.
 * @param expectedError The expected error from the process.
 * @param message The message used for throwing an assertion error.
 */
export const spawnPrints = async (
    command: string,
    input: string = "",
    expectedOutput: string = "",
    expectedError: string = "",
    message: string = ""
): Promise<void> => {
    if (!command) {
        throw new Error("Please specify a command to execute.");
    }

    const [executable, ...argumentVector] = command.split(" ");

    /* TODO: Spawning a child process could throw an exception. Should we catch the error and
     * throw an assertion error instead?
     */
    const execution = await execute(executable, argumentVector, {
        standardInput: input,
    });

    strictEqual(execution.standardOutput, expectedOutput, message);
    strictEqual(execution.standardError, expectedError, message);
};
