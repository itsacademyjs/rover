import fs from "fs";
import path from "path";

import Base from "./base";
import { createUnsupportedError } from "../errors";
import * as utils from "../utils";
import Runner, { RunnerOptions, constants } from "../runner";

const { EVENT_SUITE_BEGIN, EVENT_SUITE_END, EVENT_TEST_END, EVENT_RUN_END } =
    constants;

class JSONAllReporter extends Base {
    /**
     * Constructs a new `JSON` reporter instance.
     *
     * @param runner - Instance triggers reporter actions.
     * @param options - runner options
     */
    constructor(runner: Runner, options: RunnerOptions = {}) {
        super(runner, options);

        const rootSuites = [];
        const cachedSuites = {};
        const stackedSuites = [];

        runner.on(EVENT_SUITE_BEGIN, (suite) => {
            const { id, file, title, handle, description } = suite;
            const newRecord = {
                id,
                file,
                title,
                handle,
                description,
                tests: [],
                suites: [],
            };
            if (!suite.parent) {
                rootSuites.push(newRecord);
            } else {
                cachedSuites[suite.parent.id].suites.push(newRecord);
            }
            cachedSuites[suite.id] = newRecord;

            stackedSuites.push(newRecord);
        });

        runner.on(EVENT_SUITE_END, (suite) => {
            stackedSuites.pop();
        });

        runner.on(EVENT_TEST_END, (test) => {
            const { title, description } = test;
            const currentSuite = stackedSuites[stackedSuites.length - 1];
            currentSuite.tests.push({
                title,
                description,
            });
        });

        runner.once(EVENT_RUN_END, () => {
            const result = {
                suites: rootSuites,
                stats: this.stats,
            };
            runner.testResults = result;

            this.options.reporterOption.onComplete &&
                this.options.reporterOption.onComplete(result);
        });
    }

    static description = "single JSON object";
}

export default JSONAllReporter;
