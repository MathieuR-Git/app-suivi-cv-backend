const Queries = require("./queries");
const Token = require("./token");

const createJob = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.createOffer(request.body).then((candidatureCree) =>
        response.status(200).send(candidatureCree)
      );
    })
    .catch((error) => response.status(400).send(error));
};

const getJobs = (request, response) => {
  const headers = request.headers.authorization;
  const myToken = headers.replace("Bearer ", "");

  Token.verifyToken(myToken)
    .then(() => {
      Queries.getOffersFromUser(request.params.id).then((result) =>
        response.send(result)
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
      ).then((result) => response.send(result));
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
      ).then((result) => response.send(result));
    })
    .catch((err) => console.log(err));
};

module.exports = { createJob, getJobs, getAJobFromUser, editAnOffer };
