import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Css from "./pages/Ex06.jsx";
import Eff from "./pages/Ex07.jsx";
import FetchData from "./pages/Ex08.jsx";
import UseM from "./pages/Ex09.jsx";
import Table from "./pages/Ex10.jsx";
import Axi from "./pages/Ex11.jsx";
import Refdata from "./pages/Ex12.jsx";
import Urlcard from "./pages/Ex13.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/Ex06">예제6</Link> |{" "}
      <Link to="/Ex07">예제7</Link> | <Link to="/Ex08">예제8</Link> |{" "}
      <Link to="/Ex09">예제9</Link> | <Link to="/Ex10">예제10</Link> |{" "}
      <Link to="/Ex11">예제11</Link> | <Link to="/Ex12">예제12</Link> |{" "}
      <Link to="/Ex13">예제13</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ex06" element={<Css />} />
        <Route path="/Ex07" element={<Eff />} />
        <Route path="/Ex08" element={<FetchData />} />
        <Route path="/Ex09" element={<UseM />} />
        <Route path="/Ex10" element={<Table />} />
        <Route path="/Ex11" element={<Axi />} />
        <Route path="/Ex12" element={<Refdata />} />
        <Route path="/Ex13" element={<Urlcard />} />
      </Routes>
    </>
  );
}

export default App;
