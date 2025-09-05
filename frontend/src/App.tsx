import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <div className="h-screen flex flex-row">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
