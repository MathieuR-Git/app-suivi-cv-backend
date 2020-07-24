const express = require("express"),
  userRouter = express.Router();
const Login = require("../models/login");
const Register = require("../models/register");
const token = require("../models/token");

/**
 * LISTING ALL ROUTES
 */
userRouter.post("/signup", Register.signup);
userRouter.post("/login", Login.signin);
userRouter.post("/checkToken", token.checkToken);

module.exports = userRouter;
