describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("should show input and type it", () => {
    cy.get("[data-test=input-form]").should("be.visible");
    cy.get("[data-test=input-form]").type("dilan@test");
  });

  it("should click the button and render success subbed", () => {
    let value = "test@test.com";
    cy.get("[data-test=input-form]").type(value);
    cy.get("button").click();
    cy.get("[data-test=sub-message]").should("be.visible");
    cy.contains(`Successfully subbed: ${value}!`);
  });

  it("should click the button and render invalid email", () => {
    let value = "example";
    cy.get("[data-test=input-form]").as("input-subs");
    cy.get("@input-subs").type(value);

    cy.get("button").click();

    cy.get("[data-test=sub-message]").should("be.visible");
    cy.contains(`Invalid email: ${value}!`);
  });

  it("should hide sub-message after 3000ms(3segs)", () => {
    let value = "test@test.com";
    cy.get("[data-test=input-form]").type(value);
    cy.get("button").click();
    cy.get("[data-test=sub-message]").should("be.visible");
    cy.contains(`Successfully subbed: ${value}!`);

    // by default cypress retrieves till an element is not visible in this case, so wether using cy.wait() or not, it's up to you
    cy.wait(3000);
    cy.get("[data-test=sub-message]").should("not.exist");
  });
});
