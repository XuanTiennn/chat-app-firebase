import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../firebase/config";

export const getDocument = function (_collection, condition) {
  const data = [];
  // Loads chat messages history and listens for upcoming ones.
  function loadData() {
    const q = query(
      collection(db, _collection),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
    });
  }
  loadData();
  return data;
};
export const getDoc = async (_collection, condition) => {
  const isExist = [];
  const q = query(
    collection(db, _collection),
    where(condition.fieldName, condition.operator, condition.compareValue)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    isExist.push(doc.data());
  });
  return isExist;
};
export const deleteFile = (file) => {
  const storage = getStorage();

  // Create a reference to the file to delete
  const desertRef = ref(storage, `files/${file.fileName}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
