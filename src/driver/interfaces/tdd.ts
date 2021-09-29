import Test from "../test";
import Suite from "../suite";

const { EVENT_FILE_PRE_REQUIRE } = Suite.constants;

/**
 * TDD-style interface:
 *
 *      suite('Array', function() {
 *        suite('#indexOf()', function() {
 *          suiteSetup(function() {
 *
 *          });
 *
 *          test('should return -1 when not present', function() {
 *
 *          });
 *
 *          test('should return the index when present', function() {
 *
 *          });
 *
 *          suiteTeardown(function() {
 *
 *          });
 *        });
 *      });
 *
 * @param suite Root suite.
 */
export const styleInterface = (suite: Suite) => {
    const suites = [suite];

    suite.on(EVENT_FILE_PRE_REQUIRE, (context, file, mocha) => {
        const common = require("./common")(suites, context, mocha);

        context.setup = common.beforeEach;
        context.teardown = common.afterEach;
        context.suiteSetup = common.before;
        context.suiteTeardown = common.after;
        context.run = mocha.options.delay && common.runWithSuite(suite);

        /**
         * Describe a "suite" with the given `title` and callback `fn` containing
         * nested suites and/or tests.
         */
        context.suite = (title, fn) =>
            common.suite.create({
                title: title,
                file: file,
                fn: fn,
            });

        /**
         * Pending suite.
         */
        context.suite.skip = (title, fn) =>
            common.suite.skip({
                title: title,
                file: file,
                fn: fn,
            });

        /**
         * Exclusive test-case.
         */
        context.suite.only = (title, fn) =>
            common.suite.only({
                title: title,
                file: file,
                fn: fn,
            });

        /**
         * Describe a specification or test-case with the given `title` and
         * callback `fn` acting as a thunk.
         */
        context.test = (title, fn) => {
            const suite = suites[0];
            if (suite.isPending()) {
                fn = null;
            }
            const test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };

        /**
         * Exclusive test-case.
         */
        context.test.only = (title, fn) =>
            common.test.only(mocha, context.test(title, fn));

        context.test.skip = common.test.skip;
    });
};

export const description =
    'traditional "suite"/"test" instead of BDD\'s "describe"/"it"';
