import "./Ex06.Css";
import myStyle from "./Ex06.module.css";
const Css = () => {
  const stylemain = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  };
  const style1 = {
    width: "200px",
    height: "200px",
    backgroundColor: "crimson",
    borderRadius: "1rem",
    border: "none",
    marginRight: "1rem",
    padding: "0 0 0 0",
  };

  return (
    <>
      <h1 id="ex06-h1">6. CSS 스타일 적용하기</h1>
      <div style={stylemain}>
        <div style={style1}></div>
        <div style={{ ...style1, backgroundColor: "dodgerblue" }}></div>
      </div>
      <div className={"ex06-div"}></div>
      <div className={myStyle["ex06-div"]}>
        <ul>
          <li>마 내가 느그 서장하고 밥먹고</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className={myStyle["triangle"]}>
        <div className={myStyle["equilateral-triangle"]}></div>
        <div className={myStyle["right-triangle"]}></div>
        <div className={myStyle["rotated-triangle"]}></div>
      </div>
    </>
  );
};
export default Css;
