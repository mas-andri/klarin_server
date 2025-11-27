const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/AuthController");
const restrict = require("../middlewares/restrict");

// Public route
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

// Protected route
router.put("/user/:id", restrict, AuthController.updateUser);
router.delete("/user/:id", restrict, AuthController.deleteUser);

module.exports = router;
