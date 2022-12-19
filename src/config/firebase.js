import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL:
    "https://shoppy-7c292-default-rtdb.asia-southeast1.firebasedatabase.app",
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
    options: product.options.split(","),
  })
    .then(() => {
      console.log("Upload !");
    })
    .catch(console.error);
}

async function adminUser(user) {
  return get(ref(db, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function getProducts() {
  return get(ref(db, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(Object.values(snapshot.val()));
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch(console.error);
}

/**
 * 로그인한 유저의 장바구니
 */
export async function getBasket(userId) {
  return get(ref(db, `basket/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val() || {});
      }
    })
    .catch(console.error);
}

/**
 * 장바구니 추가
 * @param {*} userId : 회원의 ID
 * @param {*} product : 추가한 상품
 * @param {*} selected : 선택한 옵션
 */
export async function addOrUpdateBasket(userId, product) {
  set(ref(db, `basket/${userId}/${product.id}`), product);
}

export async function removeFromBasket(userId, productId) {
  return remove(ref(db, `basket/${userId}/${productId}`));
}
