import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBOk3fPTI6ExbFZjAr0hQV0CDhuzdLIPSI",
  authDomain: "arithynet.firebaseapp.com",
  databaseURL: "https://arithynet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arithynet",
  storageBucket: "arithynet.appspot.com",
  messagingSenderId: "618699717752",
  appId: "1:618699717752:web:2bbaf77fe56ff09322c18d"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);