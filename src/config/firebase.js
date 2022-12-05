import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFireStore, collection, getDocs } from 'firebase/firestore/lite'

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: "https://shoppy-7c292-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: PROJECT_ID,
    storageBucket: "shoppy-7c292.appspot.com",
    messagingSenderId: "346460514028",
    appId: "1:346460514028:web:1c58549416b5ca4b4ca7c9",
    measurementId: "G-RKBF41597T"
  };

const app = initializeApp(firebaseConfig);
// const db = getFireStore(app);
const auth = getAuth(app);

// // Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }