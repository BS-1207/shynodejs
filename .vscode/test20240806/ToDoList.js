const express = require("express");
const { Client } = require("pg");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
let list = "";

app.use(logger());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new Client({
  user: "cbs",
  host: "192.168.0.218",
  database: "test_db",
  password: "Notorious82!",
  port: 5432,
});

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

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/ToDoList.html`);
});
app.post("/", (req, res) => {
  if (req.session.loggedIn) {
    console.log("이걸로 호출됨");
    console.log(req.session.username);
    res.sendFile(`${__dirname}/ToDoList.html`);
    //res.sendFile(`${__dirname}/index.html`);
  } else {
    res.sendFile(`${__dirname}/ToDoList.html`);
  }
});

app.post("/join", (req, res) => {
  const table = "user";
  const ctable = "card";
  const { jid, jpasswd, jname, jnick, jbirth, jdesc } = req.body;
  const query = `INSERT INTO ${table} (id, password, nick, name, birthday) VALUES (?,?,?,?,?)`;
  console.log(jid, jpasswd, jname, jnick, jbirth, jdesc);
  const cquery = `INSERT INTO ${ctable} (id, intro) VALUE ("${jid}", "${jdesc}");`;
  db.query(query, [jid, jpasswd, jnick, jname, jbirth], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  db.query(cquery, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  }); // MySQL query here
  res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
  console.log(
    `id: ${jid}, password : ${jpasswd}, name: ${jname}, nick: ${jnick}, birth: ${jbirth}, desc: ${jdesc}`
  );
  console.log("Data inserted successfully");
});

app.post("/login", (req, res) => {
  const table = "user";
  const { id, passwd } = req.body; // get방식은 Query
  console.log(id, passwd);
  const lquery = `select count(*) as c from ${table}
    where strcmp(id, '${id}') = 0 
    and strcmp(password, '${passwd}') = 0`;
  db.query(lquery, (err, results) => {
    if (results[0].c == 1) {
      if (id == "admin") {
        req.session.loggedIn = true;
        req.session.adminIn = true;
        /*if (!req.session.num) {
          req.session.num = 1;
        } else {
          req.session.num += 1;
        }*/
        req.session.username = id;
        console.log("관리자가 로그인하였습니다.");
        res.status(308).location("/").send();
      } else {
        req.session.loggedIn = true;
        req.session.username = id;
        res.status(308).location("/").send();
      }
      console.log(req.session);
      console.log(req.sessionID);
      console.log(req.session.username);
      console.log(`${id}로그인에 성공하였습니다.`);
    } else {
      res.send(
        `<script>alert("로그인에 실패했습니다.");location.href='/';</script>`
      );
    }
  });
});

app.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((e) => {
      if (e) console.error(e);
      res.send(`
        <script>alert("로그아웃이 성공하였습니다.");location.href='/';</script>`);
    });
  } else {
    res.send(
      `<script>alert("로그인 상태가 아닙니다.");location.href='/';</script>`
    );
  }
});

app.post("/list", (req, res) => {
  if (req.session.loggedIn) {
    console.log("이걸로 호출됨");
    console.log(req.session.username);
    const table = "todo";
    const query = `SELECT no, toto, TO_CHAR(dday, 'YYYY-MM-DD') AS dday, checkb, done FROM ${table} WHERE id=${req.session.username}`;
    db.query(query, (err, result) => {
      let list = "";
      console.log("To Do List 호출됨");
      result.forEach((v) => {
        list += `<tr><td>${
          v.done == true
            ? '<input type="checkbox" checked disabled>'
            : v.checkb == false
            ? '<input type="checkbox">'
            : '<input type="checkbox" checked>'
        }</td><td>${v.no}</td><td>${v.todo}</td><td>${
          v.dday
        }</td><td><button type="button" data-no="${
          v.no
        }">삭제</button></td></tr>`;
      });
      res.send(list);
    });
  } else {
    res.sendFile(`${__dirname}/ToDoList.html`);
  }
});

app.post("/insert", (req, res) => {
  if (req.session.loggedIn) {
    const { todo, dday } = req.body;
    console.log(req.body);
    console.log(todo, dday);
    const table = "todo";
    const query = `INSERT INTO ${table} (id, todo, dday) VALUES (?,?)`;
    db.query(query, [req.session.username, todo, dday], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
      console.log(
        `id: ${req.session.username} todo: ${todo}, writer : ${dday}`
      );
      console.log("Data inserted successfully");
    }); // MySQL query here
  } else {
    res.sendFile(`${__dirname}/ToDoList.html`);
  }
});

//삭제 로직 - 특정 값을 플래그로 삭제 분기를 주고 싶음 삭제 기능 메소드화
app.post("/delete", (req, res) => {
  if (req.session.loggedIn) {
    const table = "todo";
    const no = req.body.no;
    console.log(no);
    const dquery = `DELETE FROM ${table} WHERE id=${req.session.username} AND no=${no}`;
    db.query(dquery, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("게시판 정보를 가져오는 중 오류가 발생했습니다.");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("게시판 정보를 찾을 수 없습니다.");
        return;
      }
      res.send(`<script>alert("게시글 삭제 성공");location.href='/'</script>`);
    });
  } else {
    res.sendFile(`${__dirname}/ToDoList.html`);
  }
});

app.post("/done", (req, res) => {
  if (req.session.loggedIn) {
    const table = "todo";
    const no = req.body.no;
    console.log(no);
    //갯수에 따른 반복 필요
    const dquery = `UPDATE ${table} SET checkb=true, done=true WHERE id=${req.session.username} AND no=${no}`;
    db.query(dquery, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("게시판 정보를 가져오는 중 오류가 발생했습니다.");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("게시판 정보를 찾을 수 없습니다.");
        return;
      }
      res.send(`<script>alert("게시글 삭제 성공");location.href='/'</script>`);
    });
  } else {
    res.sendFile(`${__dirname}/ToDoList.html`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
