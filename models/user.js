import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true,

    }
}, { timestamps: true })


 
const userModel = mongoose.model("User",userSchema);
export default userModel;
