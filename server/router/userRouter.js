const express = require("express"),
  userRouter = express.Router();
const User = require("../models/user");

userRouter.post("/signup", User.signup);
userRouter.post("/login", User.signin);

module.exports = userRouter;
