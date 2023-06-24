import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    cover: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const BlogModel = mongoose.model("Blog", BlogSchema);