const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser"); // 모듈 import, Express v4.16.30이상은 포함되어 설치 생략 가능

const app = express();
const port = 3000;

app.use(logger());
app.use(bodyParser.urlencoded({ extends: true }));
/* body-parser는 Express.js에서 사용되는 미들웨어 중 하나로, 요청 본문을 해석(parse)하는 역할
 *	bodyParser.urlencoded(): URL-encoded 데이터 해석.
 * { extended: true } 옵션
 *	• { extended: false }: 쿼리스트링 모듈을 사용하여 단순한 키-값 쌍으로 데이터를 해석합니다.
 *	• { extended: true }: qs 모듈(또는 querystring 모듈)을 사용하여 복잡한 객체와 배열을 포함할 수 있는 데이터 구조로 해석합니다.
 */

app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true, // 세션에 대한 옵션들
  })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.send(`
      <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>로그인 성공</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        color: darkslategrey;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }

      .container {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      h1 {
        color: yellowgreen;
      }

      p {
        font-size: 1.2em;
      }

      strong {
        color: gold;
      }

      button {
        border: none;
        font-size: 20px;
        font-weight: bold;
        background-color: rgb(146, 239, 242);
        border-radius: 4px;
      }

      button:last-child {
        background-color: #d8a786;
        border-radius: 4px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>성공적으로 로그인 되었습니다.</h1>
      <p><h2>안녕하세요! <strong>${req.session.username}</strong> 님!</h2></p>
      <button onclick="location.href='/logout'">나가기</button>
      <button>회원정보보기</button>
    </div>
  </body>
</html>
`);
  } else {
    res.sendFile(`${__dirname}/login2.html`);
  }
});
app.post("/login", (req, res) => {
  const { id, pw } = req.body; // get방식은 Query
  //console.log(typeof un, un, typeof pw, pw);
  //const Exg = /^[A-Za-z0-9]@{1,8}/g
  //const i=Exg.test(un); //true or false 변환 방법1 문법1
  const idOK = /^[A-Za-z]{1,8}$/g.test(id); //방법 1 문법2
  const pwOK = pw.match(/^[A-Za-z0-9]{1,8}$/g); //방법 2
  console.log(`idOK : ${idOK} pwOK : ${pwOK}`);
  console.log(`idOK : ${idOK} pwOK : ${!!pwOK}`);

  if (idOK && !!pwOK) {
    if (id === "test" && pw == "1234") {
      req.session.loggedIn = true;
      req.session.username = id;
      res.redirect("/");
    } else {
      res.send(
        `<h3>정상적인 로인이 필요합니다</h3><button onclick="location.href='/' ">로그인창으로</button>`
      );
    }
  } else {
    res.send(`<script>
        alert("입력조건이 맞지 않습니다. 다시 로그인해주세요!");
        window.location.href='/';
        </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃이 완료되었습니다');window.location.href='/'</script>`
    ); //script window.location.href BoM영역 컨트롤
  });
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port} 로 서비스 중입니다.`);
});
