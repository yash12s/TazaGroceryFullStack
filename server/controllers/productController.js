import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

//  Add Product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        await Product.create({ ...productData, image: imagesUrl });

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(" addProduct error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Get All Products: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error(" productList error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Get Product by ID: /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error(" productById error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Change In-Stock Status: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        console.error(" changeStock error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Delete Product: /api/product/delete/:id
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(" deleteProduct error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
