import express from "express";
import { createCart, getCart } from "../controllers/cartController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCart);
router.get("/", getCart);

export default router;
