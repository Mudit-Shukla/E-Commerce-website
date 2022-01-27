const mongoose = require("mongoose");
const Product = require("../models/productModel")
const User = require("../models/userModel")

const order = new mongoose.Schema({
    shippingInfo : {
        address : {
            type : String,
            required : true,
        },
        city : {
            type : String,
            required : true,
        },
        state : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true,
            default : "India"
        },
        pinCode : {
            type : Number,
            required : true
        },
        phoneNumber : {
            type : Number,
            required : true
        }
    },

    orderedItems : [
        {
            name : {
                type : String,
                required : true, 
            },
            price : {
                type : Number,
                required : true
            },
            quntity : {
                type : Number,
                required : true,
                default : 1,
            },
            image : {
                type : String,
                required : true,
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : Product,
                required : true,
            }
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
    },
    paymentInfo : {
        id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true,
        }
    },
    paidAt : {
        type : Date,
        required : true,
    },
    itemsPrice : {
        type : Number,
        required : true,
        default : 0,
    },
    taxPrice : {
        type : Number,
        required : true,
        default : 0,
    },
    shippingPrice : {
        type : Number,
        default : 0,
        required : true,
    },
    totalPrice : {
        type : Number,
        default : 0,
        required : true,
    },
    orderStatus : {
        type : String,
        required : true,
        default : "Processing"
    },
    deliveredAt : Date,
    createdAt : {
        type : Date,
        default : Date.now(),
    }
})


module.exports = mongoose.model("Order", order);