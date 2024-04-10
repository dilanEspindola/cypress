describe("various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("multi-page testing", () => {
    cy.get("[data-test=nav-why-cypress]").click();
    cy.location("pathname").should("equal", "/");

    cy.get("[data-test=nav-overview]").click();
    cy.location("pathname").should("equal", "/overview");

    cy.get("[data-test=nav-fundamentals]").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.get("[data-test=nav-forms]").click();
    cy.location("pathname").should("equal", "/forms");

    cy.get("[data-test=nav-examples]").click();
    cy.location("pathname").should("equal", "/examples");

    cy.get("[data-test=nav-component]").click();
    cy.location("pathname").should("equal", "/component");

    cy.get("[data-test=nav-best-practices]").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  it("intercepts", () => {
    const data = {
      message: "succesfully intercepted request",
    };

    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.get("[data-test=post-button]").click();
  });

  it.only("grudged", () => {
    cy.contains(/add some grudges/i);

    cy.get("[data-test=grudge-list]").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.get("[data-test=grudge-input]").type("some grudge");
    cy.get("[data-test=grudge-button]").click();

    cy.get("[data-test=grudge-input]").type("some grudge 2");
    cy.get("[data-test=grudge-button]").click();

    cy.get("[data-test=grudge-input]").type("some grudge 3");
    cy.get("[data-test=grudge-button]").click();

    cy.contains(/grudges/i);

    cy.get("[data-test=grudge-list]").within(() => {
      cy.get("li").should("have.length.greaterThan", 0);
    });

    cy.get("[data-test=grudge-list]").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });

    cy.get("[data-test=grudge-list]").within(() => {
      cy.get("li").should("have.length", 2);
    });

    cy.wait(1000);
    cy.get("[data-test=clear-grudges]").click();

    cy.get("[data-test=grudge-list]").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.contains(/add some grudges/i);
  });
});
