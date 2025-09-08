import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { addNoteToServer } from "../store/notesSlice";
import type { Note } from "../types";
import type { AppDispatch } from "../store";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNoteModal = ({ isOpen, onClose }: AddNoteModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteColor, setNoteColor] = useState("white");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 노트 추가 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      return alert("제목을 입력해주세요");
    }
    if (!content) {
      return alert("내용을 입력해주세요");
    }

    const newNote: Omit<Note, "id" | "createAt"> = {
      title: title.trim(),
      content: content.trim(),
      noteColor: noteColor,
      priority: "low",
      tags: tags,
      status: "normal",
    };

    dispatch(addNoteToServer(newNote));
    setTitle("");
    setContent("");
    setNoteColor("white");
    setTags([]);
    setTagInput("");
    onClose();
  };

  // 태그 추가 함수
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput)) return;

    setTags((pre) => [...pre, tagInput]);
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
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-3">New Note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded mb-3 p-2 focus:outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write Note Content"
            className="flex-1 resize-none border border-gray-300 rounded mb-3 p-2 focus:outline-none"
          />

          <div className="w-full">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-gray-400 border-b-2 border-gray-400 mr-2"
              >
                #{tag}
                <button
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

          <div className="flex justify-between">
            {/* 배경색 선택 */}
            <div>
              <label>배경색: </label>
              <select
                value={noteColor}
                onChange={(e) => setNoteColor(e.target.value)}
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
                추가
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
