// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "ventverse-fny94",
  "appId": "1:705005381631:web:ac6af15e713a29afb1a9ca",
  "storageBucket": "ventverse-fny94.firebasestorage.app",
  "apiKey": "AIzaSyDCbnnML3MWF3GbqsPF58U63ju5KLgx1ao",
  "authDomain": "ventverse-fny94.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "705005381631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
