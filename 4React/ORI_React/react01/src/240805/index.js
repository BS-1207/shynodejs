import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div id="sidemenu">
      <div id="userinout">
        <button
          class="modalopbtn sidemenu logoutview show"
          type="button"
          id="login"
          data-bs-target="#modallogin">
          Login
        </button>
        <button
          class="modalopbtn sidemenu logoutview show"
          type="button"
          id="join"
          data-bs-target="#modaljoin">
          Join
        </button>
        <button
          class="logouthide sidemenu loginview"
          type="button"
          id="logout"
          onclick="logout()">
          Logout
        </button>
      </div>
      <div id="dmypage">
        <div class="card">
          <div class="banner">
            <div class="profile"></div>
          </div>
          <h2 class="name">별명</h2>
          <div class="follow-btn" id="follow-btn">
            <button>follow</button>
          </div>
          <div class="desc">인사말 안녕 안녕 친구들</div>
        </div>
      </div>
    </div>
    <App />
  </React.StrictMode>
);
