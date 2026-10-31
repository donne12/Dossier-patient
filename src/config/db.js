// db.js: Firebase v12 compat layer keeps the namespaced API used by the whole app
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
	apiKey: "AIzaSyBvW0gYrCEfIOkVAF5KV4B6QB2VGozChYo",
	authDomain: "dossier-patient-b7cb9.firebaseapp.com",
	projectId: "dossier-patient-b7cb9",
	storageBucket: "dossier-patient-b7cb9.appspot.com",
	messagingSenderId: "966993653001",
	appId: "1:966993653001:web:fddd2d20fd3b7f1cb4f7d8"
};

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
export const db = app.firestore();
export default firebase;
