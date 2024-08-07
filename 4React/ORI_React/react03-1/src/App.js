import "./App.css";

function App() {
  return (
    <>
      <div className="jCtn">
        <h2>회원가입</h2>
        <form action="/join" method="POST">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            required
          />
          <label htmlFor="email">이메일:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            required
          />
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            pattern="[A-Za-z0-9]{1,8}"
            required
          />
          <label htmlFor="pw">Password:</label>
          <input
            type="password"
            id="pw"
            name="password"
            placeholder="비밀번호"
            required
          />
          <button type="submit">가입하기</button>

          <button type="reset" className="reset-btn">
            다시 입력
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
