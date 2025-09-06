import type { Note } from "../types";
import NoteItem from "./NoteItem";

interface MainContentProps {
  notes: Note[];
}

const MainContent = ({ notes }: MainContentProps) => {
  return (
    <div>
      {notes
        .filter((note) => note.status === "normal")
        .map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
    </div>
  );
};

export default MainContent;
