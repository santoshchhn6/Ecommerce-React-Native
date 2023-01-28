import { initializeApp } from "firebase/app";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

export const app = initializeApp(firebaseConfig);

//==================Authentication==================
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const auth = getAuth();

export const logIn = async (email, password) => {
  const promise = new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });
  return await promise;
};
export const createAccount = async (email, password) => {
  const promise = new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });
  return await promise;
};

export const logOut = async (email, password) => {
  const promise = new Promise((resolve, reject) => {
    signOut(auth, email, password)
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });
  return await promise;
};

//========================Database======================
import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore";
//========================Database======================
const db = getFirestore(app);

//User---------------------------------------
const collectionRef = collection(db, "users");

export const addData = async (firstname, lastname, email, address, phone) => {
  const promise = new Promise((resolve, reject) => {
    addDoc(collectionRef, {
      firstname,
      lastname,
      email,
      address,
      phone,
    })
      .then(() => resolve("User Created!"))
      .catch((err) => reject(err));
  });
  return await promise;
};

//Product---------------------------------------
const productRef = collection(db, "products");

//Get Products
export const getProduct = async () => {
  const promise = new Promise((resolve, reject) => {
    getDocs(productRef)
      .then((response) =>
        resolve(response.docs.map((item) => ({ ...item.data(), id: item.id })))
      )
      .catch((e) => alert(e.message));
  });
  return await promise;
};
