const express = require("express");
const { put } = require("../app");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated, getAllProducts);
router.route("/products/newProduct").post(createProduct);
router.route("/products/updateProduct/:id").put(updateProduct);
router.route("/products/deleteProduct/:id").delete(deleteProduct).get(getProductDetails);

module.exports = router;