import CryptoJS from "crypto-js";

import { useState } from "react";
const Cryp = () => {
  const [oid, setOid] = useState(""); //아이디
  const [opw, setOpw] = useState(""); //패스워드
  const [encrypt, setEncrypt] = useState(""); //암호화값
  const [decrypt, setDecrypt] = useState(""); //복호화값
  const [key, setKey] = useState(""); //salt
  const [skey, setSkey] = useState(""); //양방향 비밀키
  const [sha, setSha] = useState(""); //단방향 암호화 해쉬
  const [shasalt, setShaSalt] = useState(""); //설트를 포함한 해쉬 값
  //const secretkey = "123456";

  /* 데이터 암호화 함수 */
  const encryptFn = () => {
    const data = { id: oid, pw: opw };
    const encData = CryptoJS.AES.encrypt(JSON.stringify(data), skey).toString();
    setEncrypt(encData);
  };
  /* 데이터 복호화 함수 */
  const decryptFn = () => {
    try {
      //모니터링
      const bytes = CryptoJS.AES.decrypt(encrypt, skey);
      setDecrypt(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    } catch (error) {
      console.error("복호화 오류", error);
      alert("복호화에 실패하였습니다. 암호키를 확인하세요."); //모니터링 시 발생하는 문제(에러) 캐치
    } finally {
      alert("암호키 관리에 주의하세요.");
    } //무조건 실행 (생략 가능)
  };
  /* 데이터 단방향(해쉬) 함수 */
  const sha256Fn = () => {
    const data = { id: oid, pw: opw };

    const encData = CryptoJS.SHA256(
      JSON.stringify(data),
      key ? key : ""
    ).toString(); //salt 개념- rainbowtable을 무력화
    key ? setShaSalt(encData) : setSha(encData);
  };

  /* 암호화 핸들러 */
  /* 아이디값 핸들러 */
  const handleIdChange = (e) => setOid(e.target.value);
  /* 비밀번호값 핸들러 */
  const handlePwChange = (e) => setOpw(e.target.value);
  /* 입력 암호키 핸들러 */
  const handleKeyInput = (e) => setKey(e.target.value);
  /* 복호화 핸들러 */
  /* 암복호화키 핸들러 */
  const handleKeyChange = (e) => setSkey(e.target.value);

  /* 단방향(해쉬) 핸들러 */

  return (
    <>
      <h1>2. 암호화 복호화</h1>
      <div>
        ID : <input type="text" onChange={handleIdChange} value={oid} />
      </div>
      <div>
        PW : <input type="password" onChange={handlePwChange} value={opw} />
      </div>
      <br />
      <button onClick={encryptFn} disabled={!(oid && opw && skey)}>
        암호화
      </button>
      <div>
        복호화 암호키
        <input type="text" onChange={handleKeyChange} value={skey} />
      </div>
      <button onClick={decryptFn} disabled={!(encrypt && skey)}>
        복호화
      </button>

      <div>
        암호화전 원문: {oid && opw && JSON.stringify({ id: oid, pw: opw })}
      </div>
      <br />
      <div>암호문 : {`${encrypt} 글자수 : ${encrypt.length}`}</div>
      <br />
      <hr />
      <br />
      {decrypt &&
        `복호화된 데이터 : ID는 ${decrypt.id}
      <br /> PASSWORD는 ${decrypt.pw}`}
      <br />
      {decrypt && JSON.stringify(decrypt)}
      <hr />
      <div>
        salt
        <input type="text" onChange={handleKeyInput} value={key} />
      </div>
      <button onClick={sha256Fn} disabled={!key}>
        salt를 포함한 해쉬 생성
      </button>
      <button onClick={sha256Fn}>단방향 암호화하기(해쉬)</button>
      <br />
      {}
      <br />
      {shasalt && key
        ? `SHA256 + salt 해쉬 : ${shasalt} | 길이 : ${shasalt.length}`
        : `SHA256 해쉬 : ${sha} | 길이 : ${sha.length}`}
    </>
  );
};
export default Cryp;
