const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSuiteSchema = new Schema(
    {
        title: {
            type: String,
            maxlength: 1024,
            trim: true,
        },
        description: {
            type: String,
            maxlength: 10240,
            trim: true,
        },
        handle: {
            type: String,
            trim: true,
            required: true,

            unique: true,
        },
        testCases: {
            type: [
                {
                    title: {
                        type: String,
                        maxlength: 1024,
                        trim: true,
                    },
                    description: {
                        type: String,
                        maxlength: 10240,
                        trim: true,
                    },
                },
            ],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestSuite", testSuiteSchema);
