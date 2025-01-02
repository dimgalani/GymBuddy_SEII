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
