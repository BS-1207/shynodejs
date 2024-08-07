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
        <body style="width: 100%; height: 100%; margin: 0; padding: 0; background-image: url('https://media.istockphoto.com/id/2164464539/ko/%EC%82%AC%EC%A7%84/low-angle-view-of-stars-in-sky.jpg?s=2048x2048&w=is&k=20&c=3gou1gFfYvt_GVvp-iBbl4wlWtKkBMP_dCo1c_b6GRU=');">
          <div style="width: fit-content;background-color: beige; border: none; border-radius: 10px; padding: 1rem; display: flex; flex-direction: column; align-items: center; margin: 4rem auto;">
            <div style="width: fit-content; background-color: red;  border: none; border-radius: 10px; padding: 0.1rem 1rem; margin-bottom: 1rem; color: white">
              <h3>정상적인 로그인이 필요합니다.</h3>
              <h4> 회원이 아니신 분은 회원가입을 해주세요.</h4>
            </div>
            <div style="width: fit-content; border:none;">
              <button onclick="location.href='/login'" style="border:none; border-radius: 10px; background-color: cornflowerblue; color:white; padding: 0.7rem; margin-left: 0.3rem; font-size: 1rem; font-weight: bolder; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);">뒤로가기</button>
              <button onclick="location.href='/join'" style="border:none; border-radius: 10px; background-color: burlywood; color:white; padding: 0.7rem; margin-left: 0.3rem; font-size: 1rem; font-weight: bolder; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);">가입하기</button>
            </div>
          </div>
        </body>
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
