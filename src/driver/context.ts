import Runnable from "./runnable";
import Test from "./test";

/**
 * Initialize a new `Context`.
 *
 * @private
 */
class Context {
    private _runnable;

    test?: Runnable | undefined;
    currentTest?: Test | undefined;

    /**
     * Set or get the context `Runnable` to `runnable`.
     *
     * @private
     * @param {Runnable} runnable
     * @return {Context} context
     */
    runnable(runnable?: Runnable): this {
        if (!arguments.length) {
            return this._runnable;
        }
        this.test = this._runnable = runnable;
        return this;
    }

    /**
     * Set or get test timeout `ms`.
     *
     * @private
     * @param {number} ms
     * @return {Context} self
     */
    timeout(ms?): this {
        if (!arguments.length) {
            return this.runnable().timeout();
        }
        this.runnable().timeout(ms);
        return this;
    }

    /**
     * Set or get test slowness threshold `ms`.
     *
     * @private
     * @param {number} ms
     * @return {Context} self
     */
    slow(ms?): this {
        if (!arguments.length) {
            return this.runnable().slow();
        }
        this.runnable().slow(ms);
        return this;
    }

    /**
     * Mark a test as skipped.
     *
     * @private
     * @throws Pending
     */
    skip() {
        this.runnable().skip();
    }

    /**
     * Set or get a number of allowed retries on failed tests
     */
    retries(n?: number): this {
        if (!arguments.length) {
            return this.runnable().retries();
        }
        this.runnable().retries(n);
        return this;
    }
}

export default Context;
