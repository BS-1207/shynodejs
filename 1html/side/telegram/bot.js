require("dotenv").config();
const https = require("https");
const axios = require("axios");
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TGTOKEN;
const auth = process.env.APIAUTH;
const weatherApiKey = process.env.WTKEY;

let docoumentArry = [];
let photoArry = [];
let youtubeArry = [];
const authority = [7210226959];

// 환경 변수 검증
if (!token || !auth || !weatherApiKey) {
  console.error("환경 변수 설정이 누락되었습니다.");
  process.exit(1); // 프로그램 종료
}

const ori = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?`;
const query = `authkey=${auth}&data=AP01`;
const url = ori + query;

const bot = new TelegramBot(token, { polling: true });

// 기본 핸들러 예제
bot.onText(/(안녕)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "reply: " + msg.text + "| 안녕하세요~";
  console.log(msg);
  bot.sendMessage(chatId, resp);
});

// 따라해 핸들러
bot.onText(/\/(따라해)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match.input.replace("/따라해", "");
  console.log(resp);
  bot.sendMessage(chatId, resp);
});

// 이름 핸들러
bot.onText(/이름(.*)?(\s*뭐)?(\?)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "전화번호 뭐예요? 전 MIB입니다.";
  console.log(resp);
  bot.sendMessage(chatId, resp);
});

// 환율 핸들러
bot.onText(/환율/, async (msg, match) => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: process.env.NODE_ENV !== "production", // 운영 환경에서만 SSL 인증서 확인
      }),
    });

    const result = response.data;
    const check = result.length - 1;
    const dollor = result[check];

    if (dollor) {
      const drate = parseFloat(dollor.deal_bas_r.replace(/,/g, "")); // 환율 문자열의 쉼표 제거 후 파싱
      const hd = drate * 100;
      const chatId = msg.chat.id;
      const resp = `환단위 : ${dollor.cur_unit}  환이름 : ${dollor.cur_nm} 환율 : ${dollor.deal_bas_r} 100달러당 : ${hd}`;
      console.log(resp);
      bot.sendMessage(chatId, resp);
    } else {
      bot.sendMessage(msg.chat.id, "환율 정보를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
    bot.sendMessage(
      msg.chat.id,
      "환율 정보를 가져오는 중 문제가 발생했습니다."
    );
  }
});

// 날씨 핸들러
bot.onText(/\/날씨 (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const location = match[1];
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    const message = `현재 ${weather.name}의 날씨는 ${weather.weather[0].description}입니다. 온도는 ${weather.main.temp}°C입니다.`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("날씨 정보 요청 실패:", error);
    bot.sendMessage(
      chatId,
      "날씨 정보를 가져오는 데 실패했습니다. 다시 시도해주세요."
    );
  }
});

bot.onText(/\/유리추 (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  let url = match[1].trim(); // 입력 받은 값의 앞뒤 공백 제거

  console.log("Received URL:", url);

  // 중복 값 체크
  const isAlreadyRegistered = youtubeArry.some((item) => item.url === url);

  if (!isAlreadyRegistered) {
    // 중복이 아닌 경우 배열에 추가
    youtubeArry.push({ url });
    console.log("URL 저장 완료:", url);
  } else {
    console.log("이미 등록된 URL입니다:", url);
  }

  console.log("현재 저장된 URL 리스트:", youtubeArry);
});

// 기록 핸들러
bot.onText(/\/(기록해)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match.input.replace("/기록해", "");
  console.log(resp);
  // TODO: DB 또는 파일 시스템에 기록 정보 삽입 로직 추가
  bot.sendMessage(chatId, `기록되었습니다: ${resp}`);
});

// 기록리스트 핸들러
bot.onText(/\/(기록리스트)/, (msg, match) => {
  const chatId = msg.chat.id;
  // TODO: 기록 정보 리스트를 DB 또는 파일 시스템에서 조회하는 로직 추가
  const resp = "기록된 리스트입니다.";
  console.log(resp);
  bot.sendMessage(chatId, resp);
});

bot.onText(/(사진)/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(match.input);

  if (photoArry.length > 0) {
    // 저장된 모든 사진 파일 ID를 순회하며 전송
    photoArry.forEach((photo) => {
      bot.sendPhoto(chatId, photo.id, { caption: photo.name });
    });
  } else {
    bot.sendMessage(chatId, "저장된 사진이 없습니다.");
  }
});

bot.onText(/\/사진초기화/, (msg, match) => {
  const chatId = msg.chat.id;

  // 권한이 있는 사용자만 초기화할 수 있도록 조건 추가 (선택 사항)
  if (authority.includes(chatId)) {
    photoArry = []; // 사진 리스트 초기화
    bot.sendMessage(chatId, "사진 리스트가 초기화되었습니다.");
  } else {
    bot.sendMessage(chatId, "사진 리스트를 초기화할 권한이 없습니다.");
  }
});

// 메시지 핸들러 - 사진 파일 ID를 배열에 저장
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // 권한이 있는 사용자인지 확인
  if (authority.includes(chatId)) {
    console.log("권한이 있는 챗 아이디: " + chatId);
    if (msg.document) {
      const docuName = msg.document.file_name;
      const fileID = msg.document.file_id;
      console.log(msg.document.file_name, msg.document.file_id);
      const isAlreadyRegistered = docoumentArry.some(
        (docu) => docu.id === msg.document.file_id
      );

      if (!isAlreadyRegistered) {
        // 등록되지 않은 경우에만 배열에 추가
        documentArry.push({ name: docuName, id: fileID });
        console.log("문서 이름: ", docuName, "문서 ID 저장 완료:", fileID);
      } else {
        console.log("이미 등록된 문서입니다:", fileID);
      }
    } // 사진 메시지가 수신된 경우
    else if (msg.photo && msg.photo.length > 0) {
      const namePhoto = msg.caption || "Unnamed"; // 캡션이 없으면 "Unnamed"로 저장

      // 가장 해상도가 높은 사진을 선택 (마지막 요소가 가장 해상도가 높음)
      const largestPhoto = msg.photo[msg.photo.length - 1];

      // 이미 등록된 사진인지 확인
      const isAlreadyRegistered = photoArry.some(
        (photo) => photo.id === largestPhoto.file_id
      );

      if (!isAlreadyRegistered) {
        // 등록되지 않은 경우에만 배열에 추가
        photoArry.push({ name: namePhoto, id: largestPhoto.file_id });
        console.log(
          "이름: ",
          namePhoto,
          "Photo ID 저장 완료:",
          largestPhoto.file_id
        );
      } else {
        console.log("이미 등록된 사진입니다:", largestPhoto.file_id);
      }

      console.log(photoArry);
    }

    // 메시지에 URL이 포함된 경우
    if (msg.entities && Array.isArray(msg.entities)) {
      msg.entities.forEach((entity) => {
        if (entity.type === "url") {
          const url = msg.text.slice(
            entity.offset,
            entity.offset + entity.length
          );
          console.log("URL 발견:", url);
        }
      });
    }

    console.log(msg);
  } else {
    console.log("권한이 없는 아이디 : " + chatId);
  }
});

console.log("봇이 시작되었습니다.");
