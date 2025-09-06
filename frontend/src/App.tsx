import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

const App = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  return (
    <div className="h-screen flex flex-row">
      <div className="w-64 flex-shrink-0">
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
