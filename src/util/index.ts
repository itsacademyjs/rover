/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from "fs";
export * from "./executor";

const readJSONFile = async (path): Promise<any> => {
    const json = await fs.promises.readFile(path, {
        encoding: "utf8",
    });
    const object = JSON.parse(json);
    return object;
};

export { readJSONFile };
