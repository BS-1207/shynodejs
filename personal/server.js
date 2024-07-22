const express = require("express");
const mysql = require("mysql");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
let list = "";

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

const db = mysql.createConnection({
  host: "192.168.0.218",
  user: "cbs",
  port: 3306,
  password: "Notorious82!",
  database: "web2",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

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
    res.sendFile(`${__dirname}/index.html`);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/login.html`);
});

app.post("/login", (req, res) => {
  const { un, pw } = req.body; // get방식은 Query
  console.log(un, pw);
  db.query(
    `select count(*) as c from web2
    where strcmp(id, '${un}') = 0 
    and strcmp(password, '${pw}') = 0`,
    (err, results) => {
      console.log(results);
      console.log(results[0].c);
      if (results[0].c == 1) {
        req.session.loggedIn = true;
        req.session.username = un;
        res.redirect("/");
      } else {
        res.send(
          `<h3>정상적인 로인이 필요합니다</h3><button onclick="location.href='/' ">로그인창으로</button>`
        );
      }
    }
  );
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
