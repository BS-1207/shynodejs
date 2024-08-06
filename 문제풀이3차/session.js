const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); //모듈 import. Express v4.16.0이상은 설치 생략 가능
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/ToDoList.html");
  } else {
    res.sendFile(__dirname + "/ToDoListNotLogin.html");
  }
});

app.get("/join", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { id, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(id); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (id === "user" && password == "1234") {
      req.session.loggedIn = true;
      req.session.id = id;
      res.redirect("/");
    } else {
      res.send(`
        <h3>정상적인 로그인이 필요합니다.</h3>
        <h4> 회원이 아니신 분은 회원가입을 해주세요.</h4>
        <button onclick="location.href='/'">뒤로가기</button>
        <button onclick="location.href='/join'">가입하기</button>
        `);
    }
  } else {
    res.send(`<script>
      alert('입력조건이 맞지 않습니다. 다시 작성해 주세요!');
      window.location.href='/login';
      </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃이 되었습니다!!');window.location.href='/'</script>`
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
