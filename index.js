require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const logger = require("morgan");
const passport = require("./lib/passport");

const AuthRoute = require("./routes/AuthRoute");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(AuthRoute);

// 404 url error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "URL not found" });
});

// error handler
app.use(function (err, req, res, next) {
  if (
    err.message === "email already exist" ||
    err.message === "User not found"
  ) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);
