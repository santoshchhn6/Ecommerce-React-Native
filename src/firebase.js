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
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore(app);

//=================================User===============================
const userCollectionRef = collection(db, "users");

export const addUser = async (
  id,
  { firstName, lastName, email, address, phone }
) =>
  new Promise((resolve, reject) => {
    setDoc(doc(db, "users", id), { firstName, lastName, email, address, phone })
      .then(() => resolve("User Created!"))
      .catch((err) => reject(err));
  });

//get user
export const getUser = (id) =>
  new Promise((resolve, reject) => {
    getDoc(doc(db, "users", id))
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

//=================================Cart===============================
const cartCollectionRef = collection(db, "cart");

export const addCart = async (id, cart) =>
  new Promise((resolve, reject) => {
    setDoc(doc(db, "cart", id), cart)
      .then(() => resolve("Cart Created!"))
      .catch((err) => reject(err));
  });

//get cart
export const getCart = (id) =>
  new Promise((resolve, reject) => {
    const q = query(cartCollectionRef, where("userId", "==", id));
    getDocs(q)
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  });

//delete cart
export const deleteCart = (id) =>
  new Promise((resolve, reject) => {
    const docToDelete = doc(db, "cart", id);
    deleteDoc(docToDelete)
      .then(() => resolve("Cart Deleted!"))
      .catch((e) => reject(e));
  });

//delet All cart
export const deleteAllCart = (carts) =>
  new Promise((resolve, reject) => {
    // console.log(carts);
    let batch = [];
    carts.forEach((cart) => batch.push(deleteCart(cart.id)));
    Promise.all(batch)
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
//=================================WishList===============================
const wishListCollectionRef = collection(db, "wishList");

//add WishList
export const addWishList = async (id, wishList) =>
  new Promise((resolve, reject) => {
    setDoc(doc(db, "wishList", id), wishList)
      .then(() => resolve("WishList Created!"))
      .catch((err) => reject(err));
  });

//get WishList
export const getWishList = (id) =>
  new Promise((resolve, reject) => {
    const q = query(wishListCollectionRef, where("userId", "==", id));
    getDocs(q)
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  });

//delete WishList
export const deleteWishList = (id) =>
  new Promise((resolve, reject) => {
    const docToDelete = doc(db, "wishList", id);
    deleteDoc(docToDelete)
      .then(() => resolve("WishList Deleted!"))
      .catch((e) => reject(e));
  });
//=================================Orders===============================
const ordersCollectionRef = collection(db, "orders");

//add orders
export const addOrders = async (userId, orders) =>
  new Promise((resolve, reject) => {
    let batch = [];
    console.log(orders);
    orders.forEach((order) => {
      const { id, productId, quantity, size, color } = order;
      batch.push(
        setDoc(doc(db, "orders", id), {
          productId,
          userId,
          quantity,
          size,
          color,
        })
      );
    });
    Promise.all(batch)
      .then(() => resolve("Orders Created!"))
      .catch((err) => reject(err));
  });

//get orders
export const getOrders = (id) =>
  new Promise((resolve, reject) => {
    const q = query(ordersCollectionRef, where("userId", "==", id));
    getDocs(q)
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  });

//delete orders
export const deleteOrders = (id) =>
  new Promise((resolve, reject) => {
    const docToDelete = doc(db, "orders", id);
    deleteDoc(docToDelete)
      .then(() => resolve("Orders Deleted!"))
      .catch((e) => reject(e));
  });

//========================Storage======================
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
