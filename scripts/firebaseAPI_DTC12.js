//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDssVL_HQ2ji7s28xcbEn1Q0ZKWNd_ri-8",
    authDomain: "project-dtc12.firebaseapp.com",
    projectId: "project-dtc12",
    storageBucket: "project-dtc12.firebasestorage.app",
    messagingSenderId: "541267126037",
    appId: "1:541267126037:web:6f87c9e026cd8ae5de6b1c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
