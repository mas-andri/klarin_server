const db = require("../lib/db");

const Todo = {
  selectById: async (todoId, userId) => {
    return await db.query(
      `SELECT * FROM todo_list WHERE id = $1 AND user_id = $2`,
      [todoId, userId]
    );
  },

  selectByUserId: async (userId) => {
    return await db.query(
      `SELECT * FROM todo_list WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
  },

  create: async (data) => {
    return await db.query(
      `INSERT INTO todo_list (user_id, todo, checked)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, todo, checked, created_at, updated_at`,
      [data.userId, data.todo, data.checked]
    );
  },

  update: async (data) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.todo) {
      fields.push(`todo = $${index++}`);
      values.push(data.todo);
    }

    if (data.checked !== undefined) {
      fields.push(`checked = $${index++}`);
      values.push(data.checked);
    }

    // Require at least 1 field to update
    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(data.todoId);
    values.push(data.userId);

    const query = `
      UPDATE todo_list
      SET ${fields.join(", ")}
      WHERE id = $${index++} AND user_id = $${index}
      RETURNING id, user_id, todo, checked, created_at, updated_at;
    `;

    return db.query(query, values);
  },

  delete: async (todoId, userId) => {
    return await db.query(
      `DELETE FROM todo_list WHERE id = $1 AND user_id = $2`,
      [todoId, userId]
    );
  },
};

module.exports = Todo;
