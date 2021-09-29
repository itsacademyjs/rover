/**
 * Provides a factory function for a {@link StatsCollector} object.
 * @module
 */

import { constants } from "./runner";
import Runner from "./runner";
const {
    EVENT_TEST_PASS,
    EVENT_TEST_FAIL,
    EVENT_SUITE_BEGIN,
    EVENT_RUN_BEGIN,
    EVENT_TEST_PENDING,
    EVENT_RUN_END,
    EVENT_TEST_END,
} = constants;

const { Date } = global;

/**
 * Test statistics collector.
 */
export interface Stats {
    /** integer count of suites run.  */
    suites: number;

    /**  integer count of tests run. */
    tests: number;

    /**  integer count of passing tests. */
    passes: number;

    /** integer count of pending tests. */
    pending: number;

    /** integer count of failed tests. */
    failures: number;

    /** time when testing began. */
    start?: Date | undefined;

    /** time when testing concluded. */
    end?: Date | undefined;

    /** number of msecs that testing took. */
    duration?: number | undefined;
}

/**
 * Provides stats such as test duration, number of tests passed / failed etc., by listening for
 * events emitted by `runner`.
 *
 * @param runner
 *        Runner instance
 * @throws {TypeError} If falsy `runner`
 */
const createStatsCollector = (runner: Runner): void => {
    /**
     * @type StatsCollector
     */
    const stats: Stats = {
        suites: 0,
        tests: 0,
        passes: 0,
        pending: 0,
        failures: 0,
    };

    if (!runner) {
        throw new TypeError("Missing runner argument");
    }

    runner.stats = stats;

    runner.once(EVENT_RUN_BEGIN, function () {
        stats.start = new Date();
    });
    runner.on(EVENT_SUITE_BEGIN, function (suite) {
        suite.root || stats.suites++;
    });
    runner.on(EVENT_TEST_PASS, function () {
        stats.passes++;
    });
    runner.on(EVENT_TEST_FAIL, function () {
        stats.failures++;
    });
    runner.on(EVENT_TEST_PENDING, function () {
        stats.pending++;
    });
    runner.on(EVENT_TEST_END, function () {
        stats.tests++;
    });
    runner.once(EVENT_RUN_END, function () {
        stats.end = new Date();
        stats.duration = (stats.end as any) - (stats.start as any);
    });
};

export default createStatsCollector;
