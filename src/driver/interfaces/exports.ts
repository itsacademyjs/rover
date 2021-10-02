import Suite from "../suite";
import Test from "../test";

/**
 * Exports-style (as Node.js module) interface:
 *
 *     exports.Array = {
 *       '#indexOf()': {
 *         'should return -1 when the value is not present': function() {
 *
 *         },
 *
 *         'should return the correct index when the value is present': function() {
 *
 *         }
 *       }
 *     };
 *
 * @param suite
 *        Root suite
 */
export const styleInterface = (suite: Suite) => {
    const suites = [suite];

    const visit = (object, file) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(object)) {
            if (typeof object[key] === "function") {
                const callback = object[key];
                switch (key) {
                    case "before":
                        suites[0].beforeAll(callback);
                        break;
                    case "after":
                        suites[0].afterAll(callback);
                        break;
                    case "beforeEach":
                        suites[0].beforeEach(callback);
                        break;
                    case "afterEach":
                        suites[0].afterEach(callback);
                        break;
                    default: {
                        const test = new Test(key, "<unavailable>", callback);
                        test.file = file;
                        suites[0].addTest(test);
                    }
                }
            } else {
                const newSuite = Suite.create(suites[0], key);
                suites.unshift(newSuite);
                visit(object[key], file);
                suites.shift();
            }
        }
    };
    suite.on(Suite.constants.EVENT_FILE_REQUIRE, visit);
};

export const description = 'Node.js module ("exports") style';
