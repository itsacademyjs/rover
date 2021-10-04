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

export default mongoose.model("TestCase", testCaseSchema);
