import { db } from "../firebase/config";
import firebase from "./config";
export const addDocument = (collection, data) => {
  const query = db.collection(collection);
  query.add({
    ...data,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
