describe("Task Manager E2E", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:5001/test/clear",
      failOnStatusCode: false, 
    });
  });

  it("Показывает пустой список задач, если база пуста", () => {
    cy.visit("http://localhost:3000"); 
    cy.get("[data-testid='task-item']").should("have.length", 0);
  });

  it("Можно добавить новую задачу и она отображается", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    cy.get("[data-testid='task-item']", { timeout: 10000 })
      .should("have.length", 1)
      .first()
      .contains("Новая задача");
  });

  it("Задачу можно отметить выполненной", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    cy.get("[data-testid='task-item']")
      .contains("Новая задача")
      .click(); 

    cy.get("[data-testid='task-item']")
      .contains("Новая задача")
      .parent()
      .should("have.class", "completed");
  });
});