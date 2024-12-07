describe("Test", () => {
    beforeEach(() => {
        cy.visit("http://locahost:8080");
    })
})

it("Correct", () => {
    cy.get("#username").type
})