const request = require("supertest");
const express = require("express");
const db = require("./db");
const app = require("./server"); // если твой server.js экспортирует app

// Перед тестами очищаем таблицу
beforeAll((done) => {
  db.run("DELETE FROM tasks", done);
});

describe("Tasks API", () => {
  test("GET /tasks должен вернуть пустой массив", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /tasks должен добавлять задачу", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Тестовая задача" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Тестовая задача");
    expect(res.body.completed).toBe(0);
  });

  test("GET /tasks должен вернуть массив с задачей", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Тестовая задача");
  });
});