const mongoose = require("mongoose");
const User = require("../models/userModel");

const product = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Enter name of the product"]
    },
    description : {
        type : String,
        required : [true, "Enter description of the product"]
    },
    price : {
        type : Number, 
        required : [true, "Enter price of the product"],
        maxLength : [6, "Max length can be 6"]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [{
        publicId : {
            type : Number,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }],

    category : {
        type : String,
        required : [true, "enter category"]
    },
    stock : {
        type : Number,
        required : [true, "Enter stock"],
        default : 1,
        maxLength : 3,
    }, 

    numberOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [{
        userId : {
            type : mongoose.Schema.ObjectId,
            ref : User,
            required : true,
        },
        name : {
            type : String,
            required: true,
        },
        rating : {
            type : Number,
            required : true
        },
        comment : {
            type : String
        }
    }],

    userId : {
        type : mongoose.Schema.ObjectId,
        ref : User,
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Product", product);