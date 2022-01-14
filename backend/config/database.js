const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/Ecommerce").then((data)=>{
    console.log("database connected succesfully");
    console.log();
}).catch((err) => {
    console.log(err);
})
}

module.exports = connectDatabase;