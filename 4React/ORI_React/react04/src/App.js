import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Crypto from "./pages/crypto.jsx";
import Lstorage from "./pages/localstorage.jsx";

const App = () => {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/crypto">Crypto</Link> |{" "}
      <Link to="/localstorage">Local Storage</Link> |
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/localstorage" element={<Lstorage />} />
      </Routes>
    </>
  );
};

export default App;
