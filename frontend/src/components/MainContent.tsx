import { useState } from "react";
import type { Note } from "../types";
import NoteItem from "./NoteItem";

const MainContent = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "장볼거",
      content: "물, 과자, 라면",
      noteColor: "pink",
      priority: "high",
      tags: ["todo"],
      status: "normal",
      createAt: new Date(),
    },
    {
      id: "2",
      title: "장볼거2",
      content: "물2, 과자2, 라면2",
      noteColor: "blue",
      priority: "low",
      tags: ["todo", "exercise"],
      status: "normal",
      createAt: new Date(),
    },
    {
      id: "3",
      title: "장볼거3",
      content: "물3, 과자3, 라면3",
      noteColor: "white",
      priority: "high",
      tags: ["todo", "study"],
      status: "archived",
      createAt: new Date(),
    },
    {
      id: "4",
      title: "장볼거4",
      content: "물4, 과자4, 라면4",
      noteColor: "white",
      priority: "high",
      tags: ["todo", "study"],
      status: "normal",
      createAt: new Date(),
    },
    {
      id: "5",
      title: "장볼거5",
      content: "물5, 과자5, 라면5",
      noteColor: "yellow",
      priority: "high",
      tags: ["todo", "study"],
      status: "normal",
      createAt: new Date(),
    },
  ]);
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
