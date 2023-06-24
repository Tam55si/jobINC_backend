import express from 'express';
import mongoose from 'mongoose';
import { BlogModel } from '../models/Blogs.js';
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import { useCookies } from 'react-cookie';
import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../controllers/blogsController.js';

const router = express.Router();



router.get("/", getAllBlogs);
router.post("/", addBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export { router as blogsRouter }