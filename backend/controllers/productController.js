const { findByIdAndDelete } = require("../models/productModel");
const Product = require("../models/productModel");
const TryCatch = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// CREATE PRODUCT 
exports.createProduct = TryCatch(async (req, res) => {
    console.log(req.user)
    req.body.userId = req.user.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        success: true,
        newProduct
    })
})


exports.getAllProducts = TryCatch(async (req, res) => {

    const resultsPerPage = 10;

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
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

// ******** CREATE PRODUCT REVIEW AND UPDATE IT  ******** //
exports.createProductReview = TryCatch(async (req, res, next) => {
   
    const {rating, comment, productId} = req.body;
    const review = {
        userId : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    let isReviewed = product.reviews.find((rev) => rev.userId.toString() === req.user._id.toString())

    if(isReviewed !== undefined){
        product.reviews.forEach((rev) => {
            if(rev.userId.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }else{
        product.reviews.push(review);
    }

    product.numberOfReviews = product.reviews.length;
    let averageRating = 0;
    
    product.reviews.forEach((rev) => {
        averageRating = averageRating + rev.rating;
        console.log(averageRating);
    })

    product.ratings = (averageRating / product.numberOfReviews)

    await product.save({ validateBeforeSave : false});

        res.status(200).json({
            success : true,
            message : "Review successfully saved",
        })
})

// ********** GET ALL PRODUCT REVIEWS ********* //
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    console.log(product);
    if(!product){
        return next(() => console.log("product not found"));
    }
    res.status(200).json({
        success : true,
        reviews : product.reviews
    })
})


// ************  DELETE REVIEW ********** //
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(() => console.log("Product not found"));
    }

    const allReviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.id.toString()
    })

    product.reviews = allReviews;

    let sum = 0;
    product.reviews.forEach(rev => sum += rev.rating)
    if(product.reviews.length === 0)
        product.ratings = 0;
    else
        product.ratings = sum / product.reviews.length;
        
    product.numberOfReviews = product.reviews.length;

    await product.save({ validateBeforeSave : false});

    res.status(200).json({
        success : true,
        message : "Review successfully deleted"
    })
})