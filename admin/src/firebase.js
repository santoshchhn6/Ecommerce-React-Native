import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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
import {
  getDoc,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const db = getFirestore(app);

//Product---------------------------------------
const collectionRef = collection(db, "products");

//Add
export const addProduct = async ({
  title,
  price,
  category,
  instock,
  sizes,
  colors,
  details,
  images,
  defaultImageIndex,
}) => {
  const promise = new Promise((resolve, reject) => {
    addDoc(collectionRef, {
      title,
      price,
      category,
      instock,
      sizes,
      colors,
      details,
      images,
      defaultImageIndex,
    })
      .then(() => resolve("Product Created!"))
      .catch((err) => reject(err));
  });
  return await promise;
};

//Get Query
export const getProduct = async (title) => {
  const q = query(collectionRef, where("title", "==", title));
  const promise = new Promise((resolve, reject) => {
    getDocs(q)
      .then((response) => resolve(response))
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

const storage = getStorage(app);

export const addProductImage = async (image, category) => {
  const promise = new Promise((resolve, reject) => {
    const storageRef = ref(storage, `products/${category}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

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
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
  return await promise;
};
