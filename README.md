# Rover by AcademyJS

Rover is a command-line tool for learning programming interactively.

As a developer, you'll work on your machine, execute commands on your terminal, and
even write code using your favorite editor. (VSCode gang where you at?) You won't use online
editors and compilers (depending on your role, of course). So why would you want to practice
coding on your browser?

Rover is a step backwards compared to other popular browser-based learning platforms.
But hear us out... As a learner, you need to build experience with setting up development
environments, fixing bugs, and other such scenarios which you will encounter on a daily basis.
Unfortunately, learning on a browser does not stimulate this. This is where Rover shines!

## Installation

We recommend you to install Rover through [npm](https://npmjs.org), which comes with
[Node.js](https://nodejs.org) when you install it.

Once you have npm installed on your system, you can install Rover:

```
npm install --global @academyjs/rover
```

You can check if Rover installed correctly by running:

```
rover --version
```

## Example

Rover comes with many exercises. For demonstration, we'll solve the Hello World exercise.

To pass the Hello World program, you need to solve the following requirements:

-   Write the program in 'hello.js'
-   Print 'Hello, world!\\n' to the standard output stream

So let's create a file called `hello.js` with the following content:

```js
console.log("Hello, world!");
```

For this demonstration, we will save the file on our Desktop. So the absolute path for Ubuntu users
is `~/Desktop/hello.js`.

Open your terminal and change the current working directory to `~/Desktop` like this:

```bash
cd ~/Desktop
```

Every exercise in Rover is identified by a handle. A handle is a unique name given to an exercise.
For example, the "node/hello-world" is the handle for the Hello World exercise.

You can now submit your solution by running:

```bash
rover submit node/hello-world
```

The output of the command is shown below:

```
rover 0.1.11 (https://academyjs.com/rover)

    ‣ node/hello-world

      ↪ Print a text message on the console.

        ✔ Print 'Hello, world!\n' to the standard output stream (67ms)

  1 passing (70ms)
```

Don't worry if the output has a few differences. That's because Rover is updated frequently.
So small changes in the output are bound to happen.

## Support

Looking for help? Write an email to [samuel@academyjs.com](mailto:samuel@academyjs.com).

## License

Rover is available under the [MIT license](https://opensource.org/licenses/MIT).
