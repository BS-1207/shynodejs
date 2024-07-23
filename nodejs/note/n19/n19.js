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

app.use("/", express.static(__dirname));

app.get("/", (req, res) => {
  let list = `<html><head><meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>파일리스트 및 업로드</title><link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous" /><style>
      .f {display: flex; flex-direction: column; align-items: center;
      }
      .f1 { flex: 1;
        border-radius: 10px;
        width : fit-content;
        padding: 30px;
        margin-top: 50px;
        margin-bottom: 20px;}
    </style></head><body style="background-color: #201E43;">`;
  fs.readdir(__dirname, "utf-8", (err, data) => {
    /*for (let i = 0; i <tbody data.length; i++) {
      list += "<br><a href=" + data[i] + ">" + data[i] + "</a>";
    }*/
    list += `<div id="all" class="f" style="background-color: #134B70; padding: 20px 35px; margin: 20px auto; width: fit-content;  border-radius: 10px;">
    <h1 style="color: white; text-align: center; margin-top: 20px">파일 다운로드 및 업로드</h1>
    <div id="fileList" class="container text-center f1"
        style="background-color: #EEEEEE;
        ">
      <h2>파일 리스트</h2><br>
      <table
        class="table"
        style="text-align: center; width: fit-content; display: inline-block">
        <thead class="table-dark" ><tr><th scope="col">파일명</th><th scope="col">다운로드</th><th scope="col">파일경로</th><th scope="col">파일생성날짜</th></tr></thead><tbody>`;
    data.forEach((v) => {
      list += `<tr><td><a href="${v}" style="text-decoration:none">${v}</a></td>`;
      list += `<td><a href="${v}" download style="text-decoration:none">다운로드</a></td><td></td><td></td></tr>`;
    });
    list += `</tbody></table></div>
    <div class="modal" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">파일 전송 완료</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p id="modalBody">파일이 정상 전송되었습니다.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="location.href='/'">Close</button>
        </div>
      </div>
     </div>
    </div>
    <div
      id="fileUpload"
      class="container text-center f1"
      style="
        width: 400px;
        background-color: #508C9B;
      ">
        <div>
        <h2>파일 업로드</h2><br><br>
            <form class="input-group mb-3" action="/up" method="POST" enctype="multipart/form-data"> <!-- 파일 전송시 인코딩 방식 설정-->
                <input type="file" class="form-control" id="inputGroupFile02" name="ufile"> <!-- ufile이라는 이름에 담에서 파일 전송-->
                <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">UpLoad</button> <!-- 버튼 submit을 통해 위 설정에 따라 제출-->
            </form>
      </div>
    </div>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"></script>
      <script>
        document.querySelector('form').addEventListener('submit', function(event) {
          let input = document.getElementById('inputGroupFile02');
          let file = input.files[0];
          if (file) {
            let fileName = file.name;
            document.getElementById('modalBody').textContent = fileName +'이 업로드 완료되었습니다.';
          }
        });
      </script></div>`;
    list += `</body></html>`;
    res.send(list);
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
