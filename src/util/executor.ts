/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import childProcess from "child_process";
import { Buffer } from "buffer";

import { ExecuteOptions, Execution } from "../types";

const defaultOptions = {
    standardOutputLimit: 64 * 1024,
    standardOutputEncoding: "utf8",
    standardErrorLimit: 64 * 1024,
    standardErrorEncoding: "utf8",
    standardInput: "",
    timeout: undefined,
};

const execute = (
    executable: string,
    argumentVector: string[],
    customOptions: ExecuteOptions = {}
): Promise<Execution> => {
    const options = { ...defaultOptions, ...customOptions };
    return new Promise((resolve, reject) => {
        const standardOutput = Buffer.alloc(options.standardOutputLimit);
        let standardOutputOffset = 0;
        const standardError = Buffer.alloc(options.standardErrorLimit);
        let standardErrorOffset = 0;
        let reason = "success";

        const spawnedProcess = childProcess.spawn(executable, argumentVector, {
            timeout: options.timeout,
            killSignal: "SIGKILL",
        });
        spawnedProcess.stdout.on("data", (data) => {
            const written = standardOutput.write(
                data.toString("Utf8"),
                standardOutputOffset,
                "utf8"
            );

            if (written !== data.length) {
                reason = "standard_output_exceeded";
                /* SECURITY NOTE: SIGTERM can be caught by the child process. A malicious code can
                 * thus evade forced termination.
                 */
                spawnedProcess.kill("SIGKILL");
            }

            standardOutputOffset += written;
        });

        spawnedProcess.stderr.on("data", (data) => {
            const written = standardError.write(
                data.toString("utf8"),
                standardErrorOffset,
                "utf8"
            );

            // Ensure process is still running before killing!
            if (written !== data.length) {
                reason = "standard_error_exceeded";
                spawnedProcess.kill("SIGKILL");
            }

            standardErrorOffset += written;
        });

        spawnedProcess.on("exit", (exitCode, signal) => {
            const result = {
                exitCode,
                standardOutput: standardOutput.toString(
                    "utf8",
                    0,
                    standardOutputOffset
                ),
                standardError: standardError.toString(
                    "utf8",
                    0,
                    standardErrorOffset
                ),
                reason,
                signal,
            };
            resolve(result);
        });

        spawnedProcess.on("error", (error) => {
            reject(error);
        });

        if (options.standardInput) {
            /* The newline ensures that someone reading from the standard input does not wait
             * forever.
             */
            spawnedProcess.stdin.write(options.standardInput + "\n");
            spawnedProcess.stdin.end();
        }
    });
};

export { execute };
