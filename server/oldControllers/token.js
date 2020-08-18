const jwt = require("jsonwebtoken");
const Queries = require("../db/queries");
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

const checkToken = (req, res) => {
  const headers = req.headers.authorization;
  const token = headers.replace("Bearer ", "");

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if (err) {
        reject(err);
      } else if (decoded) {
        Queries.findUser(decoded).then((data) => {
          resolve(res.status(200).json({ user: data }));
        });
      } else {
        reject(new Error("Error occured during verifying token"));
      }
    });
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
  // checkToken,
  verifyToken,
};
