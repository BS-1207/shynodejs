import { useState } from "react";

const Lstorage = () => {
  let load = JSON.parse(localStorage.getItem("react04")) ?? [];
  /* 입력필드 값들*/
  const [data, setData] = useState({ in1: "", in2: "", in3: "" });

  /* 입력 핸들러 */
  const handleInputs = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value }); // {id:1, name:'hong' , id:2}
  };
  /* 데이터 입력버튼 */
  const save = () => {
    console.log("Saving data:", data);
    const updateArr = [...load, data];
    localStorage.setItem("react04", JSON.stringify(updateArr));
    load = updateArr; // 저장 후 load를 최신화
  };

  /*const save = () => {
    const updateArr = [...load, data];
    localStorage.setItem("react04", JSON.stringify(updateArr));
  };*/
  /*const save = () => {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(`react04_${key}`, JSON.stringify(value));
    });
  };*/
  /* 데이터 읽기버튼 */
  const read = () => {
    // 로컬 스토리지에서 데이터를 불러옴
    load = JSON.parse(localStorage.getItem("react04")) ?? [];
    console.table(load);
    let tList = "";

    if (load.length > 0) {
      load.forEach((row, index) => {
        // 각 row가 객체이므로, 객체의 키 값에 접근하여 출력합니다.
        tList += `<tr><td>${index}</td><td>${row.in1}</td><td>${row.in2}</td><td>${row.in3}</td></tr>`;
      });
    }

    // 테이블 내용 업데이트
    document.getElementById("tableList").innerHTML =
      tList || "저장소에 데이터가 없습니다.";
  };

  /*const read = () => {
    console.table(JSON.parse(localStorage.getItem("react04")));
    const data = JSON.parse(localStorage.getItem("react04"));
    /*tableList.innerHTML = " ";
    let tList = "";
    //h3.innerHTML = data ?? "저장소에 데이터가 없습니다.";
    for (let row of data) {
      tList += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.age}</td><td>${row.address}</td></tr>`;
    }
    tableList.innerHTML = tList ?? "저장소에 데이터가 없습니다.";*/
  /*};*/
  /* 데이터 삭제버튼 */
  const del = () => {
    localStorage.removeItem("react04");
  };
  return (
    <>
      <h1>3.로컬스토리지</h1>
      이름:{" "}
      <input id="in1" type="text" onChange={handleInputs} value={data.in1} />
      <br />
      나이:{" "}
      <input id="in2" type="text" onChange={handleInputs} value={data.in2} />
      <br />
      주소:{" "}
      <input id="in3" type="text" onChange={handleInputs} value={data.in3} />
      <br />
      <br />
      <button onClick={save} disabled={!(data.in1 && data.in2 && data.in3)}>
        저장하기
      </button>
      <button onClick={read}>불러오기</button>
      <button onClick={del}>삭제하기</button>
      <hr />
      <div>{JSON.stringify(data)}</div>
      <div>
        <h2>출력</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>이름</th>
              <th>나이</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody id="tableList">
            {/* 불러오기 버튼을 누르면 데이터가 여기 출력됨 */}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Lstorage;
