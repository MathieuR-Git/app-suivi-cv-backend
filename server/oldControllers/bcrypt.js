const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.motDePasse, (err, response) => {
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

module.exports = { hashPassword, checkPassword };
