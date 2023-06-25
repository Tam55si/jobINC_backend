import express from 'express';



import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../controllers/blogsController.js';

const router = express.Router();



router.get("/", getAllBlogs);
router.post("/", addBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export { router as blogsRouter }