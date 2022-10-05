import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

useFireStore.propTypes = {};

function useFireStore(colection, condition) {
  console.log(colection, condition);
  const [document, setDocument] = useState();
  // Loads chat messages history and listens for upcoming ones.
  function loadData() {
    const q = query(
      collection(db, colection),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        
        data.push({...doc.data(),id:doc.id});
      });
      setDocument(data)
    });
  }
  useEffect(() => {
    try {
      if (condition.compareValue && condition.compareValue?.length > 0) {
        loadData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [colection, condition]);

  return document;
}

export default useFireStore;
