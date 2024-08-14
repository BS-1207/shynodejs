import { useEffect, useState } from "react";
const Eff = () => {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState("");
  const handler = (e) => setInputs(e.target.value);
  console.log("렌더링 전 : 컴포넌트 장착 준비");
  useEffect(() => {
    console.log("렌더링 후 : 컴포넌트 장착 완료");
    if (count) alert("숫자변경이 감지되었습니다.");
    return () => console.log("클린업: 컴포넌트가 언마운트");
  }, [count]); // ,[]빈 배열 옵션-1번만이라 뜻 렌더링 유보, 없으면 시도마다 재렌더링 됨
  //useEffect [감시변수?]

  return (
    <>
      <h1>7. 렌더링 살펴보기</h1>
      <div>
        <p>Count : {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
      </div>
      <div>
        <input type="text" onChange={handler} />
        <h3>결과 : {inputs}</h3>
      </div>
    </>
  );
};
export default Eff;
