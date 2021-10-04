/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileExists, spawnPrints } from "../../assertions";

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

test(
    "Write the program in 'hello.js'",
    "This is a huge description.",
    async () => {
        await fileExists("hello.js", "Cannot find file 'hello.js'");
    }
);

test("Print 'Hello, world!\\n' to the standard output stream", "", async () => {
    await spawnPrints(
        "node hello.js",
        "",
        "Hello, world!\n",
        "",
        "Print 'Hello, world!\n' to using `console.log`"
    );
});
