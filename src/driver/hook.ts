import Runnable from "./runnable";
import { constants } from "./utils";

const { MOCHA_ID_PROP_NAME } = constants;

class Hook extends Runnable {
    type: "hook";

    /**
     * Initialize a new `Hook` with the given `title` and callback `fn`
     */
    constructor(title: string, fn) {
        super(title, "<hook>", fn);
        this.type = "hook";
    }

    _error: any;
    /**
     * Resets the state for a next run.
     */
    reset() {
        super.reset();
        delete this._error;
    }

    /**
     * Get or set the test `err`.
     *
     * @memberof Hook
     * @public
     * @param {Error} err
     * @return {Error}
     */
    error = function (err) {
        if (!arguments.length) {
            err = this._error;
            this._error = null;
            return err;
        }

        this._error = err;
    };

    /**
     * Returns an object suitable for IPC.
     * Functions are represented by keys beginning with `$$`.
     * @private
     * @returns {Object}
     */
    serialize = function serialize() {
        return {
            $$currentRetry: this.currentRetry(),
            $$fullTitle: this.fullTitle(),
            $$isPending: Boolean(this.isPending()),
            $$titlePath: this.titlePath(),
            ctx:
                this.ctx && this.ctx.currentTest
                    ? {
                          currentTest: {
                              title: this.ctx.currentTest.title,
                              [MOCHA_ID_PROP_NAME]: this.ctx.currentTest.id,
                          },
                      }
                    : {},
            duration: this.duration,
            file: this.file,
            parent: {
                $$fullTitle: this.parent.fullTitle(),
                [MOCHA_ID_PROP_NAME]: this.parent.id,
            },
            state: this.state,
            title: this.title,
            type: this.type,
            [MOCHA_ID_PROP_NAME]: this.id,
        };
    };
}

export default Hook;
