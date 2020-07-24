const express = require("express"),
  userRouter = express.Router();
const Login = require("../controllers/login");
const Register = require("../controllers/register");
const User = require("../controllers/user");

/**
 * LISTING ALL ROUTES
 */
userRouter.post("/signup", Register.signup);
userRouter.post("/login", Login.signin);
userRouter.post("/checkToken", User.getUser);
userRouter.post("/editUser/:id", User.editUser);

module.exports = userRouter;
