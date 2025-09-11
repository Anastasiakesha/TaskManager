describe("Task Manager E2E", () => {
  it("Показывает пустой список задач, если база пуста", () => {
    cy.visit("http://localhost:3000"); // frontend
    cy.get("[data-testid='task-item']").should("have.length", 0);
  });

  it("Можно добавить новую задачу и она отображается", () => {
    cy.visit("http://localhost:3000");

    // Добавляем задачу через UI
    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    // Проверяем, что задача появилась в списке
    cy.get("[data-testid='task-item']").should("have.length", 1);
    cy.get("[data-testid='task-item']").first().contains("Новая задачу");
  });

  it("Задачу можно отметить выполненной", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid='task-complete-button']").first().click();
    cy.get("[data-testid='task-item']").first().should("have.class", "completed");
  });
});