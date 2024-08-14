import { useState } from "react";

const Arrays = () => {
  const [array, setArray] = useState([]);
  const [indata, setIndata] = useState("");
  const handleInput = (e) => setIndata(e.target.value);
  const handleAdd = () => {
    setArray([...array, indata]);
    setIndata("");
  };
  const handleEmpty = () => {};
  console.log(array);
  const handleDel = () => setArray(array.slice(0, -1));
  return (
    <>
      <h1>5. 어레이 실시간 추가</h1>
      <label htmlFor="inin">배열요소 입력</label>
      <input type="text" id="inin" onChange={handleInput} />
      <button onClick={handleAdd} disabled={!indata}>
        추가
      </button>
      <button onClick={handleDel} disabled={!(array.length > 0)}>
        제거
      </button>
      <button onClick={handleEmpty}>배열 비우기</button>
      <h3>{array.join(", ")}</h3>
    </>
  );
};
export default Arrays;
