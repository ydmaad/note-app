import type { RootState } from "../store/index";
import { useSelector } from "react-redux";
import { FaTag } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { HiArchive } from "react-icons/hi";
import { RiDeleteBinFill } from "react-icons/ri";

interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const Sidebar = ({ selectedMenu, setSelectedMenu }: SidebarProps) => {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const allTags = notes.flatMap((note) => note.tags);
  const uniqueTags = [...new Set(allTags)];

  const menuClick = (menu: string) =>
    `flex items-center p-3 cursor-pointer ${
      selectedMenu === menu ? "bg-yellow-200" : "hover:bg-yellow-200"
    }`;

  return (
    <div className="h-screen bg-yellow-100">
      <div>
        <h1 className="text-bold text-3xl p-3 border-b-2 border-white">Keep</h1>
      </div>

      <div onClick={() => setSelectedMenu("all")} className={menuClick("all")}>
        <FaRegLightbulb className="text-gray-400" />
        <span className="ml-3">all notes</span>
      </div>
      {uniqueTags.length > 0 && (
        <>
          {uniqueTags.map((tag) => (
            <div
              key={tag}
              onClick={() => setSelectedMenu(tag)}
              className={menuClick(tag)}
            >
              <FaTag className="text-gray-400" />
              <span className="ml-3">{tag}</span>
            </div>
          ))}
        </>
      )}
      <div
        onClick={() => setSelectedMenu("archived")}
        className={menuClick("archived")}
      >
        <HiArchive className="text-gray-400" />
        <span className="ml-3">archive</span>
      </div>
      <div
        onClick={() => setSelectedMenu("trashed")}
        className={menuClick("trashed")}
      >
        <RiDeleteBinFill className="text-gray-400" />
        <span className="ml-3">trash</span>
      </div>
    </div>
  );
};

export default Sidebar;
