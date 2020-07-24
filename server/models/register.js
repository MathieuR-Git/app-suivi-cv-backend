const bcrypt = require("bcrypt");
const database = require("../db/db");
const token = require("./token");

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
      token.createToken(user.email).then((token) => {
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

module.exports = { signup };
