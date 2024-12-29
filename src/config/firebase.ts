// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUvefT1SVxXGXOWG2Mkt4lt6uZ4H0YM2k',
  authDomain: 'garage-zip.firebaseapp.com',
  projectId: 'garage-zip',
  storageBucket: 'garage-zip.firebasestorage.app',
  messagingSenderId: '806987408399',
  appId: '1:806987408399:web:566b11a4166ae1cd646f7a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  const functions = getFunctions(app);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  const firestore = getFirestore(app);
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
