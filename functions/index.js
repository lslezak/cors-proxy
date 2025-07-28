// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
//
// const { onRequest } = require("firebase-functions/https");
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");

const cors = require("cors")({origin: true});
const fetch = require("node-fetch");

exports.corsProxy = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const url =
      "https://download.opensuse.org/repositories/systemsmanagement:/Agama:/Devel/images/iso/?jsontable";

    fetch(url)
        .then((response) => response.text())
        .then((body) => {
          logger.info("Response size: ", body.length);
          res.send(body);
        })
        .catch((e) => {
          logger.error("Fetch failed", e.message);
          res.status(500).send(`Error: Fetch failed: ${e.message}`);
        });
  });
});
