import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { cartItems } = req.body;

        if (!cartItems) {
            return res.status(400).json({ success: false, message: "Cart items missing" });
        }

        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(" ERROR IN UPDATE CART:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
