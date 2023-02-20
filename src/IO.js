import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { useEffect, useState } from 'react';
import { query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

export function useInfoFromUser() {
  console.log("3");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "User");

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    });
    console.log("4");
  }

  useEffect(() => {
    getUsers();
    console.log("5");
  }, []);

  return users;
}

export function useAllAds() {
  console.log("2");

  const [ads, setAds] = useState([]);
  const adsCollectionRef = collection(firestore, "Advertisement");

  const getAds = async () => {
    await getDocs(adsCollectionRef).then((querySnapshot) => {
      const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAds(adsData);
    });
    console.log("4");
  }

  useEffect(() => {
    getAds();
    console.log("6");
  }, []);

  return ads;
};

// export function useAdsFromUser(userID) {

//     const [ads, setAds] = useState([]);
//     const adsCollectionRef = collection(firestore, "Advertisement");

//     const getAds = async () => {
//         const data = await getDocs(adsCollectionRef, where("userID", "==", userID));
//         setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     }

//     useEffect(() => {
//       getAds()
//     }, []);

//     return ads;
// }

export function useAddData() {

  const [adds, setAdds] = useState([]);
  const adsCollectionRef = collection(firestore, "Advertisement");

  useEffect(() => {
    const getAdds = async () => {
      const adds = await getDocs(adsCollectionRef);
      setAdds(adds.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getAdds();
  }, []);

  return adds;
};

export async function addUser(Username, Password, Email, Phonenumber) {
  const usersDocRef = doc(firestore, "User", Username);
  await setDoc(usersDocRef, { Username: Username, Password: Password, Email: Email, Phonenumber: Number(Phonenumber) });
};

export async function addAd(Title, Description, userID, Picture, Schedule, Phonenumber) {

  const addsCollectinRef = collection(firestore, "Advertisement");
  await addDoc(addsCollectinRef, { Title: Title, Description: Description, userID: userID, Picture: Picture, Schedule: Schedule, Phonenumber: Phonenumber });
};

// export function createUser(email, password) {
//   createUserWithEmailAndPassword(auth, email, password).catch((error) => {
//     console.log(error.message)
//   });
// }

// export function userSignOut() {
//   signOut(auth).catch((error) => {
//     console.log(error.message)
//   })
// }

// export function userSignIn(email, password) {
//   signInWithEmailAndPassword(auth, email, password).catch((error) => {
//     console.log(error.message)
//   })
// }

// export function checkIfUserLoggedIn() { //Ikke testet denne koden
//   let user = firestore.auth().currentUser;
//   if (user) {
//     return true
//   }
//   return false
// }

// export const isLoggedIn = checkIfUserLoggedIn(); //Usikker på om dette fungerer

//  export function getCurrentUserID() { //Ikke testet denne koden
//   const userCollectionRef = collection(firestore, "User");
//   let user = firestore.auth().currentUser;
//   return userCollectionRef.doc(user.uid);
// }