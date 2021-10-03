import Test from "../test";
import { constants } from "../suite";
const { EVENT_FILE_PRE_REQUIRE } = constants;
import createInterface from "./common";

/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
export function styleInterface(suite) {
    const suites = [suite];

    suite.on(EVENT_FILE_PRE_REQUIRE, function (context, file, mocha) {
        const common = createInterface(suites, context, mocha);

        context.before = common.before;
        context.after = common.after;
        context.beforeEach = common.beforeEach;
        context.afterEach = common.afterEach;
        context.run = mocha.options.delay && common.runWithSuite(suite);
        /**
         * Describe a "suite" with the given `title`
         * and callback `fn` containing nested suites
         * and/or tests.
         */

        context.describe = context.context = function (title, fn) {
            return common.suite.create({
                title: title,
                file: file,
                fn: fn,
            });
        };

        /**
         * Pending describe.
         */

        context.xdescribe =
            context.xcontext =
            context.describe.skip =
                function (title, fn) {
                    return common.suite.skip({
                        title: title,
                        file: file,
                        fn: fn,
                    });
                };

        /**
         * Exclusive suite.
         */

        context.describe.only = function (title, fn) {
            return common.suite.only({
                title: title,
                file: file,
                fn: fn,
            });
        };

        /**
         * Describe a specification or test-case
         * with the given `title` and callback `fn`
         * acting as a thunk.
         */

        context.it = context.specify = function (title, fn) {
            var suite = suites[0];
            if (suite.isPending()) {
                fn = null;
            }
            const test: any = new Test(title, "<unavailable>", fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };

        /**
         * Exclusive test-case.
         */

        context.it.only = function (title, fn) {
            return common.test.only(mocha, context.it(title, fn));
        };

        /**
         * Pending test case.
         */

        context.xit =
            context.xspecify =
            context.it.skip =
                function (title) {
                    return context.it(title);
                };
    });
}

export const description = "BDD or RSpec style [default]";
