export default {
    handle: "node/hello-world",
    statement: `
The Hello World program is a program that prints "Hello, world!". It is very simple in most
programming languages, and is used to show the basic syntax of a programming language.

Write a program to print "Hello, world!" on the console.

Example run:
\`\`\`
$ node index.js
Hello, world!⏎
\`\`\`
`,
    test: async (context) => {
        const { assertFile, assertStreams, assertToolVersion } = context;

        assertFile("index.js", "Write the program in `index.js`");

        assertStreams(
            "index.js",
            {
                expectedOutput: "Hello, world!\n",
            },
            'Print the message "Hello, world!⏎" on the console.'
        );

        assertToolVersion("node", ">=10.0");
    },
};
