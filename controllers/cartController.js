import cartModel from "../models/cart.js";

export const createCart = async (req, res) => {
    try {
        const { productName, quantity } = req.body;

        const data = await cartModel.create({
            items: [{
                productName,
                quantity
            }]
        });

        res.json({ message: "Cart stored", value: data });

    } catch (error) {
        res.status(500).json({ message: "Cart creation failed" });
    }
};

export const getCart = async (req, res) => {
    try {
        const cartItems = await cartModel.find();
        res.json({ message: "Success", value: cartItems });

    } catch (error) {
        res.status(500).json({ message: "Fetching cart failed" });
    }
};
