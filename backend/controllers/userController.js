const { use } = require("express/lib/application");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

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

// ********** RESET PASSWORD ********* //

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // CREATING TOKEN HASH 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user =await  User.findOne({
        resetPassword : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()},
    })

    if(!user){
        return next(() => console.log("reset password link expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(() => console.log("Password not matched"));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    sendToken(user, 200, res);
    next( () => console.log("Password changed successfully"));
})

// ********** GET USER DETAILS ********** //
exports.getUserDetails = catchAsyncErrors( async (req,res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user,
    })
})

// *********** UPDATE USER PASSWORD ************ //
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(() => console.log("Old password is not valid"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(() => console.log("Password not matched"));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

//  **********  UPDATE USER PROFILE ********* //
const updateProfile = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name : req.body.email,
        email : req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators : true,
        useFindAndModify : false,
    })
    res.status(200).json({
        success : true,
        message : "Profile updated",
        user
    })
})