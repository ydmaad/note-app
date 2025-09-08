import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { fetchNotesFromServer } from "./store/notesSlice";
import { useEffect, useState } from "react";

const App = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMenu, setSelectedMenu] = useState("all");

  useEffect(() => {
    dispatch(fetchNotesFromServer());
  }, [dispatch]);

  // 메뉴,태그 필터링 로직
  const filteredNotes = notes.filter((note) => {
    if (selectedMenu === "all") return note.status === "normal";
    if (selectedMenu === "archive") return note.status === "archived";
    if (selectedMenu === "trash") return note.status === "trashed";
    return note.tags.includes(selectedMenu);
  });

  return (
    <div className="h-screen flex flex-row">
      <div className="min-w-60 flex-shrink-0">
        <Sidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent notes={filteredNotes} />
      </div>
    </div>
  );
};

export default App;
