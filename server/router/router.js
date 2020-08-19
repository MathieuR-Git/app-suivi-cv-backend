const express = require("express"),
  router = express.Router();
const User = require("../controllers/user");
const Offers = require("../controllers/offers");

/**
 * User
 */
router.post("/signup", User.signup); // ✔
router.post("/signin", User.signin); // ✔
router.put("/utilisateur/:id", User.editUser); // ✔
router.delete("/utilisateur/:id", User.deleteUser); // ✔
router.post("/checkToken", User.getUser);

/**
 * Offers
 */
router.post("/candidature", Offers.createJob); // X   -   Ajouter en bdd les infos du postulat
router.get("/macandidature/:idUtilisateur/:idOffre", Offers.getAJobFromUser); // ✔
router.get("/mescandidatures/:id", Offers.getJobs); // ✔
router.put("/macandidature/:idUtilisateur/:idOffre", Offers.editAnOffer); // X

module.exports = router;
