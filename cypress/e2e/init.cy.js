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
