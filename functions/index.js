/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.beforeCreate = functions.auth.user().beforeCreate((user) => {
  const email = user.email;
  const emailPattern = /^\d{4}csc\d{3}@univ\.jfn\.ac\.lk$/;

  if (emailPattern.test(email)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new functions.auth.HttpsError('invalid-argument', 'The email is not from an allowed domain.'));
  }
});

import { auth, db } from '../firebaseConfig';
