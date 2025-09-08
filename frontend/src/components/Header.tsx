import { FaPlus } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <div className="flex justify-between border-b-2 border-gray-300">
        <h1 className="text-3xl p-3">Note</h1>
        <button onClick={openModal}>
          <FaPlus className="text-3xl m-3" />
        </button>
      </div>
      <AddNoteModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;
