import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBvl4gXVZJfD8IL4djR2z_HFN_Xz0vnpQ8',
  authDomain: 'ark-6-265103.firebaseapp.com',
  databaseURL: 'https://ark-6-265103.firebaseio.com',
  projectId: 'ark-6-265103',
  storageBucket: 'ark-6-265103.appspot.com',
  messagingSenderId: '1034370972794',
  appId: '1:1034370972794:web:51316b9db09a8b5a2c0fc3',
  measurementId: 'G-3XJZE1RJ9Z',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
