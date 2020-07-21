const jwt = require("jsonwebtoken");
const DB = require("../db/db");
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
        var userValues;
        DB.query("SELECT * FROM Utilisateur WHERE email = $1", [decoded.email])
          .then((data) => (userValues = data.rows[0]))
          .then(() => {
            let userRes = {
              id: userValues.id,
              nom: userValues.nom,
              email: userValues.email,
              delaiFixe: userValues.delaifixe,
            };
            res.status(200).json({ user: userRes });
          });
      } else {
        reject(new Error("Error occured during verifying token"));
      }
    });
  });
};

module.exports = {
  createToken,
  checkToken,
};
