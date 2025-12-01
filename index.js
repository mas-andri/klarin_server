require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const logger = require("morgan");
const passport = require("./lib/passport");
const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("./swagger.json");
const cors = require("cors");

const AuthRoute = require("./routes/AuthRoute");
const TodoRoute = require("./routes/TodoRoute");

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/user", AuthRoute);
app.use("/todo", TodoRoute);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

// 404 url error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "URL not found" });
});

// error handler
app.use(function (err, req, res, next) {
  const knownErrors = [
    "email already exist",
    "invalid email or password",
    "no fields to update",
  ];

  if (knownErrors.includes(err.message)) {
    return res.status(400).json({ error: err.message });
  }

  console.log("Error Message", err.message);
  return res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);
