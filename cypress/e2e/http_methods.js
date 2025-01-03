export function GetAPI() {
    // Visit the page before each test
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('Finds 9 elements with the class "opblock opblock-get"', () => {
        // Locate all elements with the specified class
        cy.get('.opblock.opblock-get')
          .should('have.length', 9); // Assert that exactly 9 elements are found
      });
}

export function PutAPI() {
    // Visit the page before each test
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('Finds 2 elements with the class "opblock opblock-put"', () => {
        // Locate all elements with the specified class
        cy.get('.opblock.opblock-put')
          .should('have.length', 2); // Assert that exactly 2 elements are found
      });
}
  
export function PostAPI() {
    // Visit the page before each test
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('Finds 2 elements with the class "opblock opblock-post"', () => {
        // Locate all elements with the specified class
        cy.get('.opblock.opblock-post')
          .should('have.length', 2); // Assert that exactly 2 elements are found
      });
}
  
export function DeleteAPI() {
    // Visit the page before each test
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('Finds 1 element with the class "opblock opblock-post"', () => {
        // Locate all elements with the specified class
        cy.get('.opblock.opblock-delete')
          .should('have.length', 1); // Assert that exactly 1 element are found
      });
}
