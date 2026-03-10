import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const emailExist = await userModel.findOne({ email });

    if (emailExist) {
        throw new AppError("Email already exists", 400);

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        password: hashedPassword
    });

    res.json({
        message: "User created successfully",
        user
    });


}
)

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
};
