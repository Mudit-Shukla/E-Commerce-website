const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            type : String,
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
});

user.pre("save", async function(next){

    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);    
    }
    next();
 })


 // *******  JWT  TOKEN   ******** //
 user.methods.getJWTToken = function(){
     return jwt.sign({
        id : this._id,
     },
     process.env.JWT_SECRET, {
         expiresIn : process.env.JWT_EXPIRY,
     })
 }

module.exports = mongoose.model("User", user);