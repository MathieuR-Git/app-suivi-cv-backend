const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email: user.email },
      process.env.TOKEN,
      { expiresIn: "72h" },
      (error, token) => {
        error ? reject(error) : resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      err ? reject(err) : resolve(decoded);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
