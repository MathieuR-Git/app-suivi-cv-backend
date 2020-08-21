const Queries = require("./queries");
const Token = require("./token");

const createJob = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.findOffer(request.body).then((answer) =>
        answer
          ? Queries.createCandidature(request.body)
              .then((candidatureCree) =>
                response.status(200).send(candidatureCree)
              )
              .catch((err) =>
                response.status(400).json({
                  error: "Erreur lors de la création de la candidature.",
                })
              )
          : Queries.createOffer(request.body).then(() =>
              Queries.createCandidature(request.body)
                .then((candidatureCree) =>
                  response.status(200).send(candidatureCree)
                )
                .catch((err) =>
                  response.status(400).json({
                    error: "Erreur lors de la création de la candidature.",
                  })
                )
            )
      );
    })
    .catch((error) => response.status(400).send(error));
};

const getJobs = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.getOffersFromUser(request.params.id)
        .then((result) => response.send(result))
        .catch((err) =>
          response
            .status(400)
            .json({ error: "Erreur lors de la récupération des données." })
        );
    })
    .catch((err) => console.log(err));
};

const getAJobFromUser = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.getAnOfferFromUser(
        request.params.idUtilisateur,
        request.params.idOffre
      )
        .then((result) => response.send(result))
        .catch((err) =>
          response
            .status(400)
            .json({ error: "Erreur lors de la récupération des données." })
        );
    })
    .catch((err) => console.log(err));
};

const editAnOffer = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.editOfferWithIdOffre(
        request.body,
        request.params.idUtilisateur,
        request.params.idOffre
      )
        .then((result) => response.send(result))
        .catch((err) =>
          response
            .status(400)
            .json({ error: "Erreur lors de l'édition des données." })
        );
    })
    .catch((err) => console.log(err));
};

module.exports = { createJob, getJobs, getAJobFromUser, editAnOffer };
