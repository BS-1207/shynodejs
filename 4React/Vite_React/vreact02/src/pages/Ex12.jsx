import { useRef, useState } from "react";
const Refdata = () => {
  //useRef - 직접 Dom 조작
  const tstyle = {
    margin: "1rem auto",
    width: "15rem",
    backgroundColor: "#FFFFFF",
    color: "black",
    textAlign: "left",
  };
  const cstyle = {
    margin: "1rem auto",
    width: "20rem",
    height: "20rem",
    backgroundColor: "#FFFFFF",
    color: "black",
  };
  const dstyle = {
    padding: "2rem",
    width: "40rem",
    height: "40rem",
    backgroundColor: "skyblue",
    borderRadius: "1rem",
    color: "white",
  };
  const [text, setText] = useState({ title: "", content: "" });
  const tInput = useRef();
  const cInput = useRef();
  const checkTxt = () => {
    if (text.title.length < 2) {
      alert("제목을 1자 이상 작성하시오.");
      tInput.current.focus();
      return;
    }
    if (text.content.length < 10) {
      alert("내용을 10자 이상 작성하시오.");
      cInput.current.focus();
      return;
    }
    alert("성공적으로 전송되었습니다.");
  };
  return (
    <>
      <h1>12. useRef으로 DOM 직접 접근</h1>
      <div>
        <h3>메모글 작성</h3>
        <input
          ref={tInput}
          type="text"
          name="title"
          style={tstyle}
          value={text.title}
          onChange={(e) =>
            setText((pre) => ({ ...pre, title: e.target.value }))
          }
        />
        <br />
        <textarea
          ref={cInput}
          name="content"
          style={cstyle}
          value={text.content}
          onChange={(e) =>
            setText((pre) => ({ ...pre, content: e.target.value }))
          }></textarea>
        <br />
        <button onClick={checkTxt}>전송</button>
        <div style={dstyle}>{JSON.stringify(text)}</div>
      </div>
    </>
  );
};
export default Refdata;
