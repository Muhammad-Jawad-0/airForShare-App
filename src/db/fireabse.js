import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef , uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzaFx8eJnkqgOiBr0InMY5wNIYGxsiGZU",
  authDomain: "login-page-with-asad.firebaseapp.com",
  projectId: "login-page-with-asad",
  storageBucket: "login-page-with-asad.appspot.com",
  messagingSenderId: "752517575444",
  appId: "1:752517575444:web:dc56d566916927228d0801",
  measurementId: "G-4FJFQD81VR",
  databaseURL: "https://login-page-with-asad-default-rtdb.asia-southeast1.firebasedatabase.app"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

export {
  app,
  database,
  ref,
  set,
  onValue,
  remove,
  getStorage,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL
}