const firebase = require("firebase-admin");
const { FIREBASE_API_URL } = require("../const");

if (!firebase.apps.length) {
  const serviceAccountObject = {
    projectId: process.env.FIREBASE_API_PROJECT_ID,
    clientEmail: process.env.FIREBASE_API_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_API_PRIVATE_KEY,
  };
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccountObject),
      databaseURL: FIREBASE_API_URL,
    });
  } catch (e) {
    console.log(e);
    console.error(serviceAccountObject);
  }
}
export const database = firebase.database();
