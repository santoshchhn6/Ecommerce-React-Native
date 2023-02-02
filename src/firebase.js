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

export const logIn = ({ email, password }) =>
  new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Successful Login");
        resolve(userCredential);
      })
      .catch((error) => reject(error));
  });

export const createAccount = ({ email, password }) =>
  new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });

export const logOut = () =>
  new Promise((resolve, reject) => {
    signOut(auth)
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });

//========================Database====================================
import {
  getDocs,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore(app);

//=================================User===============================
const userCollectionRef = collection(db, "users");

export const addUser = async ({
  firstName,
  lastName,
  email,
  address,
  phone,
  uid,
  image,
}) => {
  const promise = new Promise((resolve, reject) => {
    addDoc(userCollectionRef, {
      firstName,
      lastName,
      email,
      address,
      phone,
      uid,
      image,
    })
      .then(() => resolve("User Created!"))
      .catch((err) => reject(err));
  });
  return await promise;
};

//get user
export const getUser = (id) =>
  new Promise((resolve, reject) => {
    const q = query(userCollectionRef, where("uid", "==", id));
    getDocs(q)
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  });

//update user
export const updateUser = (id, userInfo) =>
  new Promise((resolve, reject) => {
    //select doc to update using id
    const docToUpdate = doc(db, "users", id);
    //update
    console.log(id);
    console.log(userInfo);
    updateDoc(docToUpdate, userInfo)
      .then(() => resolve("Data Updated!"))
      .catch((e) => reject(e));
  });
//=========================Product================================
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

//========================Storage======================
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { async } from "@firebase/util";

const storage = getStorage(app);

//for android only
export const addUserImage = ({ uri }) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);

    const storageRef = ref(storage, `users/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};
//========================Storage======================
