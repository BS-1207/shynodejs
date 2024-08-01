const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser"); // 모듈 import, Express v4.16.30이상은 포함되어 설치 생략 가능

const app = express();
const port = 3000;

app.use(logger());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true, // 세션에 대한 옵션들
  })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.send(
      `<h2>${req.session.username}님 환영합니다.</h2>
       <h2>${req.session.username}님의 개인공간입니다.</h2>
       <h3>대충 개인 데이터 베이스 목록</h3>
       <button onclick="location.href='/logout'">로그아웃</button>
      `
    );
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/login", (req, res) => {
  const loginhtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
</head>
<body>
    <fieldset>
        <legend>Login</legend>
        <form action="/login" method="POST">
            <label for="id">Username:</label><input type="text" id="un" name="un" ><br>
            <label for="pw">Password:</label><input type="password" id="pw" name="pw"><br>
            <button type="submit">Login</button></form>
        </form>
    </fieldset>
</body>
</html>`;
  res.send(loginhtml);
});

app.post("/login", (req, res) => {
  const { un, pw } = req.body; // get방식은 Query
  console.log(un, pw);
  if (un === "test" && pw == "1234") {
    req.session.loggedIn = true;
    req.session.username = un;
    res.redirect("/");
  } else {
    res.send(
      `<h3>정상적인 로인이 필요합니다</h3><button onclick="location.href='/' ">로그인창으로</button>`
    );
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
