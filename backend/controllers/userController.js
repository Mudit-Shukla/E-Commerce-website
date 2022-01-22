const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");

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

    const token = user.getJWTToken();

    res.status(201).json({
        success : true,
        token
    });

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

    const token = user.getJWTToken();
    
    res.status(200).json({
        success : true,
        token,
    })
 })