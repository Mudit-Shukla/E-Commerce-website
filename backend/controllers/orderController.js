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

// *********** PARTICULAR ORDER DETAILS ************* //
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

// ********* GET ALL ORDERS FOR ADMIN  ********** //
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success : true,
        orders, 
        totalAmount
    })
})

// ********* UPDATE ORDER STATUS *********** //
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(() => console.log("No order found"));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(() => console.log("Order already delivered"));
    }
  
    if (req.body.status === "Shipped") {
      order.orderedItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });

  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // ********** DELETE ORDER *********** //
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(() => console.log("No order find"));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });