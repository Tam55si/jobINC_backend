import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { jobsRouter } from "./routes/jobs.js";
import { blogsRouter } from "./routes/blogs.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/jobpost", jobsRouter); //postjobs
app.use("/blogs", blogsRouter);
// app.use("/jobsdash", deleteRouter);

const PORT = 3002 || process.env.PORT
const DB_URL = process.env.DATABASE_URL;

mongoose.connect("mongodb+srv://tanmoy:sony123@jobinc-data.o1uh43h.mongodb.net/jobinc-data?retryWrites=true&w=majority")

    .then(() => console.log("Connected To Database"))

    .catch((err) => console.log(err));


app.listen(PORT, () => console.log(`SERVER STARTED! on ${PORT}`));