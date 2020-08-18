const db = require("../../database/models");

const createUser = (data, pwd) => {
  delete data.motDePasse;
  user = {
    ...data,
    motDePasse: pwd,
  };
  return new Promise((resolve, reject) => {
    db.Utilisateur.create(user)
      .then((userCreated) => resolve(userCreated))
      .catch((err) => reject(err));
  });
};

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    db.Utilisateur.findOne({ where: { email: email } })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

const getOffersFromUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.Candidature.findAll({
      where: { idUtilisateur: userId },
      include: [db.Offre],
    })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

const getAnOfferFromUser = (idUser, idOffer) => {
  return new Promise((resolve, reject) => {
    db.Candidature.findOne({
      where: {
        idUtilisateur: idUser,
        idOffre: idOffer,
      },
      include: [db.Offre],
    })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

const createOffer = (data) => {
  return new Promise((resolve, reject) => {
    if (data.dureeRelance == null || data.dureeRelance == "") {
      db.Candidature.create({
        idUtilisateur: data.idUtilisateur,
        idOffre: data.idOffre,
        dateCandidature: data.dateCandidature,
        statut: data.statut,
      })
        .then((candidatureCree) => resolve(candidatureCree))
        .catch((error) => reject(error));
    } else {
      db.Candidature.create({
        idUtilisateur: data.idUtilisateur,
        idOffre: data.idOffre,
        dateCandidature: data.dateCandidature,
        dureeRelance: data.dureeRelance,
        statut: data.statut,
      })
        .then((candidatureCree) => resolve(candidatureCree))
        .catch((error) => reject(error));
    }
  });
};

const editUser = (userValues, userId) => {
  return new Promise((resolve, reject) => {
    db.Utilisateur.update(
      {
        nom: userValues.nom,
        email: userValues.email,
        delaiFixe: userValues.delaiFixe,
        //motDePasse: userValues.motDePasse,
      },
      {
        where: { id: userId },
      }
    )
      .then(resolve("Utilisateur modifié"))
      .catch((error) => reject(error));
  });
};

const editOfferWithIdOffre = (data, idUtilisateur, idOffre) => {
  return new Promise((resolve, reject) => {
    db.Candidature.update(
      {
        dateCandidature: data.dateCandidature,
        dureeRelance: data.dureeRelance,
        statut: data.statut,
      },
      {
        where: {
          idUtilisateur: idUtilisateur,
          idOffre: idOffre,
        },
      }
    )
      .then(resolve("Candidature modifiée"))
      .catch((error) => reject(error));
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.Utilisateur.destroy({ where: { id: id } })
      .then(resolve("Utilisateur Supprimé."))
      .catch((error) => reject(error));
  });
};

const filterRelancesJobs = (candidaturesArray) => {
  let date = new Date().toISOString().slice(0, 10);
  let relances = [];
  return new Promise((resolve) => {
    candidaturesArray.map((candidature) =>
      candidature.dateRelance >= date ? relances.push(candidature) : ""
    );
    resolve(relances);
  });
};

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  createOffer,
  getOffersFromUser,
  getAnOfferFromUser,
  editOfferWithIdOffre,
  filterRelancesJobs,
};
