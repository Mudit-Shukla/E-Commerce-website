const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

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

    resetPasswordToken : String,
    resetPasswordExpire : Date,
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

 //  ******** COMPARE PASSWORD  *********** //
 user.methods.comparePassword = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password)
 }

 // *********  RESET PASSWORD TOKEN GENERATION  ********** //

 user.methods.getResetPasswordToken = function(){
    
    // Generating token
    const resetToken = crypto.randomBytes(15).toString("hex") 
    // THIS WILL BE RESET PASSWORD LINK FOR THE USER
    this.resetPasswordToken = crypto.createHash("sha256").update
    (resetToken).digest("hex");
    // THIS WILL ENABLE RESET PASSWORD LINK ENABLED FOR ONLY 10 MINUTES
    this.resetPasswordExpire = Date.now() + 10 * 60 *1000

    return resetToken;
}



module.exports = mongoose.model("User", user);