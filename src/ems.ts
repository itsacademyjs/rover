import { Command } from "commander";
import chalk from "chalk";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { SyncConfiguration } from "./types";
import { TestSuite } from "./models";

const syncExercises = async (
    configuration: SyncConfiguration
): Promise<void> => {
    const file = configuration.file ?? "meta.json";
    const rawData = readFileSync(file);
    const data = JSON.parse(String(rawData)).suites[0].suites.map((suite) => ({
        title: suite.title,
        description: suite.description,
        handle: suite.handle,
        testCases: suite.tests.map((test) => ({
            title: test.title,
            description: test.description,
        })),
    }));
    const updateQueries = data.map((item) => ({
        updateOne: {
            filter: {
                handle: item.handle,
            },
            update: {
                $set: item,
            },
            upsert: true,
        },
    }));

    try {
        mongoose.connect("mongodb://localhost:27017/test");
        await TestSuite.bulkWrite(updateQueries);
        console.log("Exercises synced");
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
    process.exit();
};

const configureCommands = (): Command => {
    const program = new Command();
    program.version("0.1.0");

    const syncCommand = new Command();
    syncCommand
        .name("sync")
        .argument("[file]", "the json file generated by meta command", null)
        .alias("s")
        .description("sync exercises with the database")
        .action(async (file: string | null) => {
            const configuration = {
                file,
                ...program.opts(),
                ...syncCommand.opts(),
            } as SyncConfiguration;
            await syncExercises(configuration);
        });
    program.addCommand(syncCommand);

    return program;
};

const packageData = require("../../package");

const main = () => {
    console.log(
        chalk.bold(
            `rover ${packageData.version} ${chalk.greenBright(
                "(https://academyjs.com/rover)"
            )}`
        )
    );
    const program = configureCommands();
    program.parse(process.argv);
};

export { main };
