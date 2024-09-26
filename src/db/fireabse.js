import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef , uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

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


// const firebaseConfig = {
//   apiKey: "AIzaSyCyium0WrNpx2_onIHQeSiBMueYofH9eEY",
//   authDomain: "airforshare-b2297.firebaseapp.com",
//   databaseURL: "https://airforshare-b2297-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "airforshare-b2297",
//   storageBucket: "airforshare-b2297.appspot.com",
//   messagingSenderId: "491848975059",
//   appId: "1:491848975059:web:19ef2af1882f3c6d9c8a26",
//   measurementId: "G-FT50JE4JT6"
// };
// "https://login-page-with-asad-default-rtdb.asia-southeast1.firebasedatabase.app/"
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
  getDownloadURL,
  deleteObject
}