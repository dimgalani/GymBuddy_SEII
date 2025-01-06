export function CountEndpoints() {
    beforeEach(() => {
        // Visit the documentation page before running the test
        cy.visit('http://localhost:8080/docs'); // Replace with your actual URL
      });
    
      it('Should count all endpoint objects and verify their summary is 14', () => {
        // Locate all the endpoint elements using a specific selector and verify their count
        cy.get('.opblock-summary')
          .should('have.length', 14); // Assert that exactly 14 elements are found
      });
}

export function ResourceNavigationTest() {
  // Visit the page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs/#/default');
  });

  it('Should navigate to the correct URL (getMyReservations) when the resource is clicked', () => {
    navigateToResource('#operations-default-getMyReservations', '/user/{username}/myreservations', '/#/default/getMyReservations');
  });

  it('Should navigate to the correct URL (checkGoalsFromInfo) when the resource is clicked', () => {
    navigateToResource('#operations-default-checkGoalsFromInfo', '/user/{username}/settings/goals', '/#/default/checkGoalsFromInfo');
  });

  it('Should navigate to the correct URL (getPersonalInfo) when the resource is clicked', () => {
    navigateToResource('#operations-default-getPersonalInfo', '/user/{username}/settings', '/#/default/getPersonalInfo');
  });

  it('Should navigate to the correct URL (updatePersonalInfo) when the resource is clicked', () => {
    navigateToResource('#operations-default-updatePersonalInfo', '/user/{username}/settings', '/#/default/updatePersonalInfo');
  });

  it('Should navigate to the correct URL (makeReservation) when the resource is clicked', () => {
    navigateToResource('#operations-default-makeReservation', '/user/{username}/reservations', '/#/default/makeReservation');
  });

  it('Should navigate to the correct URL (cancelReservation) when the resource is clicked', () => {
    navigateToResource('#operations-default-cancelReservation', '/user/{username}/reservations', '/#/default/cancelReservation');
  });
}

// Helper function to navigate to a resource and verify the URL
function navigateToResource(resourceId, dataPath, expectedUrl) {
  // Target the resource block by its unique ID
  cy.get(resourceId)
    .within(() => {
      // Click the resource block
      cy.get(`.opblock-summary-path[data-path="${dataPath}"]`).click();
    });

  // Assert that the URL is updated to the correct resource path
  cy.url().should('include', expectedUrl);
}

export function DropDownNavigation() {
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
    }
  
export function APIDownloadURL() {
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
    }

export function ReservationAPI() {
    // Visit the page before each test
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
      });
    
      it('Finds 9 elements with the class "opblock opblock-get"', () => {
        // Locate all elements with the specified class
        cy.get('.opblock.opblock-get')
          .should('have.length', 9); // Assert that exactly 9 elements are found
      });
}
