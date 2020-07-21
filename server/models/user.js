const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../db/db");
const token = require("./token");
/*
 * Start of signup
 */
const signup = (request, response) => {
  const user = request.body;
  var tokenSave;

  //check if delaiFixe exists
  if (
    !user.delaiFixe ||
    user.delaiFixe === undefined ||
    user.delaiFixe === null
  ) {
    user.delaiFixe = true;
  }

  hashPassword(user.password)
    .then((hashedPassword) => {
      user.password = hashedPassword;
    })
    .then(() => createUser(user))
    .then(() =>
      createToken(user.email).then((token) => {
        tokenSave = token;
      })
    )
    .then(() => {
      response.status(201).json({ email: user.email, token: tokenSave });
    })
    .catch((err) => {
      err.code === "23505"
        ? response
            .status(400)
            .json({ error: "Cette adresse email est déjà utilisée." })
        : null;
    });
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const createUser = (user) => {
  return database
    .query(
      "INSERT INTO Utilisateur (nom, email, delaiFixe, motDePasse) VALUES ($1, $2, $3, $4)",
      [user.name, user.email, user.delaiFixe, user.password]
    )
    .then((data) => data.rows[0]);
};

/*
 *End of signup
 */

/*
 * Start of signing
 */
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
      token
        .createToken(userReq)
        //createToken(userReq)
        .then((token) => {
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

/**
 * End of signing
 */

module.exports = {
  signup,
  signin,
};
