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
    })

})