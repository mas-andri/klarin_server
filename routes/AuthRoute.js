const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/AuthController");
const restrict = require("../middlewares/restrict");
const validate = require("../middlewares/validate");

const {
  signupSchema,
  loginSchema,
  updateUserSchema,
} = require("../validators/AuthValidator");

// Public route
router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/login", validate(loginSchema), AuthController.login);

// Protected route
router.put(
  "/:userId",
  restrict,
  validate(updateUserSchema),
  AuthController.updateUser
);
router.delete("/:id", restrict, AuthController.deleteUser);

module.exports = router;
