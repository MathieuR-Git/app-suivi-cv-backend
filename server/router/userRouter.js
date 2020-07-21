const express = require("express"),
  userRouter = express.Router();
const User = require("../models/user");
const token = require("../models/token");

userRouter.post("/signup", User.signup);
userRouter.post("/login", User.signin);
userRouter.post("/checkToken", token.checkToken);

module.exports = userRouter;
