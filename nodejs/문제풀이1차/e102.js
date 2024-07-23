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
  console.log("웹 정상 접속입니다.");
  res.sendFile(__dirname + "/e101.html");
});

app.post("/", (req, res) => {
  const { id, pw } = req.body; // get방식은 Query
  console.log(id, pw);
  //const idOK = /^[A-Za-z0-9]{1,8}$/g.test(id); //방법1, true or false 반환
  //const pwOK = pw.match(/^[A-Za-z0-9!@#$%^&*]{1,10}$/g); // 방법2, 정규표현식에 일치한
  console.log(idOK, pwOK);
  if (idOK && !!pwOK) {
    if (id === "admin" && pw === "123456") {
      res.send(`<!DOCTYPE html>
                <html lang="ko">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>관리자 로그인</title>
                <style>
                body {
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100vh;
                margin: 0;
                }
                h1 {
                margin-bottom: 20px;
                }
                .button {
                display: inline-block;
                margin: 10px;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                }
                .button:last-child {
                background-color: orangered;
                }
                .button:hover {
                background-color: skyblue;
                }
                </style>
                </head>
                <body>
                <fieldset>
                <form method="POST" action="/">
                <legend><h1>관리자로 로그인 하셨습니다.</h1></legend>
                <input type="button" value="회원관리" class="button" />
                <input type="button" value="회원삭제" class="button" />
                </form>
                </fieldset>
                </body>
                </html>
                `);
    }
    res.send("로그인이 되었습니다.");
  } else {
    res.send("<script>alert('로그인 정보가 잘못되었습니다.')</script>");
  }
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port} 로 서비스 중입니다.`);
});
