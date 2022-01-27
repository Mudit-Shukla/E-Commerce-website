const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt : Date.now(), user : req.user._id
    });

    res.status(201).json({
        success : true,
        order,
    })
})

// *********** ORDER DETAILS ************* //
exports.getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(() => console.log("order not found"));
    }

    res.status(200).json({
        success : true,
        order,
    })
})

// ********** GET MY ORDERS FOR LOGGED IN USER ********* //
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user : req.user._id})

    res.status(200).json({
        success : true,
        orders,
    })
})