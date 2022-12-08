import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth';

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: "https://shoppy-7c292-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: PROJECT_ID,
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function login() {
  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return user;
  }).catch((error) => {
    console.log(error);
  });
}

export async function logout() {
  return signOut(auth).then(() => null);
}