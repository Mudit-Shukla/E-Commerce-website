const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, getAllUser, getSingleUserDetails, updateProfile } = require("../controllers/userController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/changePassword").put(isAuthenticated, updatePassword);
router.route("/me/updateProfile").put(isAuthenticated, updateProfile);
router.route("/admin/users").get(isAuthenticated, authorizeRole("user"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRole("user"), getSingleUserDetails);


module.exports = router;