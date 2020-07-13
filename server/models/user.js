const bcrypt = require("bcrypt");
const crypto = require("crypto");
const database = require("../db/db");

/*
 * Start of signup
 */
const signup = (request, response) => {
  const user = request.body;
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.password_digest = hashedPassword;
    })
    .then(() => createToken())
    .then((token) => (user.token = token))
    .then(() => createUser(user))
    .then((user) => {
      delete user.password_digest;
      response.status(201).json({ user });
    })
    .catch((err) => console.error(err));
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
      "INSERT INTO users (firstname, lastname, email, password_digest, token, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password_digest,
        user.token,
        new Date(),
      ]
    )
    .then((data) => data.rows[0]);
};

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString("base64"));
    });
  });
};
/*
 *End of signup
 */

/*
 * Start of signing
 */
const signin = (request, response) => {
  const userReq = request.body;
  let user;

  findUser(userReq)
    .then((foundUser) => {
      console.log(foundUser);
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then((res) => createToken())
    .then((token) => updateUserToken(token, user))
    .then(() => {
      delete user.password_digest;
      response.status(200).json(user);
    })
    .catch((err) => console.error(err));
};

const findUser = (userReq) => {
  return database
    .query("SELECT * FROM users WHERE email = $1", [userReq.email])
    .then((data) => data.rows[0]);
};

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
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

const updateUserToken = (token, user) => {
  return database
    .query("UPDATE users SET token = $1 WHERE id = $2", [token, user.id])
    .then((data) => data.rows[0]);
};
/**
 * End of signing
 */

// don't forget to export!
module.exports = {
  signup,
  signin,
};
