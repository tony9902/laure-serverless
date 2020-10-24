
import * as admin from 'firebase-admin';

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID + "";
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY + "";
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL + "";
const params= {
  projectId: FIREBASE_PROJECT_ID,
  private_key: FIREBASE_PRIVATE_KEY,
  client_email: FIREBASE_CLIENT_EMAIL
}
try {
  admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: 'https://laure-shop.firebaseio.com'
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default admin.firestore();