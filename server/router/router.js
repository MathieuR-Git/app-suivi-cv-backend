const express = require("express"),
  router = express.Router();
const db = require("../../database/models");
router.get("/utilisateur/:email", (req, response) => {
  db.Utilisateur.findOne({where :{email:req.params.email}})
  .then((result) =>response.send(result))
  .catch(error=>response.send(error));
});

router.delete("/utilisateur/:id",(req,response)=>{
db.Utilisateur.destroy({where:{id:req.params.id}})
.then(response.send("Utilisateur Supprimé."))
.catch(error=>response.send(error));
});

router.post("/utilisateur",(req,response)=>{
  db.Utilisateur.create({
    nom: req.body.nom,
    email: req.body.email,
    delaiFixe: false,
    motDePasse:req.body.motDePasse})
    .then(utilisateurCree=>response.send(utilisateurCree))
    .catch(error=>
    response.send(error));
});

router.put("/utilisateur/:id",(req,response)=>{
  db.Utilisateur.update({
    nom: req.body.nom,
    email: req.body.email,
    delaiFixe: req.body.delaiFixe,
    motDePasse:req.body.motDePasse
  },{
    where: {id:req.params.id}
  })
  .then(response.send("Utilisateur modifié"))
  .catch(error=>response.send(error));
})

router.post("/candidature",(req,response)=>{
    if(req.body.dureeRelance==null || req.body.dureeRelance==""){
    db.Candidature.create({
      idUtilisateur: req.body.idUtilisateur,
      idOffre: req.body.idOffre,
      dateCandidature:req.body.dateCandidature,
      statut:req.body.statut})
      .then(candidatureCree=>response.send(candidatureCree))
      .catch(error=>
      response.send(error));
  }
  else{
    db.Candidature.create({
      idUtilisateur: req.body.idUtilisateur,
      idOffre: req.body.idOffre,
      dateCandidature:req.body.dateCandidature,
      dureeRelance: req.body.dureeRelance,
      statut:req.body.statut})
      .then(candidatureCree=>response.send(candidatureCree))
      .catch(error=>
      response.send(error));
  }
});

router.get("/mescandidatures/:id", (req, response) => {
  db.Candidature.findAll({where :{idUtilisateur:req.params.id}, include: [db.Offre]})
  .then((result) =>response.send(result))
  .catch(error=>response.send(error));
});

router.put("/macandidature/:idUtilisateur/:idOffre",(req,response)=>{
  db.Candidature.update({
    dateCandidature:req.body.dateCandidature,
    dureeRelance:req.body.dureeRelance,
    statut:req.body.statut,
  },{
    where: {idUtilisateur:req.params.idUtilisateur,idOffre:req.params.idOffre}
  })
  .then(response.send("Candidature modifiée"))
  .catch(error=>response.send(error));
})

router.get("/macandidature/:idUtilisateur/:idOffre", (req, response) => {
  db.Candidature.findOne({where :{idUtilisateur:req.params.idUtilisateur, idOffre:req.params.idOffre}, include: [db.Offre]})
  .then((result) =>response.send(result))
  .catch(error=>response.send(error));
});
  
module.exports = router;

