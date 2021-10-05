/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import locals from "import-locals";
import { fileExists, strictEqual } from "../../assertions";

suite({
    title: "Calculate the factorial of a given integer.",
    handle: "node/factorial",
    description: `Factorial of a non-negative integer, is multiplication of all integers smaller than or equal to n.
For example factorial of 6 is 6 * 5 * 4 * 3 * 2 * 1 which is 720.

Factorial can be calculated iteratively or recursively. You can solve using any approach.`,
    tags: ["node", "javascript", "js", "factorial"],
});

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

afterEach(() => {
    (locals as any).unexport(process.cwd() + "/factorial.js", "factorial");
});

test("Calculate the factorial of 5", "This is a huge description.", () => {
    const actual = factorial(5);
    strictEqual(actual, 120, "factorial(5) should return 120");
});

test("Calculate the factorial of 6", "This is a huge description.", () => {
    const actual = factorial(6);
    strictEqual(actual, 720, "factorial(6) should return 720");
});
