import { FaPlus } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
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
      <div className="pr-6">
        <input
          type="text"
          placeholder="노트 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mx-5 my-2.5 p-1 border border-gray-300 rounded 
          focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200
          transition-all duration-300 ease-in-out
          focus:shadow-lg"
        />
      </div>
    </header>
  );
};

export default Header;
