import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, onValue, ref } from 'firebase/database'
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: "https://shoppy-7c292-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: PROJECT_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider)
  .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  })
}

export async function getData() {
  const dbRef = ref(getDatabase());

  return get(child(dbRef, `admins`)).then((snapshot) => {
    // console.log(snapshot.val());
    return snapshot.val();
  }).catch((error) => {
    console.error(error);
  });
}