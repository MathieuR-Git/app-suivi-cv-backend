// const database = require("../db/db");
const token = require("./token");
const Queries = require("../db/queries");

const getUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  token.verifyToken(myToken).then((data) => {
    Queries.findUser(data)
      .then((userDatas) => {
        response.status(200).json({ user: userDatas });
      })
      .catch((err) => {
        console.log("erreur : ", err);
      });
  });
};

const editUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");
  const userReq = request.body;

  token
    .verifyToken(myToken)
    .then(() => {
      if (userReq.nom) {
        Queries.editUserName(userReq);
        response.status(200).json({ message: "Nom modifié" });
      } else if (userReq.email) {
        Queries.editUserEmail(userReq);
        response.status(200).json({ message: "Email modifié" });
      }
    })
    .catch((err) => {
      console.log("erreur : ", err);
    });
};

module.exports = { getUser, editUser };
