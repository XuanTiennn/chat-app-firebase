import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Chat from "./chat/index";
import Login from "./login/login";
import { useEffect } from "react";
import AuthProvider from "./context/authContext";
function App() {
  const history = useNavigate();
  useEffect(() => {
    history("/login");
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
