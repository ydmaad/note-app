import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Note } from "../types";

// 백엔드로 노트 추가하는 비동기 액션 생성
export const addNoteToServer = createAsyncThunk(
  // 액션의 고유 이름(Redux DevTools에서 보임)
  "note/addNoteToServer",
  // 함수 파라미터: Note에서 id, createAt 제외한 데이터
  async (noteData: Omit<Note, "id" | "createAt">) => {
    // 백엔드 API 호출
    const response = await fetch("http://localhost:3000/api/notes", {
      // HTTP POST 메서드 사용(데이터 생성)
      method: "POST",
      // 요청 헤더 설정
      headers: {
        // JSON 형식으로 데이터 전송한다고 알림
        "Content-Type": "application/json",
      },
      // 노트 데이터를 JSON 문자열로 변환해서 전송
      body: JSON.stringify(noteData),
    });
    // 벡앤드 응답을 JSON으로 파싱해서 반환
    return response.json();
  }
);

// 백엔드에서 모든 노트 가져오는 비동기 액션
export const fetchNotesFromServer = createAsyncThunk(
  "notes/fetchNotesFromServer",
  async () => {
    const response = await fetch("http://localhost:3000/api/notes");
    return response.json();
  }
);

// createSlice: Redux slice 생성 - 노트관련 상태와 액션들을 관리
const notesSlice = createSlice({
  name: "notes", // slice 이름(Redux DevTools에서 보임)
  // 초기 상태값
  initialState: {
    notes: [
      // TypeScript를 위한 타입 지정
    ] as Note[],
  },
  // 빈 객체로 유지(Redux Toolkit에서 reducers는 필수 속성!!
  reducers: {},

  // 비동기 액션의 결과를 처리하는 extraReducers
  extraReducers: (builder) => {
    builder
      // 노트 추가 요청이 성공했을 때
      .addCase(addNoteToServer.fulfilled, (state, action) => {
        // 백엔드에서 받은 새 노트를 state에 추가
        state.notes.push(action.payload);
      })
      // 노트 목록 조회 요청이 성공했을 때
      .addCase(fetchNotesFromServer.fulfilled, (state, action) => {
        // 백엔드에서 받은 전체 노트 배열로 state 교체
        state.notes = action.payload;
      });
  },
});

// reducer 함수만 export
export default notesSlice.reducer;
