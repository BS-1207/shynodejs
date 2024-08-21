import axios from "axios";
import { useState } from "react";
import ex11css from "./Ex11.module.Css";
const Axi = () => {
  const [sdata, setSdata] = useState({ username: "", password: "" });
  const [mydata, setMydata] = useState("");
  const [rdata, setRdata] = useState([]);
  const url = "https://api.thedogapi.com/v1/images/search";
  const param =
    "size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10";
  const request = url + "?" + param;

  const handleInput = (e) =>
    setSdata((preData) => ({ ...preData, [e.target.name]: e.target.value })); // ... 스프레스 연산자,에 e.target.name을 가지는 것에 e.target.value로 반환 입력 중요

  const sendPost = () => {
    axios.post("/data", sdata).then((res) => console.log(res.data)); //보내고 응답이 있을시 then으로 받음
  };

  const myAPi = () => {
    axios.get("/api").then((res) => setMydata(res.data));
  };
  const getApi = () => {
    //axios.get(request).then((res) => console.log(res));
    axios.get(request).then((res) => {
      const result = res.data;
      setRdata(result);
    });
  };
  return (
    <>
      <h1>11. AXIOS로 데이터 통신</h1>
      <div>
        <h3>nodejs 서버 동작 필요</h3>
        <div>서버로 보내는 값:</div>
        <table>
          <tr>
            <td>ID:</td>
            <td>
              <input
                type="text"
                name="username"
                onChange={handleInput}
                value={sdata.username}
                className={ex11css.input}
              />
            </td>
          </tr>
          <tr>
            <td>PW:</td>
            <td>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                value={sdata.password}
                className={ex11css.input}
              />
            </td>
          </tr>
          <tr>
            <td cols={2}>
              <button onClick={sendPost}>전송</button>
            </td>
          </tr>
        </table>
      </div>
      <hr />
      <div>
        <button onClick={myAPi}>내부 수신</button>
        <div>내부서버에서 받은 값 :</div>
        <div> {mydata} </div>
        <hr />
        <button onClick={getApi}>외부서버 수신</button>
        <div>외부서버에서 받은 값 : </div>
        <div className={ex11css.picDiv}>
          {rdata.map((pic) => {
            return (
              <div key={pic.id} className={ex11css.picDivEach}>
                <img src={pic.url} width="100px" height="100px" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Axi;
