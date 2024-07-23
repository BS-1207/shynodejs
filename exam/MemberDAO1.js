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
  res.sendFile(__dirname + "/memberform.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.get("/list", (req, res) => {
  const table = "web2";
  const que = `SELECT * FROM ${table}`;
  db.query(que, (err, result) => {
    let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>리스트</title>
    <style>
    table {
                border-collapse: collapse;
                text-align: center;
                width: 80%;
                margin: auto;
            }
            th,
            tr,
            td {
                border: 1px solid #ccc;
            }
            td {
                width: 20%;
            }
            h2 {
                text-align: center;
            }
            th {
                background-color: lightblue;
            }
            #back {
                background-color: black;
                color: white;
                margin-top: 20px;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;}
            #back:hover {
                background-color: gray;
                color: white;
                transition-delay: 2;}
        </style>
    </head>
    <body>
        <h2>데이터베이스 내용</h2>
        <button type="button" onclick="location.href='/'" id="back">뒤로 가기</button><br><br>
        <table>
            <tr>
                <th>No.</th>
                <th>아이디</th>
                <th>이름</th>
                <th>나이</th>
                <th>이메일</th>
            </tr>`;
    result.forEach((v) => {
      list += `<tr><td>${v.num}</td><td>${v.id}</td><td>${v.name}</td>
      <td>${v.age}</td><td>${v.email}</td></tr>`;
    });
    list += `</table>
    </body>
    </html>`;
    res.send(list);
  });
});

app.get("/data", (req, res) => {
  const { id, name, age, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, name, age, email) VALUES (?,?,?,?)",
    [id, name, age * 1, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(`<script>alert("데이터 입력 성공");location.href='/'</script>`);
      console.log(`id: ${id}, name : ${name}, age: ${age}, email: ${email}`);
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
