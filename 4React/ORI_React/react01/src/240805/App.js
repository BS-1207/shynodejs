import "./App.css";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <div id="all" className="f">
        <h1>충격과 공포의 게시판</h1>
        <div id="boardListouter">
          <div id="boardName">
            <h2>자유롭지 않은 억압 게시판</h2>
          </div>
          <div id="boardListdiv">
            <table className="table">
              <thead className="tableHead">
                <tr>
                  <th scope="col" id="num">
                    No.
                  </th>
                  <th scope="col" id="title">
                    제목
                  </th>
                  <th scope="col" id="writer">
                    작성자
                  </th>
                  <th scope="col" id="wdate">
                    작성일
                  </th>
                  <th scope="col" id="hit">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody id="boardList" className="tableBody">
                {rows(data)}
              </tbody>
            </table>
            <div id="wrBtnArea">
              <button
                className="modalopbtn logouthide"
                type="button"
                id="write"
                onClick={handleShow}>
                Write
              </button>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleShow}>
              X
            </span>
            <h2>게시글 작성</h2>
            <form method="POST" action="/">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  제목
                </label>
                <input type="text" className="form-control" id="title" />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  내용
                </label>
                <br></br>
                <textarea
                  className="form-control"
                  id="content"
                  rows="3"></textarea>
              </div>
              <div className="mb-3">
                <div className="buttonArea">
                  <button type={SubmitEvent} className="Write">
                    Write
                  </button>
                  <button type="button" onClick={handleShow}>
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const data = [
  {
    id: 1,
    title: "안녕하세요",
    author: "홍길동",
    date: "2024-08-01",
    views: 10,
  },
  { id: 2, title: "안녕하니?", author: "이하늬", date: "2024-08-02", views: 1 },
  {
    id: 3,
    title: "안녕하세요?",
    author: "김말복",
    date: "2024-08-02",
    views: 2,
  },
  {
    id: 4,
    title: "안녕하세요?",
    author: "김말복",
    date: "2024-08-02",
    views: 3,
  },
  // 추가 행 데이터를 여기에 추가할 수 있습니다.
];

const rows = (check) => {
  return check.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.date}</td>
      <td>{item.views}</td>
    </tr>
  ));
};

export default App;
