import { EventEmitter } from "events";
import Pending from "./pending";
import milliseconds from "ms";
import * as utils from "./utils";
import {
    createInvalidExceptionError,
    createMultipleDoneError,
    createTimeoutError,
} from "./errors";

/**
 * Save timer references to avoid Sinon interfering (see GH-237).
 * @private
 */
const { Date, setTimeout, clearTimeout } = global;
const toString = Object.prototype.toString;

const constants = utils.defineConstants(
    /**
     * {@link Runnable}-related constants.
     * @public
     * @memberof Runnable
     * @readonly
     * @static
     * @alias constants
     * @enum {string}
     */
    {
        /**
         * Value of `state` prop when a `Runnable` has failed
         */
        STATE_FAILED: "failed",
        /**
         * Value of `state` prop when a `Runnable` has passed
         */
        STATE_PASSED: "passed",
        /**
         * Value of `state` prop when a `Runnable` has been skipped by user
         */
        STATE_PENDING: "pending",
    }
);

class Runnable extends EventEmitter {
    private _slow;
    private _retries;
    private _currentRetry;
    private _timeout;

    title: string;
    description: string;
    fn: /*Func | AsyncFunc*/ any | undefined;
    body: string;
    async: boolean;
    sync: boolean;
    timedOut: boolean;
    pending: boolean;
    duration?: number | undefined;
    parent?: /*Suite*/ any | undefined;
    state?: "failed" | "passed" | undefined;
    timer?: any;
    ctx?: /*Context*/ any | undefined;
    callback?: /*Done*/ any | undefined;
    allowUncaught?: boolean | undefined;
    file?: string | undefined;
    err: any;

    /**
     * Initialize a new `Runnable` with the given `title` and callback `fn`.
     *
     * @class
     * @extends external:EventEmitter
     * @public
     * @param {String} title
     * @param {Function} fn
     */
    constructor(title: string, description?: string, fn?) {
        super();
        this.title = title;
        this.description = description;
        this.fn = fn;
        this.body = (fn || "").toString();
        this.async = fn && fn.length;
        this.sync = !this.async;
        this._timeout = 2000;
        this._slow = 75;
        this._retries = -1;
        utils.assignNewMochaID(this);
        Object.defineProperty(this, "id", {
            get() {
                return utils.getMochaID(this);
            },
        });
        this.reset();
    }

    /**
     * Resets the state initially or for a next run.
     */
    reset() {
        this.timedOut = false;
        this._currentRetry = 0;
        this.pending = false;
        delete this.state;
        delete this.err;
    }

    /**
     * Get current timeout value in msecs.
     *
     * @private
     * @returns {number} current timeout threshold value
     */
    /**
     * @summary
     * Set timeout threshold value (msecs).
     *
     * @description
     * A string argument can use shorthand (e.g., "2s") and will be converted.
     * The value will be clamped to range [<code>0</code>, <code>2^<sup>31</sup>-1</code>].
     * If clamped value matches either range endpoint, timeouts will be disabled.
     *
     * @private
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value}
     * @param {number|string} ms - Timeout threshold value.
     * @returns {Runnable} this
     * @chainable
     */
    timeout(ms?: number | string): this {
        if (!arguments.length) {
            return this._timeout;
        }
        if (typeof ms === "string") {
            ms = milliseconds(ms);
        }

        // Clamp to range
        var INT_MAX = Math.pow(2, 31) - 1;
        var range = [0, INT_MAX];
        ms = utils.clamp(ms, range);

        // see #1652 for reasoning
        if (ms === range[0] || ms === range[1]) {
            this._timeout = 0;
        } else {
            this._timeout = ms;
        }

        if (this.timer) {
            this.resetTimeout();
        }
        return this;
    }

    /**
     * Set or get slow `ms`.
     *
     * @private
     * @param {number|string} ms
     * @return {Runnable|number} ms or Runnable instance.
     */
    slow(ms?: number | string): Runnable | number {
        if (!arguments.length || typeof ms === "undefined") {
            return this._slow;
        }
        if (typeof ms === "string") {
            ms = milliseconds(ms);
        }
        this._slow = ms;
        return this;
    }

    /**
     * Halt and mark as pending.
     */
    skip() {
        this.pending = true;
        throw new Pending("sync skip; aborting execution");
    }

    /**
     * Check if this runnable or its parent suite is marked as pending.
     *
     * @private
     */
    isPending() {
        return this.pending || (this.parent && this.parent.isPending());
    }

    /**
     * Return `true` if this Runnable has failed.
     */
    isFailed(): boolean {
        return !this.isPending() && this.state === constants.STATE_FAILED;
    }

    /**
     * Return `true` if this Runnable has passed.
     */
    isPassed(): boolean {
        return !this.isPending() && this.state === constants.STATE_PASSED;
    }

    /**
     * Set or get number of retries.
     */
    retries(n?: number) {
        if (!arguments.length) {
            return this._retries;
        }
        this._retries = n;
    }

    /**
     * Set or get current retry
     *
     * @private
     */
    currentRetry = function (n) {
        if (!arguments.length) {
            return this._currentRetry;
        }
        this._currentRetry = n;
    };

    /**
     * Return the full title generated by recursively concatenating the parent's
     * full title.
     *
     * @memberof Mocha.Runnable
     * @public
     * @return {string}
     */
    fullTitle = function () {
        return this.titlePath().join(" ");
    };

    /**
     * Return the title path generated by concatenating the parent's title path with the title.
     *
     * @memberof Mocha.Runnable
     * @public
     * @return {string}
     */
    titlePath = function () {
        return this.parent.titlePath().concat([this.title]);
    };

    /**
     * Clear the timeout.
     *
     * @private
     */
    clearTimeout = function () {
        clearTimeout(this.timer);
    };

    /**
     * Reset the timeout.
     *
     * @private
     */
    resetTimeout = function () {
        var self = this;
        var ms = this.timeout();

        if (ms === 0) {
            return;
        }
        this.clearTimeout();
        this.timer = setTimeout(function () {
            if (self.timeout() === 0) {
                return;
            }
            self.callback(self._timeoutError(ms));
            self.timedOut = true;
        }, ms);
    };

    /**
     * Set or get a list of whitelisted globals for this test run.
     *
     * @private
     * @param {string[]} globals
     */
    globals = function (globals) {
        if (!arguments.length) {
            return this._allowedGlobals;
        }
        this._allowedGlobals = globals;
    };

    /**
     * Run the test and invoke `fn(err)`.
     *
     * @param {Function} fn
     * @private
     */
    run = function (fn) {
        var self = this;
        var start = new Date();
        var ctx = this.ctx;
        var finished;
        var errorWasHandled = false;

        if (this.isPending()) return fn();

        // Sometimes the ctx exists, but it is not runnable
        if (ctx && ctx.runnable) {
            ctx.runnable(this);
        }

        // called multiple times
        function multiple(err) {
            if (errorWasHandled) {
                return;
            }
            errorWasHandled = true;
            self.emit("error", createMultipleDoneError(self, err));
        }

        // finished
        function done(err?) {
            var ms = self.timeout();
            if (self.timedOut) {
                return;
            }

            if (finished) {
                return multiple(err);
            }

            self.clearTimeout();
            self.duration = (new Date() as any) - (start as any);
            finished = true;
            if (!err && self.duration > ms && ms > 0) {
                err = self._timeoutError(ms);
            }
            fn(err);
        }

        // for .resetTimeout() and Runner#uncaught()
        this.callback = done;

        if (this.fn && typeof this.fn.call !== "function") {
            done(
                new TypeError(
                    "A runnable must be passed a function as its second argument."
                )
            );
            return;
        }

        // explicit async with `done` argument
        if (this.async) {
            this.resetTimeout();

            // allows skip() to be used in an explicit async context
            this.skip = function asyncSkip() {
                this.pending = true;
                done();
                // halt execution, the uncaught handler will ignore the failure.
                throw new Pending("async skip; aborting execution");
            };

            try {
                callFnAsync(this.fn);
            } catch (err) {
                // handles async runnables which actually run synchronously
                errorWasHandled = true;
                if (err instanceof Pending) {
                    return; // done() is already called in this.skip()
                } else if (this.allowUncaught) {
                    throw err;
                }
                done(Runnable.toValueOrError(err));
            }
            return;
        }

        // sync or promise-returning
        try {
            callFn(this.fn);
        } catch (err) {
            errorWasHandled = true;
            if (err instanceof Pending) {
                return done();
            } else if (this.allowUncaught) {
                throw err;
            }
            done(Runnable.toValueOrError(err));
        }

        function callFn(fn) {
            var result = fn.call(ctx);
            if (result && typeof result.then === "function") {
                self.resetTimeout();
                result.then(
                    function () {
                        done();
                        // Return null so libraries like bluebird do not warn about
                        // subsequently constructed Promises.
                        return null;
                    },
                    function (reason) {
                        done(
                            reason ||
                                new Error(
                                    "Promise rejected with no or falsy reason"
                                )
                        );
                    }
                );
            } else {
                if (self.asyncOnly) {
                    return done(
                        new Error(
                            "--async-only option in use without declaring `done()` or returning a promise"
                        )
                    );
                }

                done();
            }
        }

        function callFnAsync(fn) {
            var result = fn.call(ctx, function (err) {
                if (
                    err instanceof Error ||
                    toString.call(err) === "[object Error]"
                ) {
                    return done(err);
                }
                if (err) {
                    if (
                        Object.prototype.toString.call(err) ===
                        "[object Object]"
                    ) {
                        return done(
                            new Error(
                                "done() invoked with non-Error: " +
                                    JSON.stringify(err)
                            )
                        );
                    }
                    return done(
                        new Error("done() invoked with non-Error: " + err)
                    );
                }
                if (result && utils.isPromise(result)) {
                    return done(
                        new Error(
                            "Resolution method is overspecified. Specify a callback *or* return a Promise; not both."
                        )
                    );
                }

                done();
            });
        }
    };

    /**
     * Instantiates a "timeout" error
     *
     * @param {number} ms - Timeout (in milliseconds)
     * @returns {Error} a "timeout" error
     * @private
     */
    _timeoutError = function (ms) {
        let msg = `Timeout of ${ms}ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.`;
        if (this.file) {
            msg += " (" + this.file + ")";
        }
        return createTimeoutError(msg, ms, this.file);
    };

    static constants = constants;

    /**
     * Given `value`, return identity if truthy, otherwise create an "invalid exception" error and return that.
     * @param {*} [value] - Value to return, if present
     * @returns {*|Error} `value`, otherwise an `Error`
     * @private
     */
    static toValueOrError = function (value) {
        return (
            value ||
            createInvalidExceptionError(
                "Runnable failed with falsy or undefined exception. Please throw an Error instead.",
                value
            )
        );
    };
}

export default Runnable;
