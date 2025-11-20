// Firebase Admin SDK configuration
// Install: npm install firebase-admin

// const admin = require('firebase-admin')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase Admin
/*
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  })
}

const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()

module.exports = {
  admin,
  db,
  auth,
  storage,
}
*/

// Placeholder export for when Firebase is not yet configured
module.exports = {
  firebaseConfig,
  admin: null,
  db: null,
  auth: null,
  storage: null,
}
