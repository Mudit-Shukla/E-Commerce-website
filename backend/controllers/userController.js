const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// *********  REGISTER USER  **********//

exports.registerUser = catchAsyncErrors(async(req, res) => {

    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            publicId : "SampleID",
            url : "SampleURL",
        },
    });

    sendToken(user, 201, res);

});

     // ******** LOGIN USER  ******** //
exports.loginUser = catchAsyncErrors (async (req, res, next) => {

    const{email, password} = req.body;

    if(!email || !password)
        return next();

    const user = await User.findOne({email : email}).select("+password");
    console.log(user);

    if(!user){
        console.log("user not found");
        return next();
    }

    const isPasswordMatched = user.comparePassword(password);
    
    if(!isPasswordMatched){
        console.log("password not matched");
        return next();
    }

    sendToken(user, 200, res);
 })

 // **********  LOGOUT USER  ********* //
 exports.logoutUser = catchAsyncErrors((req, res, next) => {
    res.clearCookie("token");
    return res.status(200).json({
        success : true,
        message : "Successfully logged out"
    })
 })

// ***********  FORGOT PASSWORD ********* //
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email});

    if(!user){
        return next(() => console.log("User not found"));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave : false});

    // req.protocal -> http || htpps 
    // req.get("host") -> localhost || online server or url
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/resetPassword/${resetToken}`;

    const message = `Your password rest token is : \n\n
                ${resetPasswordUrl}\n\n
                If you have not requested to change your password ignore the email`;

                console.log("reset token generated");

    try{
        await sendEmail({
            email : user.email,
            subject : "Ecommerce website Password Reset",
            message,
        });

        console.log("mail sent");

        res.status(200).json({
            success : true,
            message : `Email sent to ${user.email} successfully`,
        })

    }catch(error){

        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave : false});
        return next(() => console.log("Error occured. Could not be processed")); 

    }

})