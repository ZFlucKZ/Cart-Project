import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUZY9UVI57gMOTBMYi17BAFv5SYVDJ_8s',
  authDomain: 'cart-project-aa4f9.firebaseapp.com',
  databaseURL:
    'https://cart-project-aa4f9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cart-project-aa4f9',
  storageBucket: 'cart-project-aa4f9.appspot.com',
  messagingSenderId: '392074555845',
  appId: '1:392074555845:web:79686a846d5340e3b25bac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

export default getFirestore();
