import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
    const { firstname, lastname, emailid, username, password, accounttype } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ firstname, lastname, emailid, username, password: hashedPassword, accounttype });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});
//get user by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    // const { firstname, lastname, emailid, username, password, accounttype } = req.body;
    let user;
    try {
        user = await UserModel.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ user });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};