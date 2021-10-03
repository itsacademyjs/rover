import Base from "./base";
import fs from "fs";
import path from "path";
import { createUnsupportedError } from "../errors";
import * as utils from "../utils";
import Runner, { RunnerOptions, constants } from "../runner";

const {
    EVENT_TEST_PASS,
    EVENT_TEST_PENDING,
    EVENT_TEST_FAIL,
    EVENT_TEST_END,
    EVENT_RUN_END,
} = constants;

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 */
const clean = (test) => {
    let error = test.err || {};
    if (error instanceof Error) {
        error = errorJSON(error);
    }

    return {
        title: test.title,
        fullTitle: test.fullTitle(),
        file: test.file,
        duration: test.duration,
        currentRetry: test.currentRetry(),
        speed: test.speed,
        err: cleanCycles(error),
    };
};

/**
 * Replaces any circular references inside `object` with '[object Object]'
 */
const cleanCycles = (object) => {
    const cache = [];
    return JSON.parse(
        JSON.stringify(object, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Instead of going in a circle, we'll print [object Object]
                    return "" + value;
                }
                cache.push(value);
            }

            return value;
        })
    );
};

/**
 * Transform an Error object into a JSON object.
 */
const errorJSON = (error) => {
    const result = {};
    Object.getOwnPropertyNames(error).forEach((key) => {
        result[key] = error[key];
    }, error);
    return result;
};

class JSONReporter extends Base {
    /**
     * Constructs a new `JSON` reporter instance.
     *
     * @param runner - Instance triggers reporter actions.
     * @param options - runner options
     */
    constructor(runner: Runner, options: RunnerOptions = {}) {
        super(runner, options);

        const tests = [];
        const pending = [];
        const failures = [];
        const passes = [];
        let output;

        if (options.reporterOption && options.reporterOption.output) {
            if (utils.isBrowser()) {
                throw createUnsupportedError(
                    "file output not supported in browser"
                );
            }
            output = options.reporterOption.output;
        }

        runner.on(EVENT_TEST_END, (test) => {
            tests.push(test);
        });

        runner.on(EVENT_TEST_PASS, (test) => {
            passes.push(test);
        });

        runner.on(EVENT_TEST_FAIL, (test) => {
            failures.push(test);
        });

        runner.on(EVENT_TEST_PENDING, (test) => {
            pending.push(test);
        });

        runner.once(EVENT_RUN_END, () => {
            const object = {
                stats: this.stats,
                tests: tests.map(clean),
                pending: pending.map(clean),
                failures: failures.map(clean),
                passes: passes.map(clean),
            };

            runner.testResults = object;

            const json = JSON.stringify(object, null, 2);
            if (output) {
                try {
                    fs.mkdirSync(path.dirname(output), { recursive: true });
                    fs.writeFileSync(output, json);
                } catch (error) {
                    console.error(
                        `${Base.symbols.err} [mocha] writing output to "${output}" failed: ${error.message}\n`
                    );
                    process.stdout.write(json);
                }
            } else {
                process.stdout.write(json);
            }
        });
    }

    static description = "single JSON object";
}

export default JSONReporter;
