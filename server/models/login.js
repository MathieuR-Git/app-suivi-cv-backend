const bcrypt = require("bcrypt");
const database = require("../db/db");
const token = require("./token");

const signin = (request, response) => {
  const userReq = request.body;
  let myToken;
  let user;
  findUser(userReq)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then(() =>
      token.createToken(userReq).then((token) => {
        myToken = token;
      })
    )
    .then(() => {
      let userRes = {
        id: user.id,
        nom: user.nom,
        email: user.email,
        delaiFixe: user.delaifixe,
      };
      response.status(200).json({ user: userRes, token: myToken });
    })
    .catch((err) =>
      response.status(400).json({ error: "Le mot de passe ne correspond pas." })
    );
};

const findUser = (userReq) => {
  return database
    .query("SELECT * FROM Utilisateur WHERE email = $1", [userReq.email])
    .then((data) => data.rows[0]);
};

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.motdepasse, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error("Passwords do not match."));
      }
    })
  );
};

module.exports = { signin };
