import React, { useState } from "react";
import type { Note } from "../types";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { updateNoteFromServer } from "../store/notesSlice";

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const EditNoteModal = ({ isOpen, onClose, note }: EditNoteModalProps) => {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editTags, setEditTags] = useState(note.tags);
  const [editColor, setEditColor] = useState(note.noteColor);
  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  // 수정한 노트 제출 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editTitle.trim()) return alert("제목을 입력해주세요.");
    if (!editContent.trim()) return alert("내용을 입력해주세요.");

    dispatch(
      updateNoteFromServer({
        id: note.id,
        updateData: {
          title: editTitle.trim(),
          content: editContent.trim(),
          noteColor: editColor,
          tags: editTags,
        },
      })
    );
    onClose();
  };

  // 태그 추가 함수
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (editTags.includes(tagInput)) return;

    setEditTags((pre) => [...pre, tagInput]);
    setTagInput("");
  };

  // 엔터키로 태그 추가
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중인지 확인
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove: string) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-3">Note Edit</h2>
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border border-gray-300 rounded mb-3 p-2 focus:outline-none"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Write Note Content"
            className="flex-1 resize-none border border-gray-300 rounded mb-3 p-2 focus:outline-none"
          />

          <div className="w-full">
            {editTags.map((tag, index) => (
              <span
                key={index}
                className="text-gray-400 border-b-2 border-gray-400 mr-2"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 cursor-pointer"
                >
                  x
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              placeholder="# tag"
              onChange={(e) => setTagInput(e.target.value)}
              className="mb-3 focus:outline-none"
              onKeyDown={(e) => activeEnter(e)}
            />
          </div>

          {/* 배경색 선택 */}
          <div>
            <label>배경색: </label>
            <select
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              className="p-1 border border-gray-300 rounded"
            >
              <option value="white">white</option>
              <option value="pink">pink</option>
              <option value="blue">blue</option>
              <option value="yellow">yellow</option>
            </select>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-black hover:bg-gray-700"
            >
              수정
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditNoteModal;
