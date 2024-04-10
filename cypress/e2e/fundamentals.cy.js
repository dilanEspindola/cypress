describe("Fundamentals test", () => {
  beforeEach(() => {
    cy.visit("/fundamentals");
  });

  it("should contains correct header text", () => {
    // cy.get("[data-testid=fundamentals-title]").should(
    //   "contain.text",
    //   `Testing Fundamentals`
    // );
    cy.getDataTest("fundamentals-title").should(
      "contain.text",
      `Testing Fundamentals`
    );
  });

  it("should accordion works correctly", () => {
    cy.get("[data-testid=summary-1]").click();
    cy.get("[data-testid=detail-1").should("be.visible");
    cy.get("[data-testid=summary-1]").click();
    cy.get("[data-testid=detail-1").should("not.be.visible");
  });
});
