import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css"; // подключаем твой CSS файл

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title);
    setTitle("");
    loadTasks();
  }

  async function handleToggleTask(id, completed) {
    await updateTask(id, completed ? 0 : 1);
    loadTasks();
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="App min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="App-header text-3xl font-bold mb-6">📋 Список задач</h1>

      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Новая задача..."
          className="p-2 border rounded-l-md"
          data-testid="task-input"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-700"
          data-testid="task-add-button"
        >
          Добавить
        </button>
      </form>

      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            data-testid="task-item"
            className={`flex justify-between items-center bg-white shadow p-2 mb-2 rounded-md ${task.completed ? "completed" : ""}`}
          >
          <span
            onClick={() => handleToggleTask(task.id, task.completed)}
            className={`cursor-pointer ${task.completed ? "completed" : ""}`}
            data-testid="task-complete-button"
          >
            {task.title}
          </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
              data-testid="task-delete-button"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;