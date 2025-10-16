import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Функция загрузки задач
  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Ошибка при получении задач:", err);
    }
  }

  // Подписка на обновление задач при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  // Добавление новой задачи
  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await addTask(title);
      setTasks(prev => [...prev, newTask]); // добавляем задачу локально без полной перезагрузки
      setTitle("");
    } catch (err) {
      console.error("Ошибка при добавлении задачи:", err);
    }
  }

  // Переключение статуса задачи
  async function handleToggleTask(id, completed) {
    try {
      await updateTask(id, completed ? 0 : 1);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, completed: completed ? 0 : 1 } : task
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);
    }
  }

  // Удаление задачи
  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
    }
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