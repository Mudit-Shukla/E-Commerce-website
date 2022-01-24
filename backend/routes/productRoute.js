const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated, authorizeRole("user"), getAllProducts);
router.route("/products/newProduct").post(isAuthenticated, authorizeRole("user"), createProduct);
router.route("/products/updateProduct/:id").put(isAuthenticated, authorizeRole("Admin"), updateProduct);
router.route("/products/deleteProduct/:id").delete(isAuthenticated, authorizeRole("Admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/products/review").put(isAuthenticated, createProductReview);
router.route("/reviews").get(getAllReviews);
router.route("/deleteReview").delete(deleteReview);


module.exports = router;