import { BsPinAngle, BsPinFill } from "react-icons/bs";
import type { Note } from "../types";
import { IoIosCreate } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { HiArchive } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  deleteNoteFromServer,
  updateNoteFromServer,
} from "../store/notesSlice";
import type { AppDispatch } from "../store";
import { useState } from "react";
import EditNoteModal from "./EditNoteModal";

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 노트별 배경색
  const getColorClass = (color: string) => {
    switch (color) {
      case "white":
        return "bg-white";
      case "blue":
        return "bg-blue-100";
      case "pink":
        return "bg-pink-100";
      case "yellow":
        return "bg-yellow-100";
      default:
        return "bg-gray-200";
    }
  };

  // 노트 삭제 핸들러
  const handleNoteDelete = () => {
    dispatch(deleteNoteFromServer(note.id));
  };

  // 노트 수정 모달 닫기 핸들러
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 작성일
  const createdDate = new Date(note.createAt);
  // 날짜 - 한국식
  const datePart = createdDate.toLocaleDateString("ko-KR");
  // 시간 - AM/PM
  const timePart = createdDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // 중요도 핀 토글 함수
  const handlePriorityToggle = () => {
    const newPriority = note.priority === "high" ? "low" : "high";
    dispatch(
      updateNoteFromServer({
        id: note.id,
        updateData: { priority: newPriority },
      })
    );
  };

  // status를 archived로 변경하는 함수
  const handleArchivedNote = () => {
    const newStatus = note.status === "archived" ? "normal" : "archived";
    dispatch(
      updateNoteFromServer({
        id: note.id,
        updateData: {
          status: newStatus,
        },
      })
    );
  };
  return (
    <div
      key={note.id}
      className={`${getColorClass(
        note.noteColor
      )} p-4 rounded-md shadow-xl/20 w-72 h-60 flex flex-col m-5`}
    >
      {/* 제목 + 우측 핀 */}
      <div className="flex justify-between">
        <h1 className="text-lg items-center font-semibold mb-2">
          {note.title}
        </h1>
        <span
          onClick={handlePriorityToggle}
          className="px-2 py-1 rounded-full cursor-pointer"
        >
          {note.priority === "high" ? (
            <BsPinFill className="text-red-500" />
          ) : (
            <BsPinAngle className="text-gray-500" />
          )}
        </span>
      </div>

      {/* 내용 */}
      <span className="text-sm mb-3 break-words">{note.content}</span>

      {/* 태그 + 날짜 + 버튼 */}
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex gap-1 flex-wrap">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-1 py-1 text-xs rounded-sm bg-gray-100 text-gray-600 opacity-70"
            >
              {" "}
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <p className="text-xs">{`${datePart}${" "}${timePart}`}</p>
          <div className="flex justify-between gap-2 cursor-pointer">
            <IoIosCreate onClick={() => setIsEditModalOpen(true)} />
            <HiArchive onClick={handleArchivedNote} />
            <RiDeleteBinFill onClick={handleNoteDelete} />
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditNoteModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          note={note}
        />
      )}
    </div>
  );
};

export default NoteItem;
