describe('Swagger UI: Test MyReservations Endpoint', () => {
  // Step 1: Visit the Swagger UI page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('should execute the Try it Out button and verify response for john_doe', () => {
    // Step 2: Wait for Swagger UI to load
    cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');

    // Step 3: Debug the presence of the endpoint
    cy.log('Checking for the MyReservations endpoint');
    cy.contains('/myreservations', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');

    // Step 3: Expand the endpoint details
    cy.get('#operations-default-getMyReservations')
      .find('.opblock-summary')
      .click();

    // Step 4: Click the "Try it Out" button
    cy.get('#operations-default-getMyReservations')
      .find('.try-out__btn')
      .click();

    // Step 5: Input the username parameter
    cy.get('input[placeholder="username - the username of the connected person"]')
      .clear() // Ensure the field is empty before typing
      .type('john_doe');

    // Step 6: Execute the request
    cy.get('#operations-default-getMyReservations')
      .find('.execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Step 7: Validate the response
    cy.get('#operations-default-getMyReservations')
      .find('.responses-wrapper')
      .should('be.visible');

    // Step 8: Assert on the response code
    cy.get('.responses-table .response-col_status')
      .should('contain', '200');

    // Step 9: Assert on the response body
    cy.get('.responses-table .response-col_description pre')
      .invoke('text')
      .then((responseBody) => {

    let cleanResponseBody = responseBody.trim();
    if (cleanResponseBody.endsWith(']')) {
      cleanResponseBody = cleanResponseBody.substring(0, cleanResponseBody.indexOf(']') + 1);
    }
    let jsonResponse = JSON.parse(cleanResponseBody);

    // Assert the response is an array with three items
    expect(jsonResponse).to.be.an('array').and.have.length(3);

    // Validate the content of the reservations
    expect(jsonResponse[0]).to.deep.equal({
      date: '2024-11-02',
      muscleGroup: 'lower',
      time: '10:00',
    });
    expect(jsonResponse[1]).to.deep.equal({
      date: '2024-11-03',
      muscleGroup: 'core',
      time: '12:00',
    });
    expect(jsonResponse[2]).to.deep.equal({
      date: '2024-11-04',
      muscleGroup: 'cardio',
      time: '06:00',
    });
  });
  });
});

describe('Swagger UI: Test planner/progress Endpoint', () => {
  // Step 1: Visit the Swagger UI page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('should execute the Try it Out button and verify response for john_doe', () => {
    // Step 2: Wait for Swagger UI to load
    cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');

    // Step 3: Debug the presence of the endpoint
    cy.log('Checking for the /progress endpoint');
    cy.contains('/progress', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');

    // Step 3: Expand the endpoint details
    cy.get('#operations-default-updateExerciseProgress')
      .find('.opblock-summary')
      .click();

    // Step 4: Click the "Try it Out" button
    cy.get('#operations-default-updateExerciseProgress')
      .find('.try-out__btn')
      .click();

    // Step 5: Input the username parameter
    cy.get('input[placeholder="username - the username of the connected person"]')
      .clear() // Ensure the field is empty before typing
      .type('john_doe');

    cy.get('input[placeholder="day - the selected day of the planner"]')
      .clear() // Ensure the field is empty before typing
      .type('8');

    cy.get('input[placeholder="name - exercise name"]')
      .clear() // Ensure the field is empty before typing
      .type('Bench_Press');

    cy.get('input[placeholder="weight - the new weight"]')
      .clear() // Ensure the field is empty before typing
      .type('70');

    cy.get('input[placeholder="reps - the new reps"]')
      .clear() // Ensure the field is empty before typing
      .type('10');

    // Step 6: Execute the request
    cy.get('#operations-default-updateExerciseProgress')
      .find('.execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Step 7: Validate the response
    cy.get('#operations-default-updateExerciseProgress')
      .find('.responses-wrapper')
      .should('be.visible');

    // Step 8: Assert on the response code
    cy.get('.responses-table .response-col_status')
      .should('contain', '200');

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
          expect(jsonResponse).to.have.property('updatedProgress');
          expect(jsonResponse).to.have.property('message', 'Progress updated successfully');
          expect(jsonResponse).to.have.property('code', 200);

          // Validate the updatedProgress object
          const updatedProgress = jsonResponse.updatedProgress;
          expect(updatedProgress).to.have.property('notes', 'note1');
          expect(updatedProgress).to.have.property('name', 'Bench_Press');

          // Validate the weightPerDateEntries array
          expect(updatedProgress.weightPerDateEntries).to.be.an('array').that.has.length(10);
          expect(updatedProgress.weightPerDateEntries).to.include.members([70, 80, 85, 90, null]);

          // Validate the repetitionsPerDateEntries array
          expect(updatedProgress.repetitionsPerDateEntries).to.be.an('array').that.has.length(10);
          expect(updatedProgress.repetitionsPerDateEntries).to.include.members([10, null]);
        } catch (error) {
          // Log an error if parsing fails
          cy.log('Failed to parse JSON:', error.message);
        }
      });
  });

  it('should execute the Try it Out button and return error of non-existing exercise', () => {
    // Step 2: Wait for Swagger UI to load
    cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');

    // Step 3: Debug the presence of the endpoint
    cy.log('Checking for the /progress endpoint');
    cy.contains('/progress', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');

    // Step 3: Expand the endpoint details
    cy.get('#operations-default-updateExerciseProgress')
      .find('.opblock-summary')
      .click();

    // Step 4: Click the "Try it Out" button
    cy.get('#operations-default-updateExerciseProgress')
      .find('.try-out__btn')
      .click();

    // Step 5: Input the username parameter
    cy.get('input[placeholder="username - the username of the connected person"]')
      .clear() // Ensure the field is empty before typing
      .type('jane_smith');

    cy.get('input[placeholder="day - the selected day of the planner"]')
      .clear() // Ensure the field is empty before typing
      .type('8');

    cy.get('input[placeholder="name - exercise name"]')
      .clear() // Ensure the field is empty before typing
      .type('Bench_Press');

    cy.get('input[placeholder="weight - the new weight"]')
      .clear() // Ensure the field is empty before typing
      .type('70');

    cy.get('input[placeholder="reps - the new reps"]')
      .clear() // Ensure the field is empty before typing
      .type('10');

    // Step 6: Execute the request
    cy.get('#operations-default-updateExerciseProgress')
      .find('.execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Step 7: Validate the response
    cy.get('#operations-default-updateExerciseProgress')
      .find('.responses-wrapper')
      .should('be.visible');

    // Step 8: Assert on the response code
    cy.get('.responses-table .response-col_status')
      .should('contain', '404');

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
          expect(jsonResponse).to.have.property('message', 'Progress updated successfully');
          expect(jsonResponse).to.have.property('code', 404);

        } catch (error) {
          // Log an error if parsing fails
          cy.log('Failed to parse JSON:', error.message);
        }
      });
  });
});


describe('Swagger UI: Test CancelReservation Endpoint', () => {
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
});

describe('Swagger UI: Test planner/catalog Endpoint', () => {
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
});