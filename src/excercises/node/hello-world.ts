suite(
    "Print a text message on the console.",
    "node/hello-world",
    `The Hello World program is a program that prints "Hello, world!". It is very simple in most
programming languages, and is used to show the basic syntax of a programming language.

Write a program to print "Hello, world!" on the console.

Example run:
\`\`\`
$ node index.js
Hello, world!⏎
\`\`\`
`
);

import { execute } from "../../util";
import assert from "assert";

const assertOutput = async (
    command: string,
    input: string = "",
    expectedOutput: string = "",
    expectedError: string = "",
    message: string = ""
): Promise<void> => {
    if (!command) {
        throw new Error("Please specify a command to execute.");
    }

    const [executable, ...argumentVector] = command.split(" ");

    const execution = await execute(executable, argumentVector, {
        standardInput: input,
    });

    assert.strictEqual(execution.standardOutput, expectedOutput, message);
    assert.strictEqual(execution.standardError, expectedError, message);
};

test("Print 'Hello, world!\\n' to the standard output stream", "", async () => {
    await assertOutput(
        "node hello.js",
        "",
        "Hello, world!\n",
        "",
        "Print 'Hello, world!\n' to using `console.log`"
    );
});
