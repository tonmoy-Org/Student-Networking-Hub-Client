// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx9OCfM6vyoJTl6rH9ixJC6CUVMp0Xe68",
  authDomain: "student-networking-hub.firebaseapp.com",
  projectId: "student-networking-hub",
  storageBucket: "student-networking-hub.appspot.com",
  messagingSenderId: "882854897904",
  appId: "1:882854897904:web:d0bc8d2718c869e7e9ba35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;