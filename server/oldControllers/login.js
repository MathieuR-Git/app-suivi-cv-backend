const Token = require("./token");
const Bcrypt = require("./bcrypt");
const Queries = require("../db/queries");

const signin = (request, response) => {
  const userReq = request.body;
  let myToken;
  let user;
  Queries.findUser(userReq)
    .then((foundUser) => {
      user = foundUser;
      return Bcrypt.checkPassword(userReq.password, foundUser);
    })
    .then(() =>
      Token.createToken(userReq).then((token) => {
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


module.exports = { signin };
