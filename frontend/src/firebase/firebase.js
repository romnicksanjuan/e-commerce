// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult, signInWithPopup, signInWithCredential,FacebookAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBx0DXT-hTBSXKSyl0du__Cgoi3zYB0-LI",
    authDomain: "e-commerce-xyz.firebaseapp.com",
    projectId: "e-commerce-xyz",
    storageBucket: "e-commerce-xyz.firebasestorage.app",
    messagingSenderId: "508725181587",
    appId: "1:508725181587:web:e03eede62b5ee23657a166",
    measurementId: "G-3SJ5BCJNCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

onAuthStateChanged(auth, (user) => {

    const u = auth.currentUser
    if (user) {
        console.log('you are logged with:', u.providerData[0].providerId)
        console.log("User is already signed in:", user);
    } else {
        console.log("No user signed in");
    }
});



// Sign in with google
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
        return result
    } catch (error) {
        console.error(error);
    }
};


const listenForAuthChanges = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

// sign in with facebook
const signInWithFaceBook = async() =>{
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        console.log(result.user);
        return result
    } catch (error) {
        console.error(error);
    }
}


const logout = async () => {
    await signOut(auth);
    console.log("User signed out");
};

export { signInWithGoogle, logout, listenForAuthChanges , facebookProvider, signInWithCredential,signInWithFaceBook}