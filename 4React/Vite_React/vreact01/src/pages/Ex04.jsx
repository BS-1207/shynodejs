import { useState } from "react";
import rlist from "./ex03.js";

const Radio = () => {
  const [chk, setChk] = useState({});
  const handleChk = (e) => {
    const { value, checked } = e.target;
    // const { value:value, checked:checked } = {value:e.target.value, checked:e.target.checked}
    setChk((prev) => ({
      // ...prv,
      [value]: checked,
    }));
  };
  return (
    <>
      <h1>4. 라디오확인</h1>
      {rlist.map((v) => {
        return (
          <div key={v}>
            <input type="radio" name="subject" onChange={handleChk} value={v} />
            {v} <br />
          </div>
        );
      })}
      <h3>선택결과:{JSON.stringify(chk)}</h3>
    </>
  );
};
export default Radio;
