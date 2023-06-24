import { JobModel } from "../models/Jobs.js";
import { UserModel } from "../models/Users.js";

export const getAllJobs = async (req, res, next) => {
    let jobs;
    try {
        jobs = await JobModel.find({});
    } catch (err) {
        console.log(err);
    }

    if (!jobs) {
        return res.status(404).json({ message: "No Jobs Posted" });
    }
    return res.status(200).json({ jobs });
};

export const getJobById = async (req, res, next) => {
    const id = req.params.id;
    let job;
    try {
        job = await JobModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "No Job found" });
    }
    return res.status(200).json({ job });
};

// export const addJob = async (req, res, next) => {
//     const { imageUrl, title, postDate, location, description, company, level, type, work } = req.body;
//     let job;
//     try {
//         job = new JobModel({
//             imageUrl,
//             title,
//             postDate,
//             location,
//             description,
//             company,
//             level,
//             type,
//             work,
//         });
//         await job.save();
//     } catch (err) {
//         console.log(err);
//     }

//     if (!job) {
//         return res.status(500).json({ message: "Unable To Add Job" });
//     }
//     return res.status(201).json({ job });
// };

export const addJob = async (req, res, next) => {
    const job = new JobModel(req.body);
    try {
        const response = await job.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

export const updateJob = async (req, res, next) => {
    const id = req.params.id;
    const { imageUrl, title, postDate, location, description, company, level, type, work } = req.body;
    let job;
    try {
        job = await JobModel.findByIdAndUpdate(id, {
            imageUrl,
            title,
            postDate,
            location,
            description,
            company,
            level,
            type,
            work,
        });
        job = await job.save();
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "Unable To Update Job" });
    }
    return res.status(200).json({ job });
};

// export const updateJob = async (req, res, next) => {
//     const id = req.params.id;
//     const job = JobModel(req.body);
//     try {
//         const response = await job.findByIdAndUpdate(id);
//         res.json(response);
//     } catch (err) {
//         res.json(err);
//     }
// };

export const deleteJob = async (req, res, next) => {
    const id = req.params.id;
    let job;
    try {
        job = await JobModel.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "Unable To Delete Job" });
    }
    return res.status(200).json({ message: "Job Successfully Deleted" });
};




export const applyJob = async (req, res, next) => {
    const job = await JobModel.findById(req.body.jobID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.appliedJobs.push(job);
        await user.save();
        res.status(201).json({ appliedJobs: user.appliedJobs });
    } catch (err) {
        res.status(500).json(err);
    }
};



export const appliedIdJob = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ appliedJobs: user?.appliedJobs });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


// export const savedJobs = async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.userId);
//         const appliedJobs = await JobModel.find({
//             _id: { $in: user.appliedJobs },
//         });

//         console.log(appliedJobs);
//         res.status(201).json({ appliedJobs });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };
export const allAppliedJobs = async (req, res) => {
    try {
        const job = await JobModel.findById(req.body.jobID);
        const user = await UserModel.findById(req.body.userID);
        user.appliedJobs.push(job);
        await user.save();
        res.json({ appliedJobs: user.appliedJobs });

    } catch (err) {
        res.json(err);
    }
}

export const searchJob = async (req, res) => {
    const jobs = parseInt(req.query.q);
    const search = req.query.search || "";
    const level = req.query.level || "ALL";

    const levelOptions = [
        "Fresher",
        "Intermideate",
        "Senior",
        "Advanced"
    ];
    level === "ALL"
        ? (level = [...levelOptions])
        : (level = req.query.level.split(","));
    try {

        JobModel.find({ title: { $regex: search, $options: "i" } })
            .then((items) => {
                res.json(items);
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}




// exports.getAllJobs = getAllJobs;
// exports.addJob = addJob;
// exports.getJobById = getJobById;
// exports.updateJob = updateJob;
// exports.deleteJob = deleteJob;

// module.exports = { getAllJobs, getJobById, addJob, updateJob, deleteJob }