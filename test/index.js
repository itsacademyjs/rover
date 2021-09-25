require("dotenv").config({
    path: `${__dirname}/../.env.test`,
});
require("chai/register-assert");

const mongoose = require("mongoose");

const server = require("../app/app");

before(() => {
    mongoose.connection.on("error", console.error.bind(console, " ❌ "));
    mongoose.connect(process.env.TEST_DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
});

beforeEach(async function () {
    await mongoose.connection.dropDatabase();
    this.currentTest.app = server.initialize();
});

afterEach(function () {
    this.currentTest.app = null;
    server.destroy();
});

after(async () => {
    await mongoose.disconnect();
});
