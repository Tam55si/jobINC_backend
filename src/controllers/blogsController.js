import { BlogModel } from '../models/Blogs.js';
import { UserModel } from "../models/Users.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await BlogModel.find({});
    } catch (err) {
        console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Posted" });
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
    const blog = new BlogModel(req.body);
    try {
        const response = await blog.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

export const updateBlog = async (req, res, next) => {
    const id = req.params.id;
    const { cover, title, summary, content } = req.body;
    let blog;
    try {
        blog = await BlogModel.findByIdAndUpdate(id, {
            cover,
            title,
            summary,
            content


        });
        blog = await blog.save();
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Update Blog" });
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Delete Blog" });
    }
    return res.status(200).json({ message: "Blog Successfully Deleted" });
};