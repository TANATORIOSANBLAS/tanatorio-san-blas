// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDwNQx24EHm4fw_-4untRVDxT4ckThifgg",
    authDomain: "tanatorio-san-blas.firebaseapp.com",
    projectId: "tanatorio-san-blas",
    storageBucket: "tanatorio-san-blas.firebasestorage.app",
    messagingSenderId: "556951246046",
    appId: "1:556951246046:web:a432951c2722f124d2de4f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
