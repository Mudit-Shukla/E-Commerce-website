const express = require("express");
const { newOrder, getOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, authorizeRole("user"), newOrder);
router.route("/order/:id").get(isAuthenticated, authorizeRole("Admin"), getOrderDetails);
router.route("/order/myOrders").get(isAuthenticated, myOrders);
router.route("/admin/orders").get(isAuthenticated, authorizeRole("Admin"), getAllOrders)
router.route("/admin/order/:id").put(isAuthenticated, authorizeRole("Admin"), updateOrder).delete(isAuthenticated, authorizeRole("Admin"), deleteOrder);

module.exports = router;