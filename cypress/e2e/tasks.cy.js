describe("Task Manager E2E", () => {
  beforeEach(() => {
    // Очищаем задачи перед каждым тестом
    cy.request("POST", "http://localhost:5001/test/clear"); 
    // 👆 нужно реализовать на бэкенде эндпоинт для очистки базы в тестовом режиме
  });

  it("Показывает пустой список задач, если база пуста", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid='task-item']").should("have.length", 0);
  });

  it("Можно добавить новую задачу и она отображается", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    // Ждём, пока элемент появится (увеличиваем таймаут)
    cy.get("[data-testid='task-item']", { timeout: 10000 })
      .should("have.length", 1)
      .first()
      .contains("Новая задача");
  });

  it("Задачу можно отметить выполненной", () => {
    cy.visit("http://localhost:3000");

    // Добавляем задачу, чтобы она точно была
    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    cy.get("[data-testid='task-item']", { timeout: 10000 })
      .contains("Новая задача")
      .parent()
      .find("[data-testid='task-complete-button']")
      .click();

    cy.get("[data-testid='task-item']", { timeout: 10000 })
      .contains("Новая задача")
      .should("have.class", "completed");
  });
});