const { findByIdAndDelete } = require("../models/productModel");
const Product = require("../models/productModel");
const TryCatch = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// CREATE PRODUCT 
exports.createProduct = TryCatch(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        success: true,
        newProduct
    })
})


exports.getAllProducts = TryCatch(async (req, res) => {
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
    const products = await apiFeatures.query;
    res.status(201).json({
        success: true,
        products
    })
})

exports.updateProduct = TryCatch(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = TryCatch(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "element not found"
        })
    } else {
        await product.remove();
        res.status(200).json({
            success: true,
            message: "product deleted"
        })
    }
})

exports.getProductDetails = TryCatch( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false,
            message : "element not found"
        })
    }
    else return res.status(200).json({
        success : true,
        product
    })
})