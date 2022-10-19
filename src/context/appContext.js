import { createContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFireStore from "./../hooks/useFireStore";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const history = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState({});
  const userCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);
  const [members] = useFireStore("users", userCondition);
  const value = {
    selectedRoom: [selectedRoom, setSelectedRoom],
    members,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
