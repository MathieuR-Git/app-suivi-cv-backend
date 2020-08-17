const express = require("express"),
  router = express.Router();
const db = require("../../database/models");
router.get("/", (req, response) => {
  db.Utilisateur.findAll().then((result) =>response.send(result));
});

router.get("/editUser/:id", (req, response) => {
  const id = req.body.id;
  console.log(id);
  response.status(200).send("Coucou");
});

router.post("/inscription",(req,response)=>{
  db.Utilisateur.create({
    nom: req.body.nom,
    email: req.body.email,
    delaiFixe: false,
    motDePasse:req.body.motDePasse
  }).then(utilisateurCree=>response.send(utilisateurCree))
})


module.exports = router;
