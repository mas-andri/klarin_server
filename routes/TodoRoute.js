const { Router } = require("express");
const router = Router();
const TodoController = require("../controllers/TodoController");
const restrict = require("../middlewares/restrict");
const validate = require("../middlewares/validate");

const {
  createTodoSchema,
  updateTodoSchema,
} = require("../validators/TodoValidation");

// Protected route
router.get("/", restrict, TodoController.getTodo);
router.post(
  "/create",
  restrict,
  validate(createTodoSchema),
  TodoController.createTodo
);
router.put(
  "/:todoId",
  restrict,
  validate(updateTodoSchema),
  TodoController.updateTodo
);
router.delete("/:todoId", restrict, TodoController.deleteTodo);

module.exports = router;
