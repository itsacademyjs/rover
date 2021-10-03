import Runnable from "./runnable";
import * as utils from "./utils";
import * as errors from "./errors";
const { createInvalidArgumentTypeError } = errors;
const { isString } = utils;

const { MOCHA_ID_PROP_NAME } = utils.constants;

class Test extends Runnable {
    type: "test";

    /**
     * Initialize a new `Test` with the given `title` and callback `fn`.
     *
     * @public
     * @class
     * @extends Runnable
     * @param {String} title - Test title (required)
     * @param {Function} [fn] - Test callback.  If omitted, the Test is considered "pending"
     */
    constructor(title: string, description: string, fn) {
        super(title, description, fn);
        if (!isString(title)) {
            throw createInvalidArgumentTypeError(
                'Test argument "title" should be a string. Received type "' +
                    typeof title +
                    '"',
                "title",
                "string"
            );
        }
        this.type = "test";
        this.reset();
    }

    /**
     * Resets the state initially or for a next run.
     */
    reset() {
        super.reset();
        this.pending = !this.fn;
        delete this.state;
    }

    /**
     * Set or get retried test
     *
     * @private
     */
    retriedTest = function (n) {
        if (!arguments.length) {
            return this._retriedTest;
        }
        this._retriedTest = n;
    };

    /**
     * Add test to the list of tests marked `only`.
     *
     * @private
     */
    markOnly = function () {
        this.parent.appendOnlyTest(this);
    };

    clone = function () {
        const test: any = new Test(this.title, "<unavailable>", this.fn);
        test.timeout(this.timeout());
        test.slow(this.slow());
        test.retries(this.retries());
        test.currentRetry(this.currentRetry());
        test.retriedTest(this.retriedTest() || this);
        test.globals(this.globals());
        test.parent = this.parent;
        test.file = this.file;
        test.ctx = this.ctx;
        return test;
    };

    /**
     * Returns an minimal object suitable for transmission over IPC.
     * Functions are represented by keys beginning with `$$`.
     * @private
     * @returns {Object}
     */
    serialize = function seridfalize() {
        return {
            $$currentRetry: this._currentRetry,
            $$fullTitle: this.fullTitle(),
            $$isPending: Boolean(this.pending),
            $$retriedTest: this._retriedTest || null,
            $$slow: this._slow,
            $$titlePath: this.titlePath(),
            body: this.body,
            duration: this.duration,
            err: this.err,
            parent: {
                $$fullTitle: this.parent.fullTitle(),
                [MOCHA_ID_PROP_NAME]: this.parent.id,
            },
            speed: this.speed,
            state: this.state,
            title: this.title,
            type: this.type,
            file: this.file,
            [MOCHA_ID_PROP_NAME]: this.id,
        };
    };
}

export default Test;
