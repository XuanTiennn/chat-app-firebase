import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./chat/index";
import Login from "./login/login";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
