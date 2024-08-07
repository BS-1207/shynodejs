import "./App.css";
import { useState } from "react";

function App() {
  const [text, setText] = useState("안녕하세요.");
  const handleInput = (e) => setText(e.target.value);
  const handleDel = (e) => setText("");
  //<input type="text" onChange={handleInput} />
  //onKeyUp="if(window.event.keyCode==13){}"
  return (
    <>
      <div>리액트 시작</div>
      <form>
        <input type="text" onChange={handleInput} value={text} />
        <button type="reset" onClick={handleDel}>
          지우기
        </button>
      </form>
      <h3>{text}</h3>
    </>
  );
}

export default App;
