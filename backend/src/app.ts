import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// 미들웨어 설정 //
app.use(cors()); // CORS 허용(프로트엔드 연동)
app.use(express.json()); // JSON 파싱 미들웨어

// 파일 경로 설정 //
const notesFilePath = path.join(__dirname, "../data/notes.json");

// 파일 관리 함수 //
// JSON 파일에서 노트 데이터 읽어오는 함수
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

// 노트 배열을 JSON 파일에 저장하는 함수
const saveNotesToFile = (notes: any[]) => {
  try {
    const dataDir = path.dirname(notesFilePath);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
  } catch (error) {
    console.log("파일 저장 오류::::::", error);
  }
};

// 데이터 초기화 //
let notes = loadNotesFromFile();

// API 라우트 //
// 기본 라우트 - 서버 상태 확인용
app.get("/", (req, res) => {
  res.send("안녕 세계야!!");
});

// 모든 노트 조회 API
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// 새 노트 생성 API
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

// 노트 삭제 API
app.delete("/api/notes/:id", (req, res) => {
  // 경로 파라미터 받기
  const noteId = req.params.id;
  // 배열에서 해당 노트 제거
  notes = notes.filter((note) => note.id !== noteId);
  // 파일에 변경사항 저장
  saveNotesToFile(notes);
  // 응답 메시지 전달
  res.json({ message: "노트가 삭제되었습니다.", id: noteId });
});

// 노트 수정 API
app.put("/api/notes/:id", (req, res) => {
  // URL 경로에서 노트 ID 추출
  const noteId = req.params.id;
  // 요청 본문에서 수정할 데이터 추출(프론트엔드에서 보낸 새로운 노트 내용)
  const updateData = req.body;

  // notes 배열에서 해당 ID를 가진 노트의 인덱스 찾기
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  // 만약 해당 노트를 찾지 못했다면
  if (noteIndex === -1) {
    // 404 상태코드와 함께 에러 메시지 응답
    return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
  }

  // 기존 노트와 새로운 데이터를 합쳐서 업데이트
  notes[noteIndex] = {
    // 기존 노트의 모든 속성 복사
    ...notes[noteIndex],
    // 새로운 데이터로 덮어쓰기(같은 속성이 있으면 새 값으로 교체)
    ...updateData,
    // 작성일은 변경하지 않음(원본 노트의 createAt 유지)
    createAt: notes[noteIndex].createAt,
  };

  // 변경된 notes 배열을 JSON 파일에 저장
  saveNotesToFile(notes);

  // 수정된 노트 데이터를 응답으로 전송
  res.json(notes[noteIndex]);
});

// 서버 시작 //
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
