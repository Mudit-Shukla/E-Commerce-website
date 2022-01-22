const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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