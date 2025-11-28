const Todo = require("../models/TodoModel");

const createTodo = async (req, res, next) => {
  try {
    const todoData = { ...req.body, userId: req.user.id };
    const newTodo = await Todo.create(todoData);

    res.status(201).json({
      message: "success",
      data: newTodo.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todoData = await Todo.selectByUserId(req.user.id);

    res.status(200).json({ message: "success", data: todoData.rows });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const existingTodo = await Todo.selectById(todoId, req.user.id);

    if (!existingTodo.rows.length) {
      return res.status(404).json({ error: "todo not found" });
    }

    const todoData = { ...req.body, todoId: todoId, userId: req.user.id };
    const updatedTodo = await Todo.update(todoData);

    res.status(200).json({
      message: "success",
      data: updatedTodo.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const existingTodo = await Todo.selectById(todoId, req.user.id);
    if (!existingTodo.rows.length) {
      return res.status(404).json({ error: "todo not found" });
    }

    await Todo.delete(todoId, req.user.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
