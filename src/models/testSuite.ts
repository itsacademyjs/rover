import mongoose from "mongoose";
const { Schema } = mongoose;

const testCaseSchema = new Schema({
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
        testCases: {
            type: [testCaseSchema],
        },
    },
    { timestamps: true }
);

export default mongoose.model("TestSuite", testSuiteSchema);
