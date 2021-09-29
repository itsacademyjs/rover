import Base from "./base";
import { constants } from "../runner";

const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    EVENT_TEST_FAIL,
    EVENT_TEST_PASS,
    EVENT_TEST_PENDING,
} = constants;

const { color } = Base;

class Spec extends Base {
    /**
     * Constructs a new `Spec` reporter instance.
     */
    constructor(runner, options) {
        super(runner, options);

        let indents = 0;
        let n = 0;

        const indent = () => Array(indents).join("  ");

        runner.on(EVENT_RUN_BEGIN, () => {
            Base.consoleLog();
        });

        runner.on(EVENT_SUITE_BEGIN, (suite) => {
            ++indents;
            Base.consoleLog(color("suite", "%s%s"), indent(), suite.title);
        });

        runner.on(EVENT_SUITE_END, () => {
            --indents;
            if (indents === 1) {
                Base.consoleLog();
            }
        });

        runner.on(EVENT_TEST_PENDING, (test) => {
            const format = indent() + color("pending", "  - %s");
            Base.consoleLog(format, test.title);
        });

        runner.on(EVENT_TEST_PASS, (test) => {
            let format;
            if (test.speed === "fast") {
                format =
                    indent() +
                    color("checkmark", "  " + Base.symbols.ok) +
                    color("pass", " %s");
                Base.consoleLog(format, test.title);
            } else {
                format =
                    indent() +
                    color("checkmark", "  " + Base.symbols.ok) +
                    color("pass", " %s") +
                    color(test.speed, " (%dms)");
                Base.consoleLog(format, test.title, test.duration);
            }
        });

        runner.on(EVENT_TEST_FAIL, (test) => {
            Base.consoleLog(
                indent() + color("fail", "  %d) %s"),
                ++n,
                test.title
            );
        });

        runner.once(EVENT_RUN_END, this.epilogue.bind(this));
    }

    static description = "hierarchical & verbose [default]";
}

export default Spec;
