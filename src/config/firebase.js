import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL:
    'https://shoppy-7c292-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

export async function addProduct(product, image) {
  const id = uuidv4();
  set(ref(db, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  })
    .then(() => {
      console.log('Upload !');
    })
    .catch(console.error);
}

async function adminUser(user) {
  return get(ref(db, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}
