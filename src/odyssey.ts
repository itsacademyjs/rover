/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command } from "commander";
import chalk from "chalk";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import lodash from "lodash";
import { TestSuite } from "./models";
import { extractMeta } from ".";

dotenv.config();
const { DATABASE_URL } = process.env;

const syncExercises = async (): Promise<void> => {
    const { suites } = await extractMeta();
    const handles = Object.keys(suites);
    const data = handles.map((handle) => ({
        title: suites[handle].title,
        description: suites[handle].description,
        handle: suites[handle].handle,
        tests: suites[handle].tests.map((test) => ({
            title: test.title,
            description: test.description,
        })),
        tags: suites[handle].tags,
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
        mongoose.connect(DATABASE_URL);
        await TestSuite.bulkWrite(updateQueries);
        console.log("Exercises synced");
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
};

const packageData = require("../../package");

const configureCommands = (): Command => {
    const program = new Command();
    program.version(packageData.version);

    const syncCommand = new Command();
    syncCommand
        .name("sync")
        .alias("s")
        .description("sync exercises with the database")
        .action(async () => {
            await syncExercises();
        });
    program.addCommand(syncCommand);

    return program;
};

const main = () => {
    console.log(
        chalk.bold(
            `odyssey ${packageData.version} ${chalk.greenBright(
                "(https://academyjs.com/odyssey)"
            )}`
        )
    );
    const program = configureCommands();
    program.parse(process.argv);
};

export { main };
