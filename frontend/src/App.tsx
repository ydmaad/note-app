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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchNotesFromServer());
  }, [dispatch]);

  // 메뉴,태그,검색 필터링 로직
  const filteredNotes = notes.filter((note) => {
    let passesMenuFilter = false;
    if (selectedMenu === "all") passesMenuFilter = note.status === "normal";
    if (selectedMenu === "archived")
      passesMenuFilter = note.status === "archived";
    if (selectedMenu === "trashed")
      passesMenuFilter = note.status === "trashed";
    if (
      !passesMenuFilter &&
      selectedMenu !== "all" &&
      selectedMenu !== "archived" &&
      selectedMenu !== "trashed"
    ) {
      passesMenuFilter = note.tags.includes(selectedMenu);
    }

    const passesSearchFilter =
      searchTerm === "" ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    return passesMenuFilter && passesSearchFilter;
  });

  const sortedAndFilteredNotes = filteredNotes.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "priority") {
      if (a.priority === "high" && b.priority === "low") return -1;
      if (a.priority === "low" && b.priority === "high") return 1;
      return 0;
    }
    return 0;
  });

  return (
    <div className="h-screen flex flex-row overflow-hidden">
      <div className="min-w-60 flex-shrink-0">
        <Sidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <MainContent notes={sortedAndFilteredNotes} />
        </div>
      </div>
    </div>
  );
};

export default App;
