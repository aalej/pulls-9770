import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "demo-project.firebaseapp.com",
  databaseURL: "https://demo-project-default-rtdb.firebaseio.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:0d35e83e2360d478d84105",
  measurementId: "G-HHCZ1YF471",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const defaultFirestoreDb = getFirestore(firebaseApp);
const nonDefaultFirestoreDb = getFirestore(firebaseApp, "non-default");

connectAuthEmulator(firebaseAuth, "http://127.0.0.1:9099");
connectFirestoreEmulator(defaultFirestoreDb, "127.0.0.1", 8080);
connectFirestoreEmulator(nonDefaultFirestoreDb, "127.0.0.1", 8080);

export { firebaseAuth, defaultFirestoreDb, nonDefaultFirestoreDb };
