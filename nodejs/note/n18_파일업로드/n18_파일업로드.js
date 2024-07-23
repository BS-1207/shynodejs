const express = require("express");
const logger = require("morgan");
const path = require("path");
const multer = require("multer"); //파일 업로드 처리하는 미들웨어

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");

app.use(logger());

app.use("/", express.static(_path));

app.use(express.json()); //JSON 데이터 해석하여 req.body에 저장
app.use(express.urlencoded({ extended: true })); // 확장개념 본문을 파싱

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

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/up", upload.single("ufile"), (req, res) => {
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 로 서비스 동작중입니다.`);
});
