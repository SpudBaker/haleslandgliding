import * as functions from "firebase-functions";

exports.helloWorld = functions.https.onRequest(
  {cors: true},
  (request, response) => {
    response.send(JSON.stringify(
      {"data": "Firebase Functions calling with an array!"}
    ));
  }
);
