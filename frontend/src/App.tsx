import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { fetchNotesFromServer } from "./store/notesSlice";
import { useEffect } from "react";

const App = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotesFromServer());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-row">
      <div className="min-w-60 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent notes={notes} />
      </div>
    </div>
  );
};

export default App;
