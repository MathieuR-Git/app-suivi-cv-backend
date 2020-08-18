const Token = require("./token");
const Queries = require("../db/queries");
const Bcrypt = require("./bcrypt");

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

  Bcrypt.hashPassword(user.password)
    .then((hashedPassword) => {
      user.password = hashedPassword;
    })
    .then(() =>
      Queries.createUser(user).then((data) => {
        Token.createToken(user)
          .then((token) => {
            tokenSave = token;
          })
          .then(() => {
            response.status(201).json({ user: data, token: tokenSave });
          });
      })
    )
    .catch((err) => {
      err.code === "23505"
        ? response
            .status(400)
            .json({ errorEmail: "Cette adresse email est déjà utilisée." })
        : null;
      console.log(err);
    });
};

module.exports = { signup };
