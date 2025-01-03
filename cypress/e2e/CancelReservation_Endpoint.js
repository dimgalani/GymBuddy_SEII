export function testEndpointCancelReservation(){
    // Step 1: Visit the Swagger UI page
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('should execute the Try it Out button and verify deletion of reservation for john_doe', () => {
        // Step 2: Wait for Swagger UI to load
        cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
    
        // Step 3: Debug the presence of the endpoint
        cy.log('Checking for the cancelReservation endpoint');
        cy.contains('/reservations', { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible');
    
        // Step 3: Expand the endpoint details
        cy.get('#operations-default-cancelReservation')
          .find('.opblock-summary')
          .click();
    
        // Step 4: Click the "Try it Out" button
        cy.get('#operations-default-cancelReservation')
          .find('.try-out__btn')
          .click();
    
        // Step 5: Input the username parameter
        cy.get('input[placeholder="username - the username of the connected person"]')
          .clear() // Ensure the field is empty before typing
          .type('john_doe');
    
        cy.get('input[placeholder="day - the day of the reservation"]')
          .clear() // Ensure the field is empty before typing
          .type('2024-11-01');
    
        cy.get('input[placeholder="time - the time of the reservation"]')
          .clear() // Ensure the field is empty before typing
          .type('08:00');
    
        // Step 6: Execute the request
        cy.get('#operations-default-cancelReservation')
          .find('.execute-wrapper .btn')
          .contains('Execute')
          .click();
    
        // Step 7: Validate the response
        cy.get('#operations-default-cancelReservation')
          .find('.responses-wrapper')
          .should('be.visible');
    
        // Step 8: Assert on the response code
        cy.get('.responses-table .response-col_status')
          .should('contain', '202');
    
        // Step 9: Assert on the response body
        cy.get('.responses-table .response-col_description pre')
          .invoke('text')
          .then((responseBody) => {
            // Clean up the response body by trimming and removing unwanted content (if necessary)
            let cleanedResponse = responseBody.trim();
            
            // Sometimes Swagger UI returns the response wrapped in HTML or non-JSON data.
            // Remove any non-JSON text (we assume the JSON starts with `{` and ends with `}`).
            const jsonStart = cleanedResponse.indexOf('{');
            const jsonEnd = cleanedResponse.lastIndexOf('}');
            
            if (jsonStart !== -1 && jsonEnd !== -1) {
              cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
            }
    
            // Now parse the cleaned JSON response
            try {
              const jsonResponse = JSON.parse(cleanedResponse);
              
              // Assert the response structure
              expect(jsonResponse).to.have.property('message', 'Reservation successfully canceled.');
              expect(jsonResponse).to.have.property('code', 202);
    
            } catch (error) {
              // Log an error if parsing fails
              cy.log('Failed to parse JSON:', error.message);
            }
      });
      });
}
