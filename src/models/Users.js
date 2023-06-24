import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    emailid: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accounttype: { type: String, required: true },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
});

export const UserModel = mongoose.model("users", UserSchema);