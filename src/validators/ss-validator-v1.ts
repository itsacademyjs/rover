import { execute } from "../util";
import { ValidatorFunction, SSValidatorOptions, Configuration } from "../types";
import chalk from "chalk";

const defaultOptions = {
    input: "",
    expectedOutput: "",
    expectedError: "",
};

const validate: ValidatorFunction = async (
    customOptions: SSValidatorOptions,
    configuration: Configuration
): Promise<boolean> => {
    const options = { ...defaultOptions, ...customOptions };

    const execution = await execute("node", ["index.js"], {
        standardInput: options.input,
    });

    if (configuration.stdOutput) {
        console.log(execution.standardOutput);
    }

    if (configuration.stdError) {
        console.log(execution.standardError);
    }

    if (
        execution.standardOutput !== options.expectedOutput ||
        execution.standardError !== options.expectedError
    ) {
        if (execution.standardOutput.trim()) {
            console.log(chalk.redBright.bold("Received"));
            console.log(execution.standardOutput);
            console.log(chalk.greenBright.bold("Expected"));
            console.log(options.expectedOutput);
        }

        return false;
    }

    return true;
};

export default validate;
