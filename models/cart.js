import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true

    },
    items: [{
        productName: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },
    }]

}

    , {
        timestamps: true
    }
)


const cartModel = mongoose.model("cart", cartSchema)


export default cartModel; 