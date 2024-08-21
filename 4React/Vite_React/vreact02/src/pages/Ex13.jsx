import axios from "axios";
import { useState } from "react";
const Urlcard = () => {
  //style
  const mainDiv = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  };
  const card = {
    backgroundColor: "lightskyblue",
    border: "none",
    borderRadius: "1rem",
    margin: "0",
    padding: "0.5rem",
  };
  const contentDiv = {
    margin: "0",
    marginTop: "0.3rem",
    padding: "0.2rem",
    fontWeight: "bold",
  };
  const imgc = {
    width: "180px",
    height: "150px",
    borderRadius: "1rem",
  };
  //주소값 갱신
  const [rdata, setRdata] = useState([]);
  const url = "https://api.thedogapi.com/v1/images/search";
  const apiKey = import.meta.env.VITE_DOGKEY;
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": `${apiKey}`,
  };
  const params = {
    size: "med",
    mime_types: "jpg",
    format: "json",
    has_breeds: "true",
    order: "RANDOM",
    page: "0",
    limit: "15",
  };

  const getApi = () => {
    //axios.get(request).then((res) => console.log(res));
    axios.get(url, { headers, params }).then((res) => {
      const result = res.data;
      setRdata(result);
    });
  };
  const Cards = (props) => {
    //props 객체 상속
    return (
      <>
        <img src={props.url} style={imgc} />
        <div style={contentDiv}>
          댕댕입니다.
          <p>id는 : {props.id}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <h1>13. 컴포넌트 식으로 카드형 폼을 구현</h1>
      <div>
        <button onClick={getApi}>외부서버 수신</button>
        <div>외부서버에서 받은 값 : </div>
        <div style={mainDiv}>
          {rdata.map((pic) => {
            return (
              <div key={pic.id} style={card}>
                <Cards url={pic.url} id={pic.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Urlcard;
