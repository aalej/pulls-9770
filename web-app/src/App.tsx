import "./App.css";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { defaultFirestoreDb, nonDefaultFirestoreDb } from "./service/firebase";
import AuthStatusComponent from "./components/AuthStatusComponent/AuthStatusComponent";
import { useRef } from "react";

function App() {
  const defaultDbDocIdInput = useRef<HTMLInputElement | null>(null);

  async function addDocToDefaultDatabase() {
    const collectionRef = collection(defaultFirestoreDb, "test-collection");
    const docRef = await addDoc(collectionRef, {
      value: "this is a test document value",
    });

    console.log("--- added document");
    console.log(docRef.id);
  }
  async function getDocFromDefaultDatabase(docId: string | undefined) {
    if (docId === undefined) {
      console.log("--- docId undefined");
      return;
    }
    const docRef = doc(defaultFirestoreDb, "test-collection", docId);
    const snapshot = await getDoc(docRef);

    console.log("--- got document");
    console.log(snapshot.data());
  }

  async function addDocToNonDefaultDatabase() {
    const collectionRef = collection(nonDefaultFirestoreDb, "test-collection");
    const docRef = await addDoc(collectionRef, {
      value: "this is a test document value",
    });

    console.log("--- added document");
    console.log(docRef.id);
  }
  async function getDocFromNonDefaultDatabase(docId: string | undefined) {
    if (docId === undefined) {
      console.log("--- docId undefined");
      return;
    }
    const docRef = doc(nonDefaultFirestoreDb, "test-collection", docId);
    const snapshot = await getDoc(docRef);

    console.log("--- got document");
    console.log(snapshot.data());
  }

  return (
    <>
      <AuthStatusComponent></AuthStatusComponent>
      <div>Default Database</div>
      <button onClick={addDocToDefaultDatabase}>
        Add Doc to Default Database
      </button>
      <input type="text" ref={defaultDbDocIdInput}></input>
      <button
        onClick={() =>
          getDocFromDefaultDatabase(defaultDbDocIdInput.current?.value)
        }
      >
        Get Doc from Non Default Database
      </button>

      <div>Non Default Database</div>
      <button onClick={addDocToNonDefaultDatabase}>
        Add Doc to Default Database
      </button>
      <input type="text" ref={defaultDbDocIdInput}></input>
      <button
        onClick={() =>
          getDocFromNonDefaultDatabase(defaultDbDocIdInput.current?.value)
        }
      >
        Get Doc from Non Default Database
      </button>
    </>
  );
}

export default App;
