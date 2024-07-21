import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCkMDI4Olm-gn3Hy8fylPCP_cDkTCsrmqQ",
	authDomain: "viso-task-1ecd5.firebaseapp.com",
	projectId: "viso-task-1ecd5",
	storageBucket: "viso-task-1ecd5.appspot.com",
	messagingSenderId: "496882472511",
	appId: "1:496882472511:web:428f21cd96e87b2c210a8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, setDoc, updateDoc };