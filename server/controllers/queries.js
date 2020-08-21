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

const createCandidature = (data) => {
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

const createOffer = (data) => {
  return new Promise((resolve, reject) => {
    db.Offre.create({
      id: data.idOffre,
      poste: data.poste,
      nomEntreprise: data.nomEntreprise,
      url: data.url,
      nomContact: data.nomContact,
      fonctionContact: data.fonctionContact,
      telContact: data.telContact,
      emailContact: data.emailContact,
    })
      .then((offreCree) => resolve(offreCree))
      .catch((error) => reject(error));
  });
};

const findOffer = (data) => {
  return new Promise((resolve, reject) => {
    db.Offre.findOne({ where: { id: data.idOffre } })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
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
  let test = 0;
  return new Promise((resolve) => {
    const candidature = candidaturesArray.filter(function (candidature) {
      return (
        candidature.dataValues.statut !== "Refusé" &&
        candidature.dataValues.statut !== "refusé"
      );
    });

    candidature.map((filteredCandidature) =>
      filteredCandidature.dataValues.dateRelance <= date
        ? relances.push(filteredCandidature.dataValues)
        : ""
    );
    resolve(relances);
  });
};

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  createCandidature,
  findOffer,
  createOffer,
  getOffersFromUser,
  getAnOfferFromUser,
  editOfferWithIdOffre,
  filterRelancesJobs,
};
