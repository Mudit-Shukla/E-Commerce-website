const express = require("express");
const { newOrder, getOrderDetails, myOrders } = require("../controllers/orderController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, authorizeRole("user"), newOrder);
router.route("/order/:id").get(isAuthenticated, authorizeRole("Admin"), getOrderDetails);
router.route("/order/myOrders").get(isAuthenticated, myOrders);


module.exports = router;