require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/AuthModel");

const maxAge = 24 * 60 * 60;

const signup = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await Users.selectUserByEmail(email);
    if (existingUser.rows.length > 0) throw new Error("email already exist");

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await Users.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "success",
      userData: createdUser.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.selectUserByEmail(email);
    if (existingUser.rows.length < 1)
      throw new Error("invalid email or password");

    // compare password
    const user = existingUser.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid email or password");

    // create token
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: maxAge,
    });

    res.status(200).json({ ...payload, accessToken });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // const { email } = req.user;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "forbidden action" });
    }

    let updateData = { ...req.body, userId };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await Users.update(updateData);

    res.status(200).json({
      message: "success",
      userData: updatedUser.rows[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ error: "forbidden action" });
    }

    await Users.delete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
};
