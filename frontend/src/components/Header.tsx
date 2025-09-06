import { FaPlus } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <div className="flex justify-between">
        <h1>Note</h1>
        <button onClick={openModal}>
          <FaPlus />
        </button>
      </div>
      <AddNoteModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;
