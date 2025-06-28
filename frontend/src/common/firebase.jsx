import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPl-t6TgmctS-AOxrmUxdfCo57Ptm7zTg",
  authDomain: "blogging-website-b3f42.firebaseapp.com",
  projectId: "blogging-website-b3f42",
  storageBucket: "blogging-website-b3f42.firebasestorage.app",
  messagingSenderId: "905579843033",
  appId: "1:905579843033:web:5f621fe46c7843ae0e9dc8",
};

const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });

  return user;
};
