import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { formatSecondsToDate } from "../util/formatDate";

useFireStore.propTypes = {};

function useFireStore(colection, condition) {
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
        data.push({ ...doc.data(), id: doc.id });
      });
      if (colection === "messages") {
        if (data?.length > 0) {
          data.map((mes) => {
            mes.createBy = formatSecondsToDate(mes.createAt?.seconds);
          });
          data.sort((a, b) => new Date(a.createBy) - new Date(b.createBy));
          setDocument(data);
        }
      } else {
        setDocument(data);
      }
    });
  }
  useEffect(() => {
    if (condition.compareValue && condition.compareValue?.length > 0) {
      loadData();
    }
  }, [colection, condition]);

  return [document, setDocument];
}

export default useFireStore;
