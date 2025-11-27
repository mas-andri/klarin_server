const db = require("../lib/db");

const User = {
  selectUserByEmail: async (email) => {
    return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  },

  create: async (data) => {
    return await db.query(
      `INSERT INTO users (fullname, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, fullname, email`,
      [data.fullname, data.email, data.password]
    );
  },

  update: async ({ ...data }) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.fullname) {
      fields.push(`fullname = $${index++}`);
      values.push(data.fullname);
    }

    if (data.password) {
      fields.push(`password = $${index++}`);
      values.push(data.password);
    }

    // Require at least 1 field to update
    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(data.id);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING id, fullname, email;
    `;

    return db.query(query, values);
    // if (data.password) {
    //   return await db.query(
    //     `UPDATE users SET fullname = $1, password = $2 WHERE email = $3`,
    //     [data.fullname, data.password, data.email]
    //   );
    // }
    // return await db.query(`UPDATE users SET fullname = $1 WHERE email = $2`, [
    //   data.fullname,
    //   data.email,
    // ]);
  },

  delete: async (id) => {
    return await db.query(`DELETE FROM users WHERE id = $1 RETURNING email`, [
      id,
    ]);
  },
};

module.exports = User;
