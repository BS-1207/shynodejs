import "./Join.css";
import { useState } from "react";
import Cryptojs from "crypto-js";

function Join() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });
  const [encrypt, setEncrypt] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });
  const secretkey = "123456";

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const data = { ...formData, [name]: value }; // 업데이트된 formData
    console.log(data);
    // 암호화 작업
    const encrypted = Cryptojs.AES.encrypt(
      JSON.stringify(data),
      secretkey
    ).toString(); //이후 객체 형태를 받아 각 키 마다 다시 암호화 된 값을 encrypted로 갱신함
    setEncrypt((prevEncrypt) => ({
      ...prevEncrypt,
      [name]: encrypted,
    }));
    console.log(encrypt);
  };
  return (
    <>
      <div className="all">
        <div className="jCtn">
          <h2>회원가입</h2>
          <form action="/join" method="POST">
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름"
              onChange={handleInput}
              value={formData.name}
              required
            />
            <label htmlFor="email">이메일:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="이메일"
              onChange={handleInput}
              value={formData.email}
              required
            />
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="아이디"
              pattern="[A-Za-z0-9]{1,8}"
              onChange={handleInput}
              value={formData.id}
              required
            />
            <label htmlFor="pw">Password:</label>
            <input
              type="password"
              id="pw"
              name="password"
              placeholder="비밀번호"
              onChange={handleInput}
              value={formData.password}
              required
            />
            <button type="submit">가입하기</button>

            <button type="reset" className="reset-btn">
              다시 입력
            </button>
          </form>
        </div>
        <div className="jCtn">
          <h2>회원가입</h2>
          <form action="/join" method="POST">
            <label htmlFor="name2">이름:</label>
            <input
              type="text"
              id="name2"
              name="name"
              placeholder="이름"
              value={encrypt.name}
              required
            />
            <label htmlFor="email2">이메일:</label>
            <input
              type="text"
              id="email2"
              name="email"
              placeholder="이메일"
              value={encrypt.email}
              required
            />
            <label htmlFor="id2">ID:</label>
            <input
              type="text"
              id="id2"
              name="id"
              placeholder="아이디"
              pattern="[A-Za-z0-9]{1,8}"
              value={encrypt.id}
              required
            />
            <label htmlFor="pw2">Password:</label>
            <input
              type="password"
              id="pw2"
              name="password"
              placeholder="비밀번호"
              value={encrypt.password}
              required
            />
            <button type="submit">가입하기</button>

            <button type="reset" className="reset-btn">
              다시 입력
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Join;
