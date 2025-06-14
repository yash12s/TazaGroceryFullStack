import Address from "../models/Address.js";

// add address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId = req.userId; 
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({ success: false, message: "Address is missing" });
        }

        await Address.create({ ...address, userId });
        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log(" Add Address Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// get address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId; 

        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(" Get Address Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
