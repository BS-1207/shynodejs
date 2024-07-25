const express = require("express");
const logger = require("morgan");
const path = require("path");
const multer = require("multer"); //파일 업로드 처리하는 미들웨어
const fs = require("fs");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");

app.use(express.json()); //JSON 데이터 해석하여 req.body에 저장
app.use(express.urlencoded({ extended: true })); // 확장개념 본문을 파싱

app.use(logger());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/file-list", (req, res) => {
  console.log("호출됨");
  fs.readdir(_path, (err, files) => {
    if (err) {
      return res.status(500).send("Failed to read directory");
      // 500 내부 서버 오류는 일반적인 HTTP 상태 코드로 서버에서 문제가 발생하였으나 문제의 구체적인 내용을 표시할 수 없음을 의미
    }
    let i = 0;
    const rows = files
      .map((file) => {
        const filePath = path.join(_path, file);
        const stats = fs.statSync(filePath);
        const creatdate = stats.birthtime.toLocaleString();
        return `
        <TR>
          <TD><INPUT TYPE="checkbox" NAME="checklist" VALUE="${i++}"></TD>
          <TD><A href="${file}" id="fileName">${file}</A></TD>
          <TD><A href="${file}" download>다운로드</A></TD>
          <TD>${filePath}</TD>
          <TD>${creatdate}</TD>
        </TR>
      `;
      })
      .join("");

    res.send(rows);
  });
});
// 파일 확장자별 리스트 변경 예정
app.get("/fileext-list", (req, res) => {
  console.log("파일 확장자별 리스트 호출됨");
  fs.readdir(_path, (err, files) => {
    if (err) {
      return res.status(500).send("Failed to read directory");
      // 500 내부 서버 오류는 일반적인 HTTP 상태 코드로 서버에서 문제가 발생하였으나 문제의 구체적인 내용을 표시할 수 없음을 의미
    }

    let i = 0;
    const rows = files
      .map((file) => {
        const filePath = path.join(_path, file);
        const stats = fs.statSync(filePath);
        return `
        <TR>
          <TD><INPUT TYPE="checkbox" NAME="checklist" VALUE="${i++}"></TD>
          <TD><A href="${file}" id="fileName">${file}</A></TD>
          <TD><A href="${file}" download>다운로드</A></TD>
          <TD>${filePath}</TD>
          <TD>${stats.birthtime}</TD>
        </TR>
      `;
      })
      .join("");

    res.send(rows);
  });
});

app.use("/", express.static(_path));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, _path); // 경로를 같은 폴더에 설정
  },
  filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, "latin1").toString("utf8"); //파일명, 한글 깨짐 방지
    cb(null, fix); //오리지널 네임
  },
});

const upload = multer({ storage });
//let upload = multer({ storage : storage }); 객체 타입에서 키랑 볼륨이 같이 날아옴 위와 같이 줄일수 있다.

app.post("/up", upload.single("ufile"), (req, res) => {
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 로 서비스 동작중입니다.`);
});
