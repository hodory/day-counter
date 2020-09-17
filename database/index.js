const firebase = require("firebase-admin");
const { FIREBASE_API_URL } = require("../const");

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_API_PROJECT_ID,
      clientEmail: process.env.FIREBASE_API_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_API_PRIVATE_KEY,
    }),
    databaseURL: FIREBASE_API_URL,
  });
}
export const database = firebase.database();
