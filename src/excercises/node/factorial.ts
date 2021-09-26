import { Excercise } from "../../types";

const excercise: Excercise = {
    handle: "node/factorial",

    statement: `
Factorial of a non-negative integer, is multiplication of all integers smaller than or equal to n.
For example factorial of 6 is 6 * 5 * 4 * 3 * 2 * 1 which is 720.

Factorial can be calculated iteratively or recursively. You can solve using any approach.`,

    test: (context) => {
        const { assertFile, assertOutput, assertToolVersion } = context;

        return [
            assertFile({ path: "index.js" }, "Write the program in `index.js`"),

            assertOutput(
                {
                    command: "node index.js",
                    input: "5\n",
                    expectedOutput: "Enter an integer: 120\n",
                },
                "Calculate the factorial of 5"
            ),

            assertOutput(
                {
                    command: "node index.js",
                    input: "6\n",
                    expectedOutput: "Enter an integer: 720\n",
                },
                "Calculate the factorial of 6"
            ),

            assertToolVersion(
                { tool: "node", version: "v16.9.1" },
                "Use Node v16.9.1"
            ),
        ];
    },
};

export default excercise;
