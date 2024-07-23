const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(logger());
app.use(bodyParser.urlencoded({ extends: true }));

// const { username, password } = req.body; {키 : 값, 키 : 값,.....} 키=값
// const { username:username, password:password } = req.body;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.post("/", (req, res) => {
  const { id, pw } = req.body; // get방식은 Query
  console.log(id, pw);
  const idOK = /^[A-Za-z]{1,7}$/g.test(id); //방법1, true or false 반환
  const pwOK = pw.match(/^[A-Za-z0-9]{1,9}$/g); // 방법2, 정규표현식에 일치한
  console.log(idOK, pwOK);
  if (idOK && !!pwOK) {
    res.send("로그인이 되었습니다.");
  } else {
    res.send("<script>alert('로그인 정보가 잘못되었습니다.')</script>");
  }
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port} 로 서비스 중입니다.`);
});
