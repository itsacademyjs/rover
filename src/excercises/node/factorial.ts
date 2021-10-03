suite(
    "Calculate the factorial of a given integer.",
    "node/factorial",
    `Factorial of a non-negative integer, is multiplication of all integers smaller than or equal to n.
For example factorial of 6 is 6 * 5 * 4 * 3 * 2 * 1 which is 720.

Factorial can be calculated iteratively or recursively. You can solve using any approach.`
);

import fs from "fs";
import AssertionError from "assertion-error";
import assert from "assert";

import locals from "import-locals";
import { beforeEach } from "../../driver/mocha";

const fileExists = async (path: string, message?: string): Promise<void> => {
    let success = false;
    try {
        await fs.promises.access(path);
        success = true;
    } catch {
        throw new AssertionError(message);
    }
};

test(
    "Write the program in 'factorial.js'",
    "This is a huge description.",
    async () => {
        await fileExists("factorial.js", "Cannot find file `factorial.js`");
    }
);

let factorial = null;
let temporary = null;
beforeEach(() => {
    (locals as any).export(process.cwd() + "/factorial.js", "factorial");

    factorial = require(process.cwd() + "/factorial.js").factorial;
    temporary = process.stdout.write;
});

declare const afterEach;

afterEach("hello", () => {
    (locals as any).unexport(process.cwd() + "/factorial.js", "factorial");
});

test("Calculate the factorial of 5", "This is a huge description.", () => {
    const actual = factorial(5);
    assert.equal(actual, 120, "5! = 120");
});

test("Calculate the factorial of 6", "This is a huge description.", () => {
    const actual = factorial(6);
    assert.equal(actual, 720, "6! = 720");
});
