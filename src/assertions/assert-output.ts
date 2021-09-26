import { execute } from "../util";
import { OutputAssertionResult, AssertOutputOptions } from "../types";

const defaultOptions = {
    command: null,
    input: "",
    expectedOutput: "",
    expectedError: "",
};

const assertOutput = async (
    customOptions: AssertOutputOptions,
    description?: string
): Promise<OutputAssertionResult> => {
    const options = {
        ...defaultOptions,
        ...customOptions,
    };
    const { expectedOutput, expectedError, command, input } = options;

    if (!command) {
        throw new Error("Please specify a command to execute.");
    }

    const [executable, ...argumentVector] = command.split(" ");

    const execution = await execute(executable, argumentVector, {
        standardInput: input,
    });

    return {
        type: "assert-output",
        success:
            execution.standardOutput === expectedOutput &&
            execution.standardError === expectedError,
        description,
        time: BigInt(-1),
        options,
        execution,
    };
};

export default assertOutput;
