import "./App.css";

function App() {
  return (
    <>
      <h1>처음 리액트를 시작합니다</h1>
      <button onClick={notice}>처음 만드는 버튼</button>
      <table>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
        {rows(data)}
      </table>
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
  {
    id: 2,
    title: "안녕하니?",
    author: "이하늬",
    date: "2024-08-02",
    views: 1,
  },
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

const notice = () => alert("안녕하십니까?");
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
