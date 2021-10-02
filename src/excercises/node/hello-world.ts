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

test("Print 'Hello, world!\\n' to the standard output stream", "", () => {
    throw new Error();
});
test("Print 'Hello, world!\\n' to the standard output stream", "", () => {});
