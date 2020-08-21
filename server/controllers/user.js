const Token = require("./token");
const Bcrypt = require("../oldControllers/bcrypt");
const Queries = require("./queries");

//
const signin = (request, response) => {
  const userReq = request.body;

  let myToken;
  let user;
  Queries.getUser(userReq.email)
    .then((foundUser) => {
      user = foundUser.dataValues;
      return Bcrypt.checkPassword(userReq.motDePasse, foundUser.dataValues);
    })
    .then(() =>
      Token.createToken(user).then((token) => {
        myToken = token;
      })
    )
    .then(() =>
      Queries.getOffersFromUser(user.id).then((result) => {
        Queries.filterRelancesJobs(result)
          .then((relancesToDo) => {
            let userRes = {
              id: user.id,
              nom: user.nom,
              email: user.email,
              delaiFixe: user.delaifixe,
              candidatures: result,
              relances: relancesToDo,
            };

            response.status(200).json({ user: userRes, token: myToken });
          })
          .catch((err) =>
            response
              .status(400)
              .json({ error: "Erreur lors de la récupération des données." })
          );
      })
    )
    .catch((err) =>
      response.status(400).json({ error: "Le mot de passe ne correspond pas." })
    );
};

//
const signup = (request, response) => {
  const user = request.body;
  let tokenSave;

  //check if delaiFixe exists
  if (
    !user.delaiFixe ||
    user.delaiFixe === undefined ||
    user.delaiFixe === null
  ) {
    user.delaiFixe = true;
  }

  Bcrypt.hashPassword(user.motDePasse).then((hashedPassword) => {
    Queries.createUser(user, hashedPassword)
      .then((data) => {
        Token.createToken(user)
          .then((token) => {
            tokenSave = token;
          })
          .then(() => {
            response.status(201).json({ user: data, token: tokenSave });
          });
      })
      .catch((err) => {
        err.code === "23505"
          ? response
              .status(400)
              .json({ errorEmail: "Cette adresse email est déjà utilisée." })
          : null;
        console.log(err);
      });
  });
};

//
const getUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");
  let user;

  Token.verifyToken(myToken).then((data) => {
    Queries.getUser(data.email)
      .then((foundUser) => {
        user = foundUser.dataValues;
      })
      .then(() =>
        Queries.getOffersFromUser(user.id).then((result) => {
          Queries.filterRelancesJobs(result)
            .then((relancesToDo) => {
              let userRes = {
                id: user.id,
                nom: user.nom,
                email: user.email,
                delaiFixe: user.delaifixe,
                candidatures: result,
                relances: relancesToDo,
              };
              response.status(200).json({ user: userRes });
            })
            .catch((err) =>
              response
                .status(400)
                .json({ error: "Erreur lors de la récupération des données." })
            );
        })
      )
      .catch((err) => console.log(err));
  });
};

//
const editUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");
  const userReq = request.body;

  Token.verifyToken(myToken)
    .then(() => {
      Queries.editUser(userReq, request.params.id)
        .then(() =>
          response.status(200).json({
            message: "Utilisateur modifié",
          })
        )
        .catch((err) =>
          response
            .status(400)
            .json({ error: "Erreur lors de l'édition des données." })
        );
    })
    .catch((err) => {
      console.log("erreur : ", err);
    });
};

//
const deleteUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");
  const userId = request.params.id;

  Token.verifyToken(myToken)
    .then(() => {
      Queries.deleteUser(userId)
        .then(() => response.status(200).json({ message: "User deleted !" }))
        .catch((err) =>
          response
            .status(400)
            .json({ error: "Erreur lors de la suppression du compte." })
        );
    })
    .catch((err) => {
      console.log("erreur : ", err);
    });
};

module.exports = {
  signin,
  signup,
  getUser,
  editUser,
  deleteUser,
};
