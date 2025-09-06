import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

// configureStore: Redux store를 만들어주는 함수
export const store = configureStore({
  reducer: {
    // notes라는 이름으로 notesReducer 등록
    notes: notesReducer,
  },
});

// TypeScript를 위한 타입 정의
export type RootState = ReturnType<typeof store.getState>; // 전체 상태의 타입
export type AppDispatch = typeof store.dispatch; // dispatch 함수의 타입
