import firebase from 'firebase'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDICV3x3Z1IddNxHYGjqcxNf3iNEMiPxew",
    authDomain: "chatapp-fa830.firebaseapp.com",
    projectId: "chatapp-fa830",
    storageBucket: "chatapp-fa830.appspot.com",
    messagingSenderId: "846609941999",
    appId: "1:846609941999:web:e0068bfdf59eadcd4a621a",
    measurementId: "G-H0Q7PPMYB8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();


auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;