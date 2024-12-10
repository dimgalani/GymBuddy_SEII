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
 
//idk an theloume na valoume gia ola ta resources, egv evala gia kapoia endeiktika