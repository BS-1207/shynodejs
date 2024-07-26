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
  database: "test_db",
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
    res.sendFile(`${__dirname}/index.html`);
  } else {
    res.sendFile(`${__dirname}/index.html`);
  }
});

app.post("/join", (req, res) => {
  const table = "user";
  const { user, passwd, name, nick, birth } = req.body;
  console.log(user, passwd, name, nick, birth);
  db.query(
    "INSERT INTO ${user} (id, password, nick, name, birthday) VALUES (?,?,?,?,?)",
    [user, passwd, nick, name, birth],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
      console.log(
        `id: ${user}, password : ${passwd}, name: ${name}, nick: ${nick}, birth: ${birth}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.post("/login", (req, res) => {
  const table = "user";
  const { id, passwd } = req.body; // get방식은 Query
  console.log(id, passwd);
  db.query(
    `select count(*) as c from ${table}
    where strcmp(id, '${id}') = 0 
    and strcmp(password, '${passwd}') = 0`,
    (err, results) => {
      console.log(results);
      console.log(results[0].c);
      if (results[0].c == 1) {
        req.session.loggedIn = true;
        req.session.username = id;
        console.log("로그인에 성공하였습니다.");
        //로그인 이후 처리하여 버튼 표시 및 게시판 리스트 클릭 가능하게 트리깅 필요함
        res.redirect("/");
      } else {
        res.send(
          `<h3>정상적인 로인이 필요합니다</h3><button onclick="location.href='/' ">로그인창으로</button>`
        );
      }
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃이 완료되었습니다');window.location.href='/'</script>`
    ); //script window.location.href BoM영역 컨트롤
  });
});

app.post("/list", (req, res) => {
  const table = "board";
  const que = `SELECT no, title, id, view_count, created_at FROM ${table}`;
  db.query(que, (err, result) => {
    let list = "";
    console.log(result);
    result.forEach((v) => {
      list += `<tr><td>${v.no}</td><td>${v.title}</td><td>${v.id}</td>
      <td>${v.created_at}</td><td>${v.view_count}</td></tr>`;
    });
    res.send(list);
  });
});

app.post("/write", (req, res) => {
  const { wno, wtitle, wwriter, wdate, whit, wcontent } = req.body;
  console.log(wno, wtitle, wwriter, wdate, whit, wcontent);
  db.query(
    "INSERT INTO board (title, id, content) VALUES (?,?,?)",
    [wtitle, wwriter, wcontent],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
      console.log(
        `title: ${wtitle}, writer : ${wwriter}, content: ${wcontent}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.get("/content", (req, res) => {
  //const {no, title, writer, content} = req.query;
  //?? 조회 및 삭제시 굳이 no 이회 다른 정보가 필요한가?
  const table = "board";
  const que = `SELECT * FROM ${table} WHERE ${no}`;
  db.query(que, (err, result) => {
    let list = "";
    result.forEach((v) => {
      list += `<tr><td>${v.no}</td><td>${v.title}</td><td>${v.writer}</td>
      <td>${v.createat}</td><td>${v.view_count}</td></tr>`;
    });
    res.send(list);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
