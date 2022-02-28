import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSkuaChdj3ifgoR1rfxEVS3VGuTc1glfU",
  authDomain: "fantasy-lmz.firebaseapp.com",
  projectId: "fantasy-lmz",
  storageBucket: "fantasy-lmz.appspot.com",
  messagingSenderId: "439446432900",
  appId: "1:439446432900:web:ada74c06b95c2da12ce6d1",
};

const app = initializeApp(firebaseConfig);

// firebase utils
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const imagesRef = ref(storage, "images");
const user = auth.currentUser;

const firebase = {
  db,
  auth,
  user,
  storage,
  imagesRef,
};

export default firebase;
