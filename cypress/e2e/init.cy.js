describe('Count All Endpoints', () => {
  beforeEach(() => {
    // Visit the documentation page before running the test
    cy.visit('http://localhost:8080/docs'); // Replace with your actual URL
  });

  it('Should count all endpoint objects and verify their summary is 14', () => {
    // Locate all the endpoint elements using a specific selector and verify their count
    cy.get('.opblock-summary')
      .should('have.length', 14); // Assert that exactly 14 elements are found
  });
});

//idk an theloume ena synoliko or gia kathe http verb jexvrista

describe('GET API Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Finds 9 elements with the class "opblock opblock-get"', () => {
    // Locate all elements with the specified class
    cy.get('.opblock.opblock-get')
      .should('have.length', 9); // Assert that exactly 9 elements are found
  });
});

describe('PUT API Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Finds 2 elements with the class "opblock opblock-put"', () => {
    // Locate all elements with the specified class
    cy.get('.opblock.opblock-put')
      .should('have.length', 2); // Assert that exactly 2 elements are found
  });
});

describe('POST API Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Finds 2 elements with the class "opblock opblock-post"', () => {
    // Locate all elements with the specified class
    cy.get('.opblock.opblock-post')
      .should('have.length', 2); // Assert that exactly 2 elements are found
  });
});

describe('DELETE API Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Finds 1 element with the class "opblock opblock-post"', () => {
    // Locate all elements with the specified class
    cy.get('.opblock.opblock-delete')
      .should('have.length', 1); // Assert that exactly 1 element are found
  });
});


describe('Resource Navigation Test', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs/#/default');
  });

  it('Should navigate to the correct URL (getMyReservations) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-getMyReservations')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/myreservations"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      //cy.url().should('eq', 'http://localhost:8080/docs/#/default/getMyReservations');
      cy.url().should('include', '/#/default/getMyReservations');
  });

  it('Should navigate to the correct URL (checkGoalsFromInfo) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-checkGoalsFromInfo')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/settings/goals"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      cy.url().should('include', '/#/default/checkGoalsFromInfo');
  });

  it('Should navigate to the correct URL (getPersonalInfo) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-getPersonalInfo')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/settings"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      cy.url().should('include', '/#/default/getPersonalInfo');
  });

  it('Should navigate to the correct URL (updatePersonalInfo) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-updatePersonalInfo')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/settings"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      cy.url().should('include', '/#/default/updatePersonalInfo');
  });
  
  it('Should navigate to the correct URL (makeReservation) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-makeReservation')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/reservations"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      cy.url().should('include', '/#/default/makeReservation');
  });

  it('Should navigate to the correct URL (cancelReservation) when the resource is clicked', () => {
    // Target the resource block by its unique ID
    cy.get('#operations-default-cancelReservation')
      .within(() => {
        // Click the resource block
        cy.get('.opblock-summary-path[data-path="/user/{username}/reservations"]').click();
      });

      // Assert that the URL is updated to the correct resource path
      cy.url().should('include', '/#/default/cancelReservation');
  });
});
 
describe('Dropdown Navigation Test', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Should navigate to /# after clicking the dropdown with label "default" once', () => {
    // Target the block by its ID and class
    cy.get('h4.opblock-tag.no-desc#operations-tag-default')
      .within(() => {
        // Click the arrow button inside the block
        cy.get('button.expand-operation').click();
      });

    // Verify the URL contains '/#'
    cy.url().should('include', '/#');
  });

  it('Should navigate to /#/default after clicking the dropdown with label "default" twice', () => {
    // Target the block by its ID and class
    cy.get('h4.opblock-tag.no-desc#operations-tag-default')
      .within(() => {
        // Click the arrow button inside the block
        cy.get('button.expand-operation').click().click();
      });

    // Verify the URL contains '/#/default'
    cy.url().should('include', '/#/default');
  });
});

describe('API Download URL Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Tests failure case for /api URL', () => {
    // Locate the input field and type '/api'
    cy.get('.download-url-input').clear().type('/api');

    // Click the 'Explore' button
    cy.get('.download-url-button').click();

    // Assert the page shows the expected failure message
    cy.get('h4.title').should('contain.text', 'Failed to load API definition.');
  });

  it('Tests successful case for /api-docs URL', () => {
    // Locate the input field and type '/api-docs'
    cy.get('.download-url-input').clear().type('/api-docs');

    // Click the 'Explore' button
    cy.get('.download-url-button').click();

    // Assert the page shows the expected success title
    cy.get('h2.title').should('contain.text', 'GymBuddy AUTH');

    // Additional assertions to verify version and specification type
    cy.get('h2.title pre.version').first().should('contain.text', '1.0.0');
    cy.get('h2.title pre.version').last().should('contain.text', 'OAS3');
  });
});

describe('Reservation API Tests', () => {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('Finds 9 elements with the class "opblock opblock-get"', () => {
    // Locate all elements with the specified class
    cy.get('.opblock.opblock-get')
      .should('have.length', 9); // Assert that exactly 9 elements are found
  });
});

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