import { execute } from "../util";
import {
    ValidatorFunction,
    NodeValidatorOptions,
    Configuration,
} from "../types";

const validate: ValidatorFunction = async (
    options: NodeValidatorOptions,
    configuration: Configuration
): Promise<boolean> => {
    if (options.nodeVersion) {
        const execution = await execute("node", ["--version"]);
        if (execution.standardOutput.trim() !== options.nodeVersion) {
            return false;
        }
    }

    return true;
};

export default validate;
