export function testEndpointCatalog() {
    // Step 1: Visit the Swagger UI page
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('should execute the Try it Out button and verify posting an exercise for john_doe', () => {
        // Step 2: Wait for Swagger UI to load
        cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
    
        // Step 3: Debug the presence of the endpoint
        cy.log('Checking for the createCustomExercise endpoint');
        cy.contains('/catalog', { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible');
    
        // Step 3: Expand the endpoint details
        cy.get('#operations-default-createCustomExercise')
          .find('.opblock-summary')
          .click();
    
        // Step 4: Click the "Try it Out" button
        cy.get('#operations-default-createCustomExercise')
          .find('.try-out__btn')
          .click();
    
        // Step 5: Input the username parameter
        cy.get('input[placeholder="username - the username of the connected person"]')
          .clear() // Ensure the field is empty before typing
          .type('john_doe');
    
        // Input the JSON body
        cy.get('textarea.body-param__text')
          .clear()
          .type(
           `{
             "name": "Bench Press",
             "notes": "Targets the pectoral muscles, triceps, and anterior deltoids. Setup: Lie on a flat bench with your feet flat on the floor. Grasp the barbell with your hands slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up to the starting position."
           }`
          );
    
        // Step 6: Execute the request
        cy.get('#operations-default-createCustomExercise')
          .find('.execute-wrapper .btn')
          .contains('Execute')
          .click();
    
        // Step 7: Validate the response
        cy.get('#operations-default-createCustomExercise')
          .find('.responses-wrapper')
          .should('be.visible');
    
        // Step 8: Assert on the response code
        cy.get('.responses-table .response-col_status')
          .should('contain', '201');
    
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
    
           // Parse the cleaned JSON response
           const jsonResponse = JSON.parse(cleanedResponse);
    
           // Validate the JSON response
           expect(jsonResponse).to.have.property('message', 'Exercise successfully added to the catalog');
           expect(jsonResponse).to.have.property('exercise');
           expect(jsonResponse.exercise).to.have.property('name', 'Bench Press');
           expect(jsonResponse.exercise).to.have.property('notes').that.includes('Targets the pectoral muscles');
           expect(jsonResponse).to.have.property('code', 201);
         });
     });
    
     it('should execute the Try it Out button and show error for already existing exercise', () => {
      // Step 2: Wait for Swagger UI to load
      cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
    
      // Step 3: Debug the presence of the endpoint
      cy.log('Checking for the createCustomExercise endpoint');
      cy.contains('/catalog', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible');
    
      // Step 3: Expand the endpoint details
      cy.get('#operations-default-createCustomExercise')
        .find('.opblock-summary')
        .click();
    
      // Step 4: Click the "Try it Out" button
      cy.get('#operations-default-createCustomExercise')
        .find('.try-out__btn')
        .click();
    
      // Step 5: Input the username parameter
      cy.get('input[placeholder="username - the username of the connected person"]')
        .clear() // Ensure the field is empty before typing
        .type('john_doe');
    
      // Input the JSON body
      cy.get('textarea.body-param__text')
        .clear()
        .type(
         `{
           "name": "Bench Press",
           "notes": "Targets the pectoral muscles, triceps, and anterior deltoids. Setup: Lie on a flat bench with your feet flat on the floor. Grasp the barbell with your hands slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up to the starting position."
         }`
        );
    
      // Step 6: Execute the request
      cy.get('#operations-default-createCustomExercise')
        .find('.execute-wrapper .btn')
        .contains('Execute')
        .click();
    
      // Step 7: Validate the response
      cy.get('#operations-default-createCustomExercise')
        .find('.responses-wrapper')
        .should('be.visible');
    
      // Step 8: Assert on the response code
      cy.get('.responses-table .response-col_status')
        .should('contain', '409');
    
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
    
         // Parse the cleaned JSON response
         const jsonResponse = JSON.parse(cleanedResponse);
    
         // Validate the JSON response
         expect(jsonResponse).to.have.property('message', 'Response code 409 (Conflict): Exercise already exists in the catalog');
         expect(jsonResponse).to.have.property('code', 409);
       });
    });
}
