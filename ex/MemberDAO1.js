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
  res.sendFile(`${__dirname}/index.html`);
});
app.post("/", (req, res) => {
  if (req.session.loggedIn) {
    console.log("이걸로 호출됨");
    console.log(req.session.username);
    res.sendFile(`${__dirname}/index.html`);
    //res.sendFile(`${__dirname}/index.html`);
  } else {
    res.sendFile(`${__dirname}/index.html`);
  }
});
//<div class="profile background-image: url("${url}");">
app.post("/getUsername", (req, res) => {
  if (req.session.loggedIn) {
    const suer = req.session.username;
    const ctable = "card";
    const utable = "user";
    const query = `SELECT U.nick, C.banner, C.profile, C.intro FROM ${utable} U JOIN ${ctable} C ON U.id=C.id WHERE U.id = "${suer}"`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("mypage 정보를 가져오는 중 오류가 발생했습니다.");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("mypage 정보를 찾을 수 없습니다.");
        return;
      }
      const cardview = results[0];
      const nick = cardview.nick;
      const banner = cardview.banner;
      const profile = cardview.profile;
      const intro = cardview.intro;
      res.send(`
        <div class="card">
        <div class="banner" style="
          background-image: url('${banner}');
        ">
        <div class="profile" style="background-image: url('${profile}')">
          </div>
        </div>
        <h2 class="name">${nick}</h2>
        <div class="follow-btn" id="follow-btn"><button>follow</button></div>
        <div class="desc">${intro}</div>
        </div>
        </div>`);
    });
  } else {
    res.send(`
        <div class="card">
          <div class="banner">
            <div class="profile">
            </div>
          </div>
          <h2 class="name">로그인 되지 않음</h2>
          <div class="follow-btn" id="follow-btn"><button>follow</button></div>
          <div class="desc">로그인 되지 않음</div>
        </div>
        `);
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
        <div class="card">
          <div class="banner">
            <div class="profile">
            </div>
          </div>
          <h2 class="name">로그인 되지 않음</h2>
          <div class="follow-btn" id="follow-btn"><button>follow</button></div>
          <div class="desc">로그인 되지 않음</div>
        </div>
        <script>alert("로그아웃이 성공하였습니다.");location.href='/';</script>`);
    });
  } else {
    res.send(
      `<script>alert("로그인 상태가 아닙니다.");location.href='/';</script>`
    );
  }
});

app.post("/list", (req, res) => {
  const table = "board";
  const query = `SELECT B.no, B.title, B.id, H.view_count, DATE_FORMAT(B.created_at,'%Y-%m-%d %T') AS created_at FROM ${table} B JOIN hit H ON B.no=H.no ORDER BY B.no DESC`;
  db.query(query, (err, result) => {
    let list = "";
    console.log("게시판 리스트 호출됨");
    result.forEach((v) => {
      list += `<tr><td>${v.no}</td><td>${v.title}</td><td>${v.id}</td>
      <td>${v.created_at}</td><td>${v.view_count}</td></tr>`;
    });
    res.send(list);
  });
});

app.post("/write", (req, res) => {
  const { wno, wdate, whit, wtitle, wwriter, wcontent } = req.body;
  console.log(wno, wdate, whit, wtitle, wwriter, wcontent);
  const table = "board";
  const query = `INSERT INTO ${table} (title, id, content) VALUES (?,?,?)`;
  db.query(query, [wtitle, wwriter, wcontent], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
    console.log(`title: ${wtitle}, writer : ${wwriter}, content: ${wcontent}`);
    console.log("Data inserted successfully");
  }); // MySQL query here
});

app.post("/content", (req, res) => {
  const { no } = req.body;
  const table = "board";
  const utable = "hit";
  const query = `SELECT B.no, B.title, U.nick, B.content, DATE_FORMAT(B.created_at,'%Y-%m-%d %T') AS created_at, H.view_count FROM ${table} B JOIN ${utable} H ON B.no=H.no JOIN user U ON B.id=U.id WHERE B.no = ?`;
  const cquery = `UPDATE ${utable} SET view_count = view_count + 1 WHERE no = ?`;

  db.query(cquery, [no], (err, hit) => {
    if (err) {
      console.error(err);
      res.status(500).send("게시판 조회수를 갱신하는 중 오류가 발생했습니다.");
      return;
    }
    if (hit.affectedRows === 0) {
      res.status(404).send("게시판 조회수 정보를 찾지 못했습니다.");
      return;
    }
    console.log("조회수 갱신 완료: " + hit.affectedRows);

    db.query(query, [no], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("게시판 정보를 가져오는 중 오류가 발생했습니다.");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("게시판 정보를 찾을 수 없습니다.");
        return;
      }
      const board = results[0];
      console.log(results[0].created_at.toString());
      console.log(typeof results[0].created_at.toString());

      const bcontent = `
        <div id="firstLine">
          <div id="wno">게시번호 <input type="text" id="wnoi" name="ino" class="inpel" value="${board.no}" readonly/></div>
          <div id="firstLineR">
            <div id="wdate">작성일시 <input type="text" id="wdatei" name="idate" class="inpel" value="${board.created_at}" readonly/></div>
            <div id="whit">조회수 <input type="text" id="whiti" name="ihit" class="inpel" value="${board.view_count}" readonly/></div>
          </div>             
        </div>
        <div id="secondLine">제목 <input type="text" id="wtitlei" name="ititle" class="inpel" value="${board.title}" readonly/></div>
        <div id="thirthLine">작성자 <input type="text" id="wwriteri" name="iwriter" class="inpel" value="${board.nick}" readonly/></div>
        <div id="forthLine">
          <h5>내용</h5>
          <textarea id="wcontenti" name="iwcontent" readonly>${board.content}</textarea>
        </div>`;
      res.send(bcontent);
    });
  });
});

app.post("/delete", (req, res) => {
  const table = "board";
  const { ino, idate, ihit, ititle, inick, icontent } = req.body;
  const dquery = `DELETE FROM ${table} WHERE no=${ino}`;
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
    const board = results[0];
    res.send(`<script>alert("게시글 삭제 성공");location.href='/'</script>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
