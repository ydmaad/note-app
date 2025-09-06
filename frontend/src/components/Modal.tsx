import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;
  return (
    <div
      // 전체 화면을 덮는 어두운 배경
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        // 실제 모달 창
        className="w-1/2 min-w-96 h-1/2 bg-white p-6 rounded-lg shadow-lg"
        // 모달 내용 클릭해도 닫히지 않게 방지
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
