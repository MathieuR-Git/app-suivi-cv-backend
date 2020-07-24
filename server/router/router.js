const express = require("express"),
  router = express.Router();
const pool = require("../db/db");

router.get("/", (req, response) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

router.get("/editUser/:id", (req, response) => {
  const id = req.body.id;
  console.log(id);
  response.status(200).send("Coucou");
});

module.exports = router;
