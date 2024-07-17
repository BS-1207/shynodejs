const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
let list = "";

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
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.get("/list", (req, res) => {
  db.query("SELECT * from web2", (err, results) => {
    const data = results;
    let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
    list += `    <title>리스트</title>`;
    list += `    <style>`;
    list += `        table {`;
    list += `            border-collapse: collapse;`;
    list += `            text-align: center;`;
    list += `            width: 80%;`;
    list += `            margin: auto;`;
    list += `        }`;
    list += ``;
    list += `        th,`;
    list += `        tr,`;
    list += `        td {`;
    list += `            border: 1px solid #ccc;`;
    list += `        }`;
    list += ``;
    list += `        td {`;
    list += `            width: 20%;`;
    list += `        }`;
    list += ``;
    list += `        h2 {`;
    list += `            text-align: center;`;
    list += `        }`;
    list += ``;
    list += `        th {`;
    list += `            background-color: lightblue;`;
    list += `        }`;
    list += `    </style>`;
    list += `</head>`;
    list += ``;
    list += `<body>`;
    list += `    <!-- table>tr>th*5^tr>td*5 -->`;
    list += `    <h2>리스트</h2>`;
    list += `    <table>`;
    list += `        <tr>`;
    list += `            <th>아이디</th>`;
    list += `            <th>패스워드</th>`;
    list += `            <th>이름</th>`;
    list += `            <th>이메일</th>`;
    list += `        </tr>`;

    data.forEach((v) => {
      list += `        <tr>`;
      list += `            <td>${v.id}</td>`;
      list += `            <td>${v.password}</td>`;
      list += `            <td>${v.name}</td>`;
      list += `            <td>${v.email}</td>`;
      list += `        </tr>`;
    });

    list += `<button type="button" onclick="location.href='/' ">회원가입으로</button>`;
    list += `    </table>`;
    list += `</body>`;
    list += ``;
    list += `</html>`;
    res.send(list);
  });
});

app.get("/data", (req, res) => {
  const { id, passwd, name, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, password, name, email) VALUES (?,?,?,?)",
    [id, passwd, name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        `id: ${id}, password : ${passwd}, name: ${name}, dob: ${email}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
