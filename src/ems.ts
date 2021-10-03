import { Command } from "commander";
import chalk from "chalk";

import Driver from "./driver/mocha";
import { SyncConfiguration } from "./types";
import excercises from "./excercises";

const handleRunComplete = (errors) => {
    if (errors) {
        console.log(errors);
    }
};

const syncExercises = async (configuration: SyncConfiguration) => {
    const driver = new Driver({
        dryRun: true,
        reporter: "json_all",
        reporterOption: {
            output: configuration.file || undefined,
        },
    });
    /* Since `require` is invoked from `./driver`, we need to force prepend `..`
     * to the excercise file path.
     */
    driver.resolveFile = (file) => `../${file}`;
    driver.addFiles(
        ...excercises.map((excerciseFile) => `./excercises/${excerciseFile}`)
    );
    driver.run(handleRunComplete);
    console.log("Done");
};

const configureCommands = (): Command => {
    const program = new Command();
    program.version("0.1.0");

    const syncCommand = new Command();
    syncCommand
        .name("sync")
        .argument(
            "[file]",
            "the resulting output file (default: standard output stream)",
            null
        )
        .alias("s")
        .description("extract excercise metadata as JSON")
        .action(async (file: string | null) => {
            const configuration = {
                file,
                ...program.opts(),
                ...syncCommand.opts(),
            } as SyncConfiguration;
            await syncExercises(configuration);
        });
    program.addCommand(syncCommand);

    program.option(
        "-f, --exercise-file <file>",
        "specify the exercise file",
        "rover.json"
    );

    return program;
};

const packageData = require("../../package");

const main = () => {
    console.log(
        chalk.bold(
            `rover ${packageData.version} ${chalk.greenBright(
                "(https://academyjs.com/rover)"
            )}`
        )
    );
    const program = configureCommands();
    program.parse(process.argv);
};

export { main };

// execute("node", ["./hello.js"], {
//     standardOutputEncoding: "utf8",
//     standardOutputLimit: 65 * 1024,
//     standardErrorEncoding: "utf8",
//     standardErrorLimit: 65 * 1024,
//     timeout: 1000 * 3,
// })
//     .then((result) => console.log(result))
//     .catch(console.log);
