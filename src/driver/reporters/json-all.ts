import chalk from "chalk";

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
        const suites = {};
        let error = false;

        runner.on(EVENT_SUITE_BEGIN, (suite) => {
            const { id, file, title, handle, description, tags } = suite;
            const newRecord = {
                id,
                file,
                title,
                handle,
                description,
                tags,
                tests: [],
                suites: [],
            };
            if (!suite.parent) {
                rootSuites.push(newRecord);
            } else {
                cachedSuites[suite.parent.id].suites.push(newRecord);
            }
            cachedSuites[suite.id] = newRecord;
            if (suite.handle) {
                const previousSuite = suites[suite.handle];
                if (previousSuite) {
                    console.log(
                        `${chalk.redBright(
                            "[internal error]"
                        )} Multiple test suites cannot have the same handle ${chalk.bold(
                            suite.handle
                        )}.\nprevious: ${previousSuite.file}, duplicate: ${
                            suite.file
                        }`
                    );
                    error = true;
                }
                suites[suite.handle] = newRecord;
            }

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
                this.options.reporterOption.onComplete(result, suites, error);
        });
    }

    static description = "single JSON object";
}

export default JSONAllReporter;
