const express = require("express"),
  router = express.Router();
const pool = require("../db/db");
router.get("/", (req, response) => {
  pool.query("SELECT * FROM utilisateur", (error, results) => {
    if (error) {
      console.log(error);
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
