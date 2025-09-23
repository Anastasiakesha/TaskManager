// server.js
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5001;

module.exports = app;

if (require.main === module) {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

app.use(cors());
app.use(express.json());

// 📌 Получить все задачи
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      console.log("Ошибка базы данных:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Tasks из базы:", rows); 
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  console.log("POST получен с title:", title); // лог
  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    if (err) {
      console.log("Ошибка вставки в базу:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Задача добавлена с ID:", this.lastID); // лог
    res.json({ id: this.lastID, title, completed: 0 });
  });
});

// 📌 Обновить задачу (отметить выполненной)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run("UPDATE tasks SET completed = ? WHERE id = ?", [completed, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updatedID: id });
  });
});

// 📌 Удалить задачу
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedID: id });
  });
});

// 📌 Очистить все задачи (используется только в тестах)
app.post("/test/clear", (req, res) => {
  db.run("DELETE FROM tasks", [], (err) => {
    if (err) {
      console.error("Ошибка очистки базы:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Все задачи удалены");
    res.json({ message: "Все задачи удалены" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});