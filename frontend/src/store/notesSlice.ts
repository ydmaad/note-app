import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../types";

// createSlice: Redux slice 생성 - 노트관련 상태와 액션들을 관리
const notesSlice = createSlice({
  name: "notes", // slice 이름(Redux DevTools에서 보임)
  // 초기 상태값
  initialState: {
    notes: [
      {
        id: "1",
        title: "장볼거",
        content: "물, 과자, 라면",
        noteColor: "pink",
        priority: "high",
        tags: ["todo"],
        status: "normal",
        createAt: new Date(),
      },
      {
        id: "2",
        title: "장볼거2",
        content: "물2, 과자2, 라면2",
        noteColor: "blue",
        priority: "low",
        tags: ["todo", "exercise"],
        status: "normal",
        createAt: new Date(),
      },
      {
        id: "3",
        title: "장볼거3",
        content: "물3, 과자3, 라면3",
        noteColor: "white",
        priority: "high",
        tags: ["todo", "study"],
        status: "archived",
        createAt: new Date(),
      },
      {
        id: "4",
        title: "장볼거4",
        content: "물4, 과자4, 라면4",
        noteColor: "white",
        priority: "high",
        tags: ["todo", "study"],
        status: "normal",
        createAt: new Date(),
      },
      {
        id: "5",
        title: "장볼거5",
        content: "물5, 과자5, 라면5",
        noteColor: "yellow",
        priority: "high",
        tags: ["todo", "study"],
        status: "normal",
        createAt: new Date(),
      },
      // TypeScript를 위한 타입 지정
    ] as Note[],
  },
  // 상태를 변경하는 함수들
  reducers: {
    // 노트 추가하는 함수
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
});

// 액션들을 export
export const { addNote } = notesSlice.actions;
// reducer 함수만 export
export default notesSlice.reducer;
