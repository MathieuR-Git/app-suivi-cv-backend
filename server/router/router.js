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

module.exports = router;
