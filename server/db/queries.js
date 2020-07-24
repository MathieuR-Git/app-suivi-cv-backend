const database = require("./db");
require("dotenv").config();

const editUserName = (data) => {
  return new Promise((resolve, reject) => {
    return database
      .query("UPDATE utilisateur SET nom = $1 WHERE id = $2", [
        data.nom,
        data.id,
      ])
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

const editUserEmail = (data) => {
  return new Promise((resolve, reject) => {
    return database
      .query("UPDATE utilisateur SET email = $1 WHERE id = $2", [
        data.email,
        data.id,
      ])
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

const findUser = (userReq) => {
  return new Promise((resolve, reject) => {
    return database
      .query("SELECT * FROM Utilisateur WHERE email = $1", [userReq.email])
      .then((data) => resolve(data.rows[0]))
      .catch((err) => reject(err));
  });
};

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    return database
      .query(
        "INSERT INTO Utilisateur (nom, email, delaiFixe, motDePasse) VALUES ($1, $2, $3, $4)",
        [user.name, user.email, user.delaiFixe, user.password]
      )
      .then(() => findUser(user))
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

module.exports = { editUserName, editUserEmail, findUser, createUser };
