// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult,signInWithPopup } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWxedO3B92ZIDadCnzu4MKnJ6iC77D0yA",
    authDomain: "stream-video-4aef6.firebaseapp.com",
    projectId: "stream-video-4aef6",
    storageBucket: "stream-video-4aef6.appspot.com",
    messagingSenderId: "323422616040",
    appId: "1:323422616040:web:f466e9d076316b89c58c5d",
    measurementId: "G-MQGKS0M753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {

    const u =  auth.currentUser
    if (user) {
        console.log('you are logged with:',u.providerData[0].providerId)
        console.log("User is already signed in:", user);
    } else {
        console.log("No user signed in");
    }
});



// Sign in with redirect
 const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      return "success"
    } catch (error) {
      console.error(error);
    }
  };


const listenForAuthChanges = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};


const logout = async () => {
    await signOut(auth);
    console.log("User signed out");
};

export { signInWithGoogle, logout, listenForAuthChanges }