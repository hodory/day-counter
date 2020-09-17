const firebase = require("firebase-admin");
const { FIREBASE_API_URL } = require("../const");

if (!firebase.apps.length) {
  const serviceAccountObject = {
    projectId: process.env.FIREBASE_API_PROJECT_ID,
    clientEmail: process.env.FIREBASE_API_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_API_PRIVATE_KEY,
  };
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountObject),
    databaseURL: FIREBASE_API_URL,
  });
  console.log(serviceAccountObject);
}
export const database = firebase.database();
