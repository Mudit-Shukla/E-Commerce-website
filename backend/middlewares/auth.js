const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(() => {
            console.log("please login to access the resource")
        });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        console.log(roles);
        console.log(req.user);
        if(!roles.includes(req.user.role))
            return next(() => {
                console.log("Sorry you are not authorized for the requested resource");
            })
        next();
    }
}