import { execute } from "../util";
import { ToolVersionAssertionResult, AssertToolVersionOptions } from "../types";

const defaultOptions = {
    tool: null,
    version: "",
};

const tools = {
    node: {
        argumentVector: ["--version"],
        matcher: (output: string, version: string) => output.trim() === version,
    },
};

const assertToolVersion = async (
    customOptions: AssertToolVersionOptions,
    description?: string
): Promise<ToolVersionAssertionResult> => {
    const options = {
        ...defaultOptions,
        ...customOptions,
    };
    const { tool, version } = options;

    if (!tool) {
        throw new Error("Please specify a tool to check.");
    }

    if (!(tool in tools)) {
        throw new Error("The specified tool is not supported.");
    }

    const { matcher, argumentVector } = tools[tool];

    let execution = null;
    try {
        execution = await execute(tool, argumentVector);
    } catch {}

    return {
        type: "assert-tool-version",
        success:
            Boolean(execution) && matcher(execution.standardOutput, version),
        description,
        time: BigInt(-1),
        options,
    };
};

export default assertToolVersion;
