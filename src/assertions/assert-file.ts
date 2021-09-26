import fs from "fs";

import { AssertFileOptions, FileAssertionResult } from "../types";

const defaultOptions = {
    path: "",
    regular: false,
};

const assertFile = async (
    customOptions: AssertFileOptions,
    description?: string
): Promise<FileAssertionResult> => {
    const options = { ...defaultOptions, ...customOptions };
    const { path } = options;

    let success = false;
    try {
        await fs.promises.access(path);
        success = true;
    } catch {}

    return {
        type: "assert-file",
        success,
        description,
        time: BigInt(-1),
        options,
    };
};

export default assertFile;
