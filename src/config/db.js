// db.js
import Firebase from 'firebase'

let config = {
	apiKey: "AIzaSyBvW0gYrCEfIOkVAF5KV4B6QB2VGozChYo",
	authDomain: "dossier-patient-b7cb9.firebaseapp.com",
	projectId: "dossier-patient-b7cb9",
	storageBucket: "dossier-patient-b7cb9.appspot.com",
	messagingSenderId: "966993653001",
	appId: "1:966993653001:web:fddd2d20fd3b7f1cb4f7d8"
};
let app = Firebase.initializeApp(config);
export const db = app.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);