describe("Task Manager E2E", () => {
  const backendUrl = Cypress.env("BACKEND_URL") || "http://backend:5001";
  const frontendUrl = Cypress.env("BASE_URL") || "http://frontend:80";

  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `${backendUrl}/test/clear`,
      failOnStatusCode: false,
    });
  });

  it("Показывает пустой список задач, если база пуста", () => {
    cy.visit(frontendUrl);
    cy.get("[data-testid='task-item']").should("have.length", 0);
  });

  it("Можно добавить новую задачу и она отображается", () => {
    cy.visit(frontendUrl);

    cy.get("[data-testid='task-input']").type("Новая задача");
    cy.get("[data-testid='task-add-button']").click();

    cy.get("[data-testid='task-item']", { timeout: 10000 })
      .should("have.length", 1)
      .first()
      .contains("Новая задача");
  });

  it("Задачу можно отметить выполненной", () => {
    cy.visit(frontendUrl);

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