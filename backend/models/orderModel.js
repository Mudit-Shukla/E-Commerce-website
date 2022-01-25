const mongoose = require("mongoose");
const run = require("nodemon/lib/monitor/run");

const Order = new mongoose.Schema({
    shipingInfo : {
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
                productId : mongoose.Schema.ObjectId,
                ref : "Product",
                required : true,
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
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
    deleiveredAt : Date,
    createdAt : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("Order", Order);