const express = require("express");
const { newOrder } = require("../controllers/orderController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, authorizeRole("user"), newOrder);

module.exports = router;