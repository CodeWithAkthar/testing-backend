import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import AppError from "./utils/AppError.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Something went wrong",
    });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
