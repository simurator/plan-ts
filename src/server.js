import express from "express";
import bodyParser from "body-parser"; // Fixed import
import cors from "cors";

const { json } = bodyParser;
const app = express();
app.use(cors());
app.use(json());

let lessons = [];

app.get("/api/lessons", (req, res) => {
  res.json(lessons);
});

app.post("/api/lessons", (req, res) => {
  const newLesson = { id: lessons.length + 1, ...req.body };
  lessons.push(newLesson);
  res.status(201).json(newLesson);
});

app.put("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const index = lessons.findIndex((lesson) => lesson.id === parseInt(id));
  if (index !== -1) {
    lessons[index] = { ...lessons[index], ...req.body };
    res.json(lessons[index]);
  } else {
    res.status(404).send("Lesson not found");
  }
});

app.delete("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const index = lessons.findIndex((lesson) => lesson.id === parseInt(id));
  if (index !== -1) {
    lessons.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Lesson not found");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
