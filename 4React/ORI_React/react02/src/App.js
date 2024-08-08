import "./App.css";
import CryptoJS from "crypto-js";

function App() {
  let message, nonce, path, privateKey;
  message = "안녕";
  nonce = 12345; // 원래는 한번만 사용하고 변하는 값이여야 하나 테스트로 사용
  path = "test1234";
  privateKey = "123456"; // 문자열로 변환

  const hashDigest = CryptoJS.SHA256(nonce.toString() + message).toString(
    CryptoJS.enc.Hex
  );
  const hmacDigest = CryptoJS.HmacSHA512(path + message, privateKey).toString();
  const hmacDigestTest = CryptoJS.HmacSHA512(message, privateKey).toString();
  const hmacDigestAB64e = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA512(path + message, privateKey)
  );
  const aesCrypt = CryptoJS.AES.encrypt(message, privateKey).toString();
  const aesDecrypt = CryptoJS.AES.decrypt(aesCrypt, privateKey).toString(
    CryptoJS.enc.Utf8
  ); // 복호화시에 enc을 맞추어 줘야지 제대로 표시된다.
  // 암호화되는 과정에서 bit단위로 변경되어 암호화되므로 어떠한 방식으로 인코딩되었는지 알 수 없다.
  // 인코딩을 맞춰주지 않으면 알수 없는 이상한 값이 뜰 수 있다.
  console.log(message);
  console.log(hashDigest);
  console.log(hmacDigest);
  console.log(hmacDigestTest);
  console.log(hmacDigestAB64e);
  console.log(aesCrypt);
  console.log(aesDecrypt);

  return (
    <>
      <div>
        <div>암호화 대상 메시지 : {message}</div>
        <div>nonce 문자열을 첨가한 SHA256 : {hashDigest}</div>
        <div>path문자열을 첨가한 HmacSHA512 : {hmacDigest}</div>
        <div>message만 HmacSHA512 : {hmacDigestTest}</div>
        <div>
          path문자열을 첨가한 HmacSHA512 해쉬후 base64로 인코딩 :{" "}
          {hmacDigestAB64e}
        </div>
        <div>AES 암호화 : {aesCrypt}</div>
        <div>AES 복호화 : {aesDecrypt}</div>
        <hr></hr>
        <hr></hr>
        <div>
          <ul>
            <h2>참조</h2>
            <li>
              <strong>nonce</strong>는 암호학과 컴퓨터 보안에서 자주 사용되는
              용어로, <strong>"number used once"</strong>의 약자입니다.
            </li>
            <li>
              주로 <strong>일회용 숫자나 값</strong>으로 사용됩니다.
            </li>
            <li>nonce는 여러 상황에서 중요한 역할을 합니다.</li>
            <li>
              예를 들어, <u>암호화 작업, 인증, 해시 생성 등</u>에서{" "}
              <strong>
                재사용 공격을 방지하고 데이터의 무결성을 보장하기 위해
              </strong>{" "}
              사용됩니다.
            </li>
          </ul>
          <br></br>
          <ol>
            <h2>nonce의 주요 특징과 역할</h2>
            <li>
              <strong>유일성 (Uniqueness):</strong>
              <ul>
                <li>nonce는 각 요청마다 고유해야 합니다.</li>
                <li>같은 nonce 값이 두 번 사용되면 안 됩니다.</li>
                <li>
                  이렇게 함으로써 재사용 공격(replay attack)을 방지할 수
                  있습니다.
                </li>
              </ul>
            </li>
            <li>
              <strong>무작위성 (Randomness):</strong>
              <ul>
                <li>
                  무작위로 생성된 nonce는 예측 가능성을 줄여 보안성을 높입니다.
                </li>
                <li>이는 특히 암호화 프로토콜에서 중요합니다.</li>
              </ul>
            </li>
            <li>
              <strong>시간 기반 (Time-based):</strong>
              <ul>
                <li>일부 시스템에서는 시간 기반 nonce를 사용합니다.</li>
                <li>
                  {" "}
                  예를 들어, 현재 타임스탬프를 nonce로 사용할 수 있습니다.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
