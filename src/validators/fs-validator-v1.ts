import { ValidatorFunction, FSValidatorOptions, Configuration } from "../types";
import fs from "fs";

const defaultOptions = {
    exists: [],
};

const validate: ValidatorFunction = async (
    customOptions: FSValidatorOptions,
    configuration: Configuration
): Promise<boolean> => {
    const options = { ...defaultOptions, ...customOptions };

    for (const path of options.exists) {
        try {
            await fs.promises.access(path);
        } catch (error) {
            return false;
        }
    }
    return true;
};

export default validate;
