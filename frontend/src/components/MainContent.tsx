import type { Note } from "../types";
import NoteItem from "./NoteItem";

interface MainContentProps {
  notes: Note[];
}

const MainContent = ({ notes }: MainContentProps) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default MainContent;
