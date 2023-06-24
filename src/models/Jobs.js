import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    postDate: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    level: { type: String, required: true },
    type: { type: String, required: true },
    work: { type: String, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const JobModel = mongoose.model("jobs", JobSchema);