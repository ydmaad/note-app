export interface Note {
  id: string;
  title: string;
  content: string;
  noteColor: string;
  priority: "high" | "low";
  tags: string[];
  status: "normal" | "archived" | "trashed";
}
