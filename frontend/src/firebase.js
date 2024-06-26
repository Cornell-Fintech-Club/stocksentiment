import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; // Add these imports

const config = {
  apiKey: "AIzaSyB_LuxpWXdMfqyyLg16QBQh1eDxxcpoZT0",
  authDomain: "cft-stocksentiment.firebaseapp.com",
  projectId: "cft-stocksentiment",
  storageBucket: "cft-stocksentiment.appspot.com",
  messagingSenderId: "445607842000",
  appId: "1:445607842000:web:0e70545f5ddaf6ed60ced5",
  measurementId: "G-3VE6C09FGT"
};

const app = initializeApp(config);
export const db = getFirestore(app);
export const firestore = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const fetchUserStocks = async (userId) => {
  const userDocRef = doc(db, 'users', userId);
  const stocksCollectionRef = collection(userDocRef, 'stocks');
  const snapshot = await getDocs(stocksCollectionRef);
  const stocks = [];
  snapshot.forEach(doc => {
    stocks.push({ id: doc.id, ...doc.data() });
  });
  return stocks;
};
