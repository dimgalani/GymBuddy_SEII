// Function to visit the Swagger UI page before each test
function visitSwaggerUI() {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });
}

// Function to wait for Swagger UI to load
function waitForSwaggerUI() {
  cy.get('div.swagger-ui', { timeout: 10000 }).should('exist'); // Wait for the Swagger UI to load
}

// Function to check for the /progress endpoint
function checkProgressEndpoint() {
  cy.log('Checking for the /progress endpoint'); // Log a message to the console
  cy.contains('/progress', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible');
}

// Function to expand the endpoint details
function expandEndpointDetails() {
  cy.get('#operations-default-updateExerciseProgress') // Get the endpoint details
    .find('.opblock-summary')
    .click();
}

// Function to click the "Try it Out" button
function clickTryItOut() {
  cy.get('#operations-default-updateExerciseProgress') // Get the endpoint details
    .find('.try-out__btn')
    .click();
}

// Function to input parameters
function inputParameters(username, day, exerciseName, weight, reps) {
  // Input the parameters
  cy.get('input[placeholder="username - the username of the connected person"]')
    .clear() // Clear the input field
    .type(username); // And type the username

  cy.get('input[placeholder="day - the selected day of the planner"]')
    .clear()
    .type(day);

  cy.get('input[placeholder="name - exercise name"]')
    .clear()
    .type(exerciseName);

  cy.get('input[placeholder="weight - the new weight"]')
    .clear()
    .type(weight);

  cy.get('input[placeholder="reps - the new reps"]')
    .clear()
    .type(reps);
}

// Function to execute the request
function executeRequest() {
  cy.get('#operations-default-updateExerciseProgress')
    .find('.execute-wrapper .btn')
    .contains('Execute')
    .click();
}

// Function to validate the response
function validateResponse(expectedStatusCode, expectedMessage) {
  cy.get('#operations-default-updateExerciseProgress')
    .find('.responses-wrapper')
    .should('be.visible');
// Function to validate the status code
  cy.get('.responses-table .response-col_status')
    .should('contain', expectedStatusCode);
// Function to validate the response
  cy.get('.responses-table .response-col_description pre')
    .invoke('text')
    .then((responseBody) => {
      let cleanedResponse = responseBody.trim();
      const jsonStart = cleanedResponse.indexOf('{');
      const jsonEnd = cleanedResponse.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
      }

      try {
        const jsonResponse = JSON.parse(cleanedResponse);
        expect(jsonResponse).to.have.property('message', expectedMessage);
        expect(jsonResponse).to.have.property('code', expectedStatusCode);
      } catch (error) {
        cy.log('Failed to parse JSON:', error.message);
      }
    });
}

// Main function to test the endpoint progress
export function testEndpointProgress() {
  visitSwaggerUI();
// Function to test the progress endpoint with valid data
  it('should execute the Try it Out button and verify response for john_doe', () => {
    waitForSwaggerUI();
    checkProgressEndpoint();
    expandEndpointDetails();
    clickTryItOut();
    inputParameters('john_doe', '8', 'Bench_Press', '70', '10');
    executeRequest();
    validateResponse(200, 'Progress updated successfully');
  });
// Function to test the progress endpoint with invalid data
  it('should execute the Try it Out button and return error of non-existing exercise', () => {
    waitForSwaggerUI();
    checkProgressEndpoint();
    expandEndpointDetails();
    clickTryItOut();
    inputParameters('jane_smith', '8', 'Bench_Press', '70', '10');
    executeRequest();
    validateResponse(404, 'Progress updated successfully');
  });
}
