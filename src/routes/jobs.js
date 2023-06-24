import express from 'express';
import mongoose from 'mongoose';
import { JobModel } from "../models/Jobs.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import { useCookies } from 'react-cookie';
import { getAllJobs, getJobById, addJob, updateJob, deleteJob, applyJob, appliedIdJob, allAppliedJobs, searchJob } from '../controllers/jobsController.js';

const router = express.Router();



router.get("/", getAllJobs);
router.post("/", addJob);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.put("/", applyJob);
router.get("/appliedjobs/ids/:userId", appliedIdJob);
router.get("/appliedjobs/:userId", allAppliedJobs);
router.get("/jobs?q=${}", searchJob);

export { router as jobsRouter }