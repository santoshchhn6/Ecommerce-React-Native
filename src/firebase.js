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
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
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
