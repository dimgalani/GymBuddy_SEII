// Functional tests for the /catalog endpoint
export function testEndpointCatalog() {
  // Setup before each test: Visit Swagger UI documentation page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  // Test Case 1: Verify posting an exercise for john_doe
  it('should execute the Try it Out button and verify posting an exercise for john_doe', () => {
    // Step 1: Visit Swagger UI and ensure it has loaded
    visitSwaggerUI();

    // Step 2: Check if the /catalog endpoint is present on the page
    checkEndpointPresence();

    // Step 3: Expand the endpoint details to see the "Try it Out" button
    expandEndpointDetails();

    // Step 4: Click "Try it Out" and provide input data for the exercise
    tryItOut();
    inputExerciseDetails('john_doe', 'Bench Press', 'Targets the pectoral muscles, triceps, and anterior deltoids.');

    // Step 5: Execute the request to add the exercise to the catalog
    executeRequest();

    // Step 6: Validate the response to confirm successful addition of the exercise
    validateResponse(201, 'Exercise successfully added to the catalog', 'Bench Press', 'Targets the pectoral muscles');
  });

  // Test Case 2: Verify error response when attempting to add an already existing exercise
  it('should execute the Try it Out button and show error for already existing exercise', () => {
    // Step 1: Visit Swagger UI and ensure it has loaded
    visitSwaggerUI();

    // Step 2: Check if the /catalog endpoint is present on the page
    checkEndpointPresence();

    // Step 3: Expand the endpoint details to see the "Try it Out" button
    expandEndpointDetails();

    // Step 4: Click "Try it Out" and provide input data for the exercise
    tryItOut();
    inputExerciseDetails('john_doe', 'Bench Press', 'Targets the pectoral muscles, triceps, and anterior deltoids.');

    // Step 5: Execute the request to attempt adding the already existing exercise
    executeRequest();

    // Step 6: Validate the response to confirm the error for existing exercise
    validateResponse(409, 'Response code 409 (Conflict): Exercise already exists in the catalog');
  });
}

// Function to visit Swagger UI and wait for it to load
// Ensures that the Swagger UI is loaded before proceeding with the test
function visitSwaggerUI() {
  cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
}

// Function to check the presence of the /catalog endpoint
// Validates that the catalog endpoint is visible and accessible
function checkEndpointPresence() {
  cy.log('Checking for the /catalog endpoint');
  cy.contains('/catalog', { timeout: 10000 })
    .scrollIntoView() // Scrolls into view for visibility
    .should('be.visible'); // Asserts that the endpoint is visible on the page
}

// Function to expand the details of the createCustomExercise operation
// Expands the Swagger UI details for the "createCustomExercise" operation
function expandEndpointDetails() {
  cy.get('#operations-default-createCustomExercise')
    .find('.opblock-summary') // Select the summary block of the operation
    .click(); // Click to expand the operation details
}

// Function to click the "Try it Out" button
// Triggers the "Try it Out" button to allow interaction with the API endpoint
function tryItOut() {
  cy.get('#operations-default-createCustomExercise')
    .find('.try-out__btn') // Select the "Try it Out" button
    .click(); // Click to activate the input fields for API request
}

// Function to input exercise details into the required fields
// Provides the exercise data for the API request to add a new exercise
function inputExerciseDetails(username, name, notes) {
  cy.get('input[placeholder="username - the username of the connected person"]')
    .clear() // Clear any existing text
    .type(username); // Input the provided username

  cy.get('textarea.body-param__text')
    .clear() // Clear any existing text
    .type(
      `{
        "name": "${name}",
        "notes": "${notes}"
      }`
    ); // Input the provided exercise name and notes in JSON format
}

// Function to execute the API request by clicking the "Execute" button
// Sends the input data to the API when "Execute" is clicked
function executeRequest() {
  cy.get('#operations-default-createCustomExercise')
    .find('.execute-wrapper .btn') // Select the "Execute" button
    .contains('Execute') // Ensure it contains the word "Execute"
    .click(); // Click to send the API request
}

// Function to validate the response from the API
// Asserts that the response matches the expected status, message, and content
function validateResponse(expectedStatusCode, expectedMessage, expectedName, expectedNotes) {
  cy.get('#operations-default-createCustomExercise')
    .find('.responses-wrapper')
    .should('be.visible'); // Ensure the response section is visible

  cy.get('.responses-table .response-col_status')
    .should('contain', expectedStatusCode); // Assert that the status code matches the expected value

  cy.get('.responses-table .response-col_description pre')
    .invoke('text')
    .then((responseBody) => {
      // Clean up the response body by removing any non-JSON content
      let cleanedResponse = cleanResponseBody(responseBody);
      const jsonResponse = JSON.parse(cleanedResponse); // Parse the cleaned response as JSON

      // Assert that the message matches the expected value
      expect(jsonResponse).to.have.property('message', expectedMessage);

      // If exercise name and notes are provided, validate them in the response
      if (expectedName && expectedNotes) {
        expect(jsonResponse).to.have.property('exercise');
        expect(jsonResponse.exercise).to.have.property('name', expectedName);
        expect(jsonResponse.exercise).to.have.property('notes').that.includes(expectedNotes);
      }

      // Assert that the response code matches the expected value
      expect(jsonResponse).to.have.property('code', expectedStatusCode);
    });
}

// Helper function to clean the response body
// Cleans up the response body to isolate the JSON data for parsing
function cleanResponseBody(responseBody) {
  let cleanedResponse = responseBody.trim();
  const jsonStart = cleanedResponse.indexOf('{'); // Find the start of the JSON string
  const jsonEnd = cleanedResponse.lastIndexOf('}'); // Find the end of the JSON string
  if (jsonStart !== -1 && jsonEnd !== -1) {
    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1); // Extract the valid JSON
  }
  return cleanedResponse; // Return the cleaned response
}
