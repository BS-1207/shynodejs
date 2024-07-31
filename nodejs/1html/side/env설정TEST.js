const dotenv = require("dotenv");
dotenv.config(); // 환경 실행 // 디폴트 프로젝트 루트 // ()안에 경로 설정 가능

const test = process.env.TEST;
console.log(test);
