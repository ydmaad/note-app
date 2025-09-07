import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

const notesFilePath = path.join(__dirname, "../data/notes.json");

const loadNotesFromFile = () => {
  try {
    if (fs.existsSync(notesFilePath)) {
      const data = fs.readFileSync(notesFilePath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("파일 읽기 오류:::::::", error);
  }
  return [];
};

const saveNotesToFile = (notes: any[]) => {
  console.log("파일 저장 시도:", notesFilePath); // 로그 추가
  try {
    const dataDir = path.dirname(notesFilePath);
    console.log("데이터 디렉토리:", dataDir); // 로그 추가
    if (!fs.existsSync(dataDir)) {
      console.log("디렉토리 생성 중..."); // 로그 추가
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
    console.log("파일 저장 완료!"); // 로그 추가
  } catch (error) {
    console.log("파일 저장 오류::::::", error);
  }
};

let notes = loadNotesFromFile();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("안녕 세계야!!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: Date.now().toString(),
    ...req.body,
    createAt: new Date(),
  };
  notes.push(newNote);
  saveNotesToFile(notes);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
