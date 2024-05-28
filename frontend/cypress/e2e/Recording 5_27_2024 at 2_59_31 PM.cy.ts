describe("Recording 5/27/2024 at 2:59:31 PM", () => {
  it("tests Recording 5/27/2024 at 2:59:31 PM", () => {
    cy.viewport(1069, 790);
    cy.visit("http://localhost:3000/");
    cy.get("a > button").click();
    cy.get("#email").type("zewdu@gmail.com");
    cy.get("#password").type("1234");
    cy.get("#email").click();
    cy.get("#password").click();
    cy.get("#email").click();
    cy.get("button").click();
    cy.get("a:nth-of-type(3) span").click();
    cy.get("div.flex > button:nth-of-type(2)").click();
    cy.get("div.fixed input").click();
    cy.get("div.fixed input").type("11");
    cy.get("select").select("nursery");
    cy.get("select").type("senior secondary");
    cy.get("button.bg-green-500").click();
    cy.get("p.MuiTypography-body1").click();
    cy.get("div.MuiPopover-root button").click();
    cy.get("#email").type("zewdu@gmail.com");
    cy.get("#password").type("1234");
  });
});
