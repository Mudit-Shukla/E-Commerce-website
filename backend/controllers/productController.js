const Product = require("../models/productModel");

// CREATE PRODUCT 
exports.createProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        success : true,
        newProduct
    })
}


exports.getAllProducts = async (req, res) => {
    const products = await Product.find(); 
    res.status(201).json({
        success : true,
        products
    })
}