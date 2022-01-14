const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path : "backend/config/config.env"});

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKING on ${process.env.PORT}`);
})