const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated, authorizeRole("user"), getAllProducts);
router.route("/products/newProduct").post(isAuthenticated, authorizeRole("user"), createProduct);
router.route("/products/updateProduct/:id").put(isAuthenticated, authorizeRole("Admin"), updateProduct);
router.route("/products/deleteProduct/:id").delete(isAuthenticated, authorizeRole("Admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/product/review").put(isAuthenticated, createProductReview);

module.exports = router;