// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDN_sDZhLIXlyp-YKShDOH9L4vzTawWdUA",
  authDomain: "dietapp-93906.firebaseapp.com",
  projectId: "dietapp-93906",
  storageBucket: "dietapp-93906.firebasestorage.app",
  messagingSenderId: "1083107864686",
  appId: "1:1083107864686:web:d3e2af875f013d9e84f67f",
  measurementId: "G-VL7R18650Z"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni il servizio di autenticazione
const auth = getAuth(app);

export { app, auth };
