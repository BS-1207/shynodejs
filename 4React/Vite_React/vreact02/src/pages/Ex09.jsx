import { useMemo, useState } from "react";
//useMemo 재렌더링 사이에 계산 결과를 캐싱할 수 있게 해주는 React Hook 입니다.
import "./Ex09.Css";
const Cards = (props) => {
  //props 객체 상속
  return (
    <>
      <div
        className="cards"
        style={{
          width: "200px",
          height: "150px",
          border: "none",
          borderRadius: "1rem",
          backgroundColor: "skyblue",
        }}>
        컴포넌트입니다.
        <p>name은 : {props.aname}</p>
        <p>age는 : {props.age}</p>
      </div>
    </>
  );
};
/*const Loading = () => {
  return (
    <>
      <div id="loader">
        <div className="face">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="270px"
            height="270px"
            viewBox="0.032 0 270 270"
            overflow="visible"
            enableBackground="new 0.032 0 270 270"
            xmlSpace="preserve">
            <defs></defs>
            <g id="supervisior">
              <g className="head">
                <path
                  fill="#58585A"
                  d="M135,10c33.389,0,64.778,13.002,88.388,36.612S260,101.611,260,135s-13.003,64.779-36.612,88.388
                S168.389,260,135,260s-64.778-13.002-88.388-36.612C23.002,199.779,10,168.389,10,135s13.002-64.779,36.612-88.388
                C70.222,23.002,101.611,10,135,10 M135,0C60.442,0,0,60.441,0,135s60.442,135,135,135s135-60.441,135-135S209.558,0,135,0L135,0z"
                />
              </g>
              <g id="eyeLeft">
                <g className="eyeLeft">
                  <circle
                    className="eye"
                    fill="none"
                    stroke="#58585A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    cx="66.063"
                    cy="127.51"
                    r="18.849"
                  />
                  <circle
                    className="pupil"
                    fill="#58585A"
                    cx="66.063"
                    cy="127.511"
                    r="8.949"
                  />
                </g>
                <path
                  className="closedLeft"
                  fill="none"
                  stroke="#58585A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  d="M47.238,127.972c0.247,10.194,8.57,18.387,18.824,18.387s18.579-8.193,18.826-18.387"
                />
              </g>
              <g id="eyeRight">
                <g className="eyeRight">
                  <circle
                    className="eye"
                    fill="none"
                    stroke="#58585A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    cx="203.936"
                    cy="127.51"
                    r="18.849"
                  />
                  <circle
                    className="pupil"
                    fill="#58585A"
                    cx="203.935"
                    cy="127.511"
                    r="8.949"
                  />
                </g>
                <path
                  className="closedRight"
                  fill="none"
                  stroke="#58585A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  d="M185.11,127.972c0.247,10.194,8.571,18.387,18.824,18.387c10.255,0,18.579-8.193,18.826-18.387"
                />
              </g>
              <g className="mouth">
                <polyline
                  className="bar"
                  fill="none"
                  stroke="#58585A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  points="111.532,232.832 135.032,232.832 158.532,232.832"
                />
                <path
                  className="smile"
                  fill="none"
                  stroke="#58585A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  d="M62.485,168.615c0.951,35.593,33.016,64.198,72.511,64.198c39.503,0,71.566-28.605,72.519-64.198"
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="loading-bar"></div>
      </div>
      <div id="refresher">
        <p className="refresh">refresh</p>
      </div>
    </>
  );
};*/
//props대신에 {객체속성}식으로 선언 가능
const ShowState = ({ number, text }) => {
  const consoleNumber = (number) => {
    console.log(number);
    return number;
  };
  const consoleText = (text) => {
    console.log(text);
    return text;
  };
  return (
    <>
      <p>숫자 : {number}</p>
      <p>글자 : {text}</p>
    </>
  );
};
const UseM = () => {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("준비중");
  /*과도한 연산을 담당 -고의적 렉 발생*/
  const plus = () => setNumber(number + 1);
  const minus = () => setNumber(number - 1);
  const handleIn = (e) => setText(e.target.value);
  const heavyCalc = () => {
    let s = 0;
    for (let i = 0; i < 1000 * 1000 * 1000; i++) {
      s += i;
    }
    return s;
  };
  let calc = useMemo(() => {
    return heavyCalc();
  }, []); //[]안에 설정된 값에 의존성에 의해 변화시 마다 계산됨
  // let calc = heavyCalc();

  //   if (loading) {
  //     return <p>로딩중 Loading...</p>;
  //   }
  return (
    <>
      <h1>9. 과도한 렌더링 방지</h1>
      <div style={{ display: "flex" }}>
        <Cards aname={"홍길동"} age={77} />
        <Cards aname={"슈퍼맨"} age={100} />
        <Cards aname={"배트맨"} age={40} />
      </div>
      <div>
        <span>고의로 랙유발 연산 : {calc}</span>
        <hr />
        <h2>숫자 바꾸기</h2>
        <button onClick={plus}> + </button>
        <button onClick={minus}> - </button>
        <h2>글자 바꾸기</h2>
        <input type="text" placeholder={text} onChange={handleIn} />
        <ShowState number={number} text={text} />
      </div>
    </>
  );
};
export default UseM;
