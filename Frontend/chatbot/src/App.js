import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./Components/ChatBot/ChatBot";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Chatbot />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
