export function testEndpointCancelReservation() {
  // Step 1: Visit the Swagger UI page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs');
  });

  it('should execute the Try it Out button and verify deletion of reservation for john_doe', () => {
    visitSwaggerUI();
    checkEndpointPresence();
    expandEndpointDetails();
    fillRequestParameters();
    executeRequest();
    validateResponse();
  });
}

// Function to visit Swagger UI and wait for it to load
function visitSwaggerUI() {
  cy.get('div.swagger-ui', { timeout: 10000 }).should('exist');
}

// Function to check the presence of the cancelReservation endpoint
function checkEndpointPresence() {
  cy.log('Checking for the cancelReservation endpoint');
  cy.contains('/reservations', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible');
}

// Function to expand the endpoint details
function expandEndpointDetails() {
  cy.get('#operations-default-cancelReservation')
    .find('.opblock-summary')
    .click();
}

// Function to fill in the request parameters
function fillRequestParameters() {
  cy.get('#operations-default-cancelReservation')
    .find('.try-out__btn')
    .click();

  cy.get('input[placeholder="username - the username of the connected person"]')
    .clear()
    .type('john_doe');

  cy.get('input[placeholder="day - the day of the reservation"]')
    .clear()
    .type('2024-11-01');

  cy.get('input[placeholder="time - the time of the reservation"]')
    .clear()
    .type('08:00');
}

// Function to execute the request
function executeRequest() {
  cy.get('#operations-default-cancelReservation')
    .find('.execute-wrapper .btn')
    .contains('Execute')
    .click();
}

// Function to validate the response
function validateResponse() {
  cy.get('#operations-default-cancelReservation')
    .find('.responses-wrapper')
    .should('be.visible');

  cy.get('.responses-table .response-col_status')
    .should('contain', '202');

  cy.get('.responses-table .response-col_description pre')
    .invoke('text')
    .then((responseBody) => {
      let cleanedResponse = cleanResponseBody(responseBody);
      assertResponse(cleanedResponse);
    });
}

// Function to clean the response body
function cleanResponseBody(responseBody) {
  let cleanedResponse = responseBody.trim();
  const jsonStart = cleanedResponse.indexOf('{');
  const jsonEnd = cleanedResponse.lastIndexOf('}');
  
  if (jsonStart !== -1 && jsonEnd !== -1) {
    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
  }
  
  return cleanedResponse;
}

// Function to assert the response structure
function assertResponse(cleanedResponse) {
  try {
    const jsonResponse = JSON.parse(cleanedResponse);
    expect(jsonResponse).to.have.property('message', 'Reservation successfully canceled.');
    expect(jsonResponse).to.have.property('code', 202);
  } catch (error) {
    cy.log('Failed to parse JSON:', error.message);
  }
}
