import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("안녕 세계야!!");
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
