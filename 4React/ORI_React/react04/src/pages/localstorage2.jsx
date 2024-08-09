import { useState } from "react";

const Lstorage = () => {
  /* 입력필드 */
  const { data, setData } = useState({
    in1: "",
    in2: "",
    in3: "",
  });
  /* 핸들러 */
  const handleInputs = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value }); //{id:1, name:"hong", id:2}
  };
  /**/
  const save = () => {
    localStorage.setItem("react04", JSON.stringify(data));
  };
  const lsLoad = () => {};
  const lsDel = () => {};
  return (
    <>
      <h1>3. 로컬스토리지</h1>
      이름 :{" "}
      <input type="text" id="in1" onChange={handleInputs} value={data.in1} />
      <br />
      나이 :{" "}
      <input type="text" id="in2" onChange={handleInputs} value={data.in2} />
      <br />
      주소 :{" "}
      <input type="text" id="in3" onChange={handleInputs} value={data.in3} />
      <br />
      <hr />
      <br />
      <button>저장하기</button>
      <button>불러오기</button>
      <button>삭제하기</button>
      <hr />
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
export default Lstorage;
