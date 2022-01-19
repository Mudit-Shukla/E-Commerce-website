const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"],
        maxLength : [20, "Not more than than 20 characters"],
    },
    email : {
        type : String,
        required : [true, "enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter valid email"],
    },
    password : {
        type : String,
        required : [true, "Please enter password"],
        minLength : 8,
        select : false
    },
    avatar : {
        publicId : {
            type : Number,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
       type : String,
       default : "user",
    },
})

module.exports = mongoose.model("User", user);