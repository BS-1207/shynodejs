import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Css from "./pages/Ex06.jsx";
import Eff from "./pages/Ex07.jsx";
import Check from "./pages/Ex08.jsx";
import Radio from "./pages/Ex09.jsx";
import Arrays from "./pages/Ex10.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/Ex06">예제6</Link> |{" "}
      <Link to="/Ex07">예제7</Link> | <Link to="/Ex08">예제8</Link> |{" "}
      <Link to="/Ex09">예제9</Link> | <Link to="/Ex10">예제10</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ex06" element={<Css />} />
        <Route path="/Ex07" element={<Eff />} />
        <Route path="/Ex08" element={<Check />} />
        <Route path="/Ex09" element={<Radio />} />
        <Route path="/Ex10" element={<Arrays />} />
      </Routes>
    </>
  );
}

export default App;
