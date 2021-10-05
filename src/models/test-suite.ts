/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
const { Schema } = mongoose;

const testSchema = new Schema({
    title: {
        type: String,
        maxlength: 1024,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        maxlength: 2048,
        trim: true,
    },
});

const testSuiteSchema = new Schema(
    {
        title: {
            type: String,
            maxlength: 1024,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            maxlength: 2048,
            trim: true,
        },
        handle: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        tests: {
            type: [testSchema],
        },
        tags: {
            type: [String],
        },
    },
    { timestamps: true }
);

export default mongoose.model("TestSuite", testSuiteSchema);
