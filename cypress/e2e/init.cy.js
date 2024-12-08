describe("Initialize tests", () => {
    beforeEach(() => {
        cy.visit("http://locahost:8080");
    })
})

describe('Dropdown Navigation Test - Double Click', () => {
    it('should navigate to /default after clicking the dropdown with label "Default" twice', () => {
      // Visit the localhost page
      cy.visit('http://localhost:8080/docs');
  
      // Find the dropdown menu with label "Default"
      const dropdown = cy.contains('label', 'Default')
        .parent()
        .find('select');
  
      // Click the dropdown twice
      dropdown.select('Default'); // First click
      dropdown.select('Default'); // Second click
  
      // Assert that the URL contains "/default"
      cy.url().should('include', '/default');
    });
  });