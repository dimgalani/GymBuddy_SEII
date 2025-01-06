// Functional tests for the /catalog endpoint
export function testEndpointCatalog() {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('should execute the Try it Out button and verify posting an exercise for john_doe', () => {
    visitSwaggerUI();
    checkEndpointPresence();
    expandEndpointDetails();
    tryItOut();
    inputExerciseDetails('john_doe', 'Bench Press', 'Targets the pectoral muscles, triceps, and anterior deltoids.');
    executeRequest();
    validateResponse(201, 'Exercise successfully added to the catalog', 'Bench Press', 'Targets the pectoral muscles');
  });

  it('should execute the Try it Out button and show error for already existing exercise', () => {
    visitSwaggerUI();
    checkEndpointPresence();
    expandEndpointDetails();
    tryItOut();
    inputExerciseDetails('john_doe', 'Bench Press', 'Targets the pectoral muscles, triceps, and anterior deltoids.');
    executeRequest();
    validateResponse(409, 'Response code 409 (Conflict): Exercise already exists in the catalog');
  });
}

// Function to visit Swagger UI and wait for it to load
function visitSwaggerUI() {
  cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
}

// Function to check the presence of the createCustomExercise endpoint
function checkEndpointPresence() {
  cy.log('Checking for the createCustomExercise endpoint');
  cy.contains('/catalog', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible');
}

function expandEndpointDetails() {
  cy.get('#operations-default-createCustomExercise')
    .find('.opblock-summary')
    .click();
}

function tryItOut() {
  cy.get('#operations-default-createCustomExercise')
    .find('.try-out__btn')
    .click();
}

function inputExerciseDetails(username, name, notes) {
  cy.get('input[placeholder="username - the username of the connected person"]')
    .clear()
    .type(username);

  cy.get('textarea.body-param__text')
    .clear()
    .type(
      `{
        "name": "${name}",
        "notes": "${notes}"
      }`
    );
}

function executeRequest() {
  cy.get('#operations-default-createCustomExercise')
    .find('.execute-wrapper .btn')
    .contains('Execute')
    .click();
}

function validateResponse(expectedStatusCode, expectedMessage, expectedName, expectedNotes) {
  cy.get('#operations-default-createCustomExercise')
    .find('.responses-wrapper')
    .should('be.visible');

  cy.get('.responses-table .response-col_status')
    .should('contain', expectedStatusCode);

  cy.get('.responses-table .response-col_description pre')
    .invoke('text')
    .then((responseBody) => {
      let cleanedResponse = cleanResponseBody(responseBody);
      const jsonResponse = JSON.parse(cleanedResponse);

      expect(jsonResponse).to.have.property('message', expectedMessage);
      if (expectedName && expectedNotes) {
        expect(jsonResponse).to.have.property('exercise');
        expect(jsonResponse.exercise).to.have.property('name', expectedName);
        expect(jsonResponse.exercise).to.have.property('notes').that.includes(expectedNotes);
      }
      expect(jsonResponse).to.have.property('code', expectedStatusCode);
    });
}

function cleanResponseBody(responseBody) {
  let cleanedResponse = responseBody.trim();
  const jsonStart = cleanedResponse.indexOf('{');
  const jsonEnd = cleanedResponse.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
  }
  return cleanedResponse;
}
