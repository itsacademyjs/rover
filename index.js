const readline = require("readline");

const readInput = (message) =>
    new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(message, (answer) => {
            resolve(answer);
            rl.close();
        });
    });

const factorial = (n) => {
    let result = 1;
    for (let i = 1; i <= n; i += 1) {
        result *= i;
    }
    return result;
};

const main = async () => {
    const input = parseInt(await readInput("Enter an integer: "), 10);
    console.log(factorial(input));
};

main();
