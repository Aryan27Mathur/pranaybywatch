import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmu_jJlBbEIV536-b7MrA5g7cGE2B5ix8",
    authDomain: "pranayby-watch.firebaseapp.com",
    projectId: "pranayby-watch",
    storageBucket: "pranayby-watch.appspot.com",
    messagingSenderId: "790778002219",
    appId: "1:790778002219:web:934738b4b681c25e52236e",
    measurementId: "G-MGD36Y803P"
};
  
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)



// export const getLocation = async() => {
//     const locCol = collection(db, 'location');
//     const locSnapshot = await getDocs(locCol);
//     const location = locSnapshot.docs.map(doc => doc.data())[0];
//     return location;
// }

// export const getLocation = async() => {
//     const tempLoc = await location.doc(docId).get()
//     return tempLoc
// }

// export const updateLocation = async(tempLoc) => {
//     location.doc(docId).update(tempLoc)
// }