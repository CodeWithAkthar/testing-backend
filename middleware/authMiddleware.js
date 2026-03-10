import jwt, { decode } from "jsonwebtoken"
import dotenv from 'dotenv'

export const authMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization;
    console.log(process.env.JWT_SECRET_KEY);
    

    if (!token) {
        return res.status(500).json({ message: "No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}